module.exports = {
  development: {
    API_URL: 'http://localhost:5000/v1',

  },
  production: {
    API_URL: process.env.API_URL,
  },

};
