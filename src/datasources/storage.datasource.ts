import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './storage.datasource.json';

export class StorageDataSource extends juggler.DataSource {
  static dataSourceName = 'storage';

  constructor(
    @inject('datasources.config.storage', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
