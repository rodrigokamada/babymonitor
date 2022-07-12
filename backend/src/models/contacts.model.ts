import { v4 as uuidv4 } from 'uuid';

export class ContactsModel {

  id: String|undefined;
  subject: String|undefined;
  email: String|undefined;
  message: String|undefined;

  constructor(subject: String, email: String, message: String) {
    this.id = uuidv4();
    this.subject = subject;
    this.email = email;
    this.message = message;
  }

}
