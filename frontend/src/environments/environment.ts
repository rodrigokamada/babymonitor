// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server: 'http://localhost:3000',
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
    debug: 3,
    host: 'localhost',
    port: 3000,
    path: '/v1',
    secure: false,
  },
  socket: {
    path: '/v1/socket.io',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
