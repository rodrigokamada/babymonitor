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
  code?: string; // Confirmation code for Amazon Cognito
  token?: string;

}
