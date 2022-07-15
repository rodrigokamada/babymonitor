import { v4 as uuidv4 } from 'uuid';

export class MonitorsModel {

  id: String|undefined;
  code: String|undefined;
  name: String|undefined;

  constructor(name: String) {
    this.id = uuidv4();
    this.code = this.generateCode();
    this.name = name;
  }

  private generateCode(): String {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code.toUpperCase();
  }

}
