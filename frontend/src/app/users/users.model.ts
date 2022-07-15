export class UsersModel {

  id?: string;
  firstLetter?: string;
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  showPassword?: boolean;
  showOldPassword?: boolean;
  hasPassword?: boolean;
  image?: string;
  locale?: string;
  status?: string;
  code?: string; // Confirmation code from Amazon Cognito
  jwt?: string; // JWT from Amazon Cognito
  token?: string; // Token from Google reCAPTCHA

}
