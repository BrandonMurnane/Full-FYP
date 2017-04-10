'use strict';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import _ from 'lodash';


export default function(sequelize, DataTypes) {
  let models = sequelize.models;

  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: 'Account username'
    },
    password: {
      type: DataTypes.VIRTUAL,
      comment: 'Virtual Field use for setting password hash',
      set: function(password) {
        this.setDataValue('password', password);

        // if null then do not encrypt
        if (!password) {
          return this.setDataValue('passwordHash', null);
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        this.setDataValue('passwordHash', hash);
      },
      validated: {
        complexity: function(value) {
          const passwordRegExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,200})/;
          return passwordRegExp.test(value);
        }
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      comment: `Password is hashed automatically, no need to manually hash.
                If password is null then user will then user will not
                be able to login. It is null when the user is an sso user`,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'First and last name.'
    },
    email: {
      type: DataTypes.STRING(1024),
      validate: {
        isEmail: true
      },
      comment: 'The user\'s email address.'
    },
    imageUrl: {
      type: DataTypes.STRING(4096),
      validate: {
        isUrl: true
      },
      comment: 'Optional thumbnail image.'
    }
  }, {
    classMethods: {
      associate:function(models) {
        User.belongsToMany(models.Category, { through: 'UserCategory' });
        User.belongsTo(models.UserGroups,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' }) ;
      },
       create: function(value, options) {
          let user;
          return this.constructor.prototype.create.apply(this, [value, options])
          .then((createdUser) => {
            user = createdUser;

            return Promise.all([
              _.isUndefined(value.categoryKeys) ? null : user.setCategories(value.categoryKeys),
            ]);
          })
          .then(() => {
            return user.reload();
          });
        }
  },
    instanceMethods: {
      comparePassword: function(password) {
        // else compares password
        return Promise.resolve(bcrypt.compareSync(password, this.passwordHash));
      },
      generatePassword: function() {
        // sets password to null
        // generates ~12 characters of alphanumeric text as password
        // trims trailing =
        return crypto.randomBytes(16).toString('base64').replace(/=/g, '');
      },
      toJSON: function() {
        const userValue = {
          id: this.id,
          username: this.username,
          email: this.email,
          userGroup:this.UserGroupKey,
          name: this.name
        };

        if (this.Categories) userValue.categoryKeys = this.Categories.map((category) => category.key);

        return userValue;
      }
    }
  });
  return User;
}
