import { v4 as uuidv4 } from 'uuid';

export class ViewersModel {

  id: String|undefined;
  monitorId: String|undefined;
  userId: String|undefined;
  peerId: String|undefined;
  socketId: String|undefined;

  constructor(monitorId: String, userId: String, peerId: String|undefined, socketId: String|undefined) {
    this.id = uuidv4();
    this.monitorId = monitorId;
    this.userId = userId;
    this.peerId = peerId;
    this.socketId = socketId;
  }

}
