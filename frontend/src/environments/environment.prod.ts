export const environment = {
  production: true,
  server: 'http://ec2-3-83-55-204.compute-1.amazonaws.com:3000',
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
    host: 'ec2-3-83-55-204.compute-1.amazonaws.com',
    port: 3000,
    path: '/v1',
    secure: false,
  },
  socket: {
    path: '/v1/socket.io',
  },
};
