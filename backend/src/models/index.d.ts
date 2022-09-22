import { ModelInit, MutableModel } from '@aws-amplify/datastore';

export declare class ViewersModel {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly socketIds?: string | null;
  readonly monitorId?: string | null;
  readonly userId?: string | null;
  constructor(init: ModelInit<ViewersModel>);
  static copyOf(source: ViewersModel, mutator: (draft: MutableModel<ViewersModel>) => MutableModel<ViewersModel> | void): ViewersModel;
}

export declare class MonitorsModel {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly name?: string | null;
  readonly code?: string | null;
  constructor(init: ModelInit<MonitorsModel>);
  static copyOf(source: MonitorsModel, mutator: (draft: MutableModel<MonitorsModel>) => MutableModel<MonitorsModel> | void): MonitorsModel;
}

export declare class ContactsModel {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly message?: string | null;
  readonly subject?: string | null;
  readonly email?: string | null;
  constructor(init: ModelInit<ContactsModel>);
  static copyOf(source: ContactsModel, mutator: (draft: MutableModel<ContactsModel>) => MutableModel<ContactsModel> | void): ContactsModel;
}
