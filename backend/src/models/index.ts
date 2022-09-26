import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { MonitorsModel, ViewersModel, ContactsModel } = initSchema(schema);

export {
  MonitorsModel,
  ViewersModel,
  ContactsModel
};