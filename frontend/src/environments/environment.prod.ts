export const environment = {
  production: true,
  server: 'https://baby-monitor-web.herokuapp.com',
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
    debug: true,
    host: 'baby-monitor-web.herokuapp.com',
    port: 443,
    path: '/',
    secure: true,
  },
  socket: {
    path: '/socket.io',
  },
};
