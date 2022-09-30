export const environment = {
  production: true,
  server: 'https://aws1.kamada.com.br',
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
    host: 'aws1.kamada.com.br',
    port: 443,
    path: '/v1',
    secure: false,
  },
  socket: {
    path: '/v1/socket.io',
  },
};
