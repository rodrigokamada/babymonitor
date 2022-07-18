import { v4 as uuidv4 } from 'uuid';

export class ViewersModel {

  id: String|undefined;
  monitorId: String|undefined;
  userId: String|undefined;
  socketId: String|undefined;
  peerId: String|undefined;

  constructor(monitorId: String, userId: String, socketId: String|undefined, peerId: String|undefined) {
    this.id = uuidv4();
    this.monitorId = monitorId;
    this.userId = userId;
    this.socketId = socketId;
    this.peerId = peerId;
  }

}
