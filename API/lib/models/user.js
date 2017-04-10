'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var models = sequelize.models;

  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: 'Account username'
    },
    password: {
      type: DataTypes.VIRTUAL,
      comment: 'Virtual Field use for setting password hash',
      set: function set(password) {
        this.setDataValue('password', password);

        // if null then do not encrypt
        if (!password) {
          return this.setDataValue('passwordHash', null);
        }

        var salt = _bcryptjs2.default.genSaltSync(10);
        var hash = _bcryptjs2.default.hashSync(password, salt);
        this.setDataValue('passwordHash', hash);
      },
      validated: {
        complexity: function complexity(value) {
          var passwordRegExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,200})/;
          return passwordRegExp.test(value);
        }
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      comment: 'Password is hashed automatically, no need to manually hash.\n                If password is null then user will then user will not\n                be able to login. It is null when the user is an sso user'
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
      associate: function associate(models) {
        User.belongsToMany(models.Category, { through: 'UserCategory' });
        User.belongsTo(models.UserGroups, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
      },
      create: function create(value, options) {
        var user = void 0;
        return this.constructor.prototype.create.apply(this, [value, options]).then(function (createdUser) {
          user = createdUser;

          return Promise.all([_lodash2.default.isUndefined(value.categoryKeys) ? null : user.setCategories(value.categoryKeys)]);
        }).then(function () {
          return user.reload();
        });
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user) {
        // new users need to reset their passwords
        if (!user.passwordHash) {
          var password = user.generatePassword();
          user.password = password;
          user.resetPassword = true;
          return notifyPassword(user);
        }
      },
      beforeUpdate: function beforeUpdate(user) {
        // users with temp passwords need to reset their passwords
        if (!user.passwordHash) {
          var password = user.generatePassword();
          user.password = password;
          user.resetPassword = true;
          return notifyPassword(user);
        }
        return user;
      }
    },
    instanceMethods: {
      comparePassword: function comparePassword(password) {
        // else compares password
        return Promise.resolve(_bcryptjs2.default.compareSync(password, this.passwordHash));
      },
      generatePassword: function generatePassword() {
        // sets password to null
        // generates ~12 characters of alphanumeric text as password
        // trims trailing =
        return _crypto2.default.randomBytes(16).toString('base64').replace(/=/g, '');
      },
      toJSON: function toJSON() {
        var userValue = {
          id: this.id,
          username: this.username,
          email: this.email,
          userGroup: this.UserGroupKey,
          name: this.name
        };

        if (this.Categories) userValue.categoryKeys = this.Categories.map(function (category) {
          return category.key;
        });

        return userValue;
      }
    }
  });
  return User;
};

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }