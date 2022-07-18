module.exports = {

  application: {
    port: process.env.PORT,
  },

  cors: {
  },

  logger: {
    level: 'silly',
  },

  socket: {
    path: '/socket.io',
    cors: {
      origin: '*',
    },
  },

  mysql: {
    url: process.env.MYSQL_URL
  },

  google: {
    recaptcha: {
      url: 'https://www.google.com/recaptcha/api/siteverify',
      secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
    },
  },

  cognito: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_I,
    tokenUse: 'id',
  },

};
