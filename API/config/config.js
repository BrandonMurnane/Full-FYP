module.exports = {
  development: {
    logging: false,
    dialect: 'postgres',
    protocol: 'postgres',
    url: 'postgres://postgres@localhost:5432/fyp-test',
  },

  production: {
    logging: false,
    dialect: 'postgres',
    protocol: 'postgres',
    url: process.env.DATABASE_URL
  }
};

