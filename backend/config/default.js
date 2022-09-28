module.exports = {

  application: {
    port: process.env.PORT || 3000,
  },

  logger: {
    level: 'silly',
  },

  cors: {
  },

  peer: {
    debug: true,
    path: '/v1',
  },

  google: {
    recaptcha: {
      url: 'https://www.google.com/recaptcha/api/siteverify',
      secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
    },
  },

  amplify: {
    aws_project_region: 'us-east-1',
    aws_appsync_graphqlEndpoint: 'https://zhbulmokmbh3rphnr4lrvuwkie.appsync-api.us-east-1.amazonaws.com/graphql',
    aws_appsync_region: 'us-east-1',
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: process.env.AWS_AMPLIFY_API_KEY,
  },

  cognito: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    tokenUse: 'id',
  },

};
