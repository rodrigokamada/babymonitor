
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { ViewersModel, MonitorsModel, ContactsModel } = initSchema(schema);

export {
  ViewersModel,
  MonitorsModel,
  ContactsModel,
};
