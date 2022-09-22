export const environment = {
  production: true,
  server: 'https://5sc4anrio3.execute-api.us-east-1.amazonaws.com/dev',
  google: {
    recaptcha: {
      siteKey: '6LdTluEgAAAAANTwd7OMss-mMaLhNYpmuFs8w99U',
    },
  },
  cognito: {
    userPoolId: 'us-east-1_pvBUG59Lc',
    userPoolWebClientId: '2c5mv2jgmje9qnm4lk53oak50a',
  },
  peer: {
    debug: 0,
    host: '5sc4anrio3.execute-api.us-east-1.amazonaws.com',
    port: 443,
    path: '/dev/v1',
    secure: true,
  },
  socket: {
    path: '/dev/v1/socket.io',
  },
};
