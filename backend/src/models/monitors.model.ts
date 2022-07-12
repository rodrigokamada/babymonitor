import { v4 as uuidv4 } from 'uuid';

export class MonitorsModel {

  id: String|undefined;
  code: String|undefined;
  userId: String|undefined;

  constructor(userId: String) {
    this.id = uuidv4();
    this.code = this.generateCode();
    this.userId = userId;
  }

  private generateCode(): String {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
  }

}
