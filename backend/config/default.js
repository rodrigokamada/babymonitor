{

  "application": {
    "port": 3000
  },

  "cors": {
  },

  "logger": {
    "level": "silly"
  },

  "socket": {
    "path": "/socket"
  },

  "mysql": {
    "url": "mysql://USERNAME:PASSWORD@HOST/DATABASE?ssl={\"rejectUnauthorized\":true}"
  },

  "google": {
    "recaptcha": {
      "url": "https://www.google.com/recaptcha/api/siteverify",
      "secretKey": "GOOGLE_RECAPTCHA_SECRET_KEY"
    }
  },

  "cognito": {
    "userPoolId": "COGNITO_USER_POOL_ID",
    "clientId": "COGNITO_CLIENT_ID",
    "tokenUse": "COGNITO_TOKEN_USE"
  }

}
