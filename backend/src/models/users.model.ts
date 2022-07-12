import { v4 as uuidv4 } from 'uuid';

export class UsersModel {

  id: String;
  email: String|undefined;
  password: String|undefined;
  facebook: String|undefined;
  foursquare: String|undefined;
  github: String|undefined;
  google: String|undefined;
  instagram: String|undefined;
  microsoft: String|undefined;
  twitter: String|undefined;
  name: String|undefined;
  image: String|undefined;
  locale: String|undefined;
  pendingAt: Date|undefined;
  status: String;

  constructor() {
    this.id = uuidv4();
    this.status = 'PENDING';
  }

}
