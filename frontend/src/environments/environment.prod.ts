export const environment = {
  production: true,
  server: 'https://',
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
    host: '',
    port: 443,
    path: '/v1',
    secure: true,
  },
  socket: {
    path: '/v1/socket.io',
  },
};
