import { v4 as uuidv4 } from 'uuid';

export class ViewersModel {

  id: String|undefined;
  monitorId: String|undefined;
  userId: String|undefined;

  constructor(monitorId: String, userId: String) {
    this.id = uuidv4();
    this.monitorId = monitorId;
    this.userId = userId;
  }

}
