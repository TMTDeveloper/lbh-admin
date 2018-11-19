import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {StorageDataSource} from '../datasources/storage.datasource';

export interface standardCB {
  (err?: any, files?: []): void;
}

export interface FileService {
  // geocode(address: string): Promise<GeoPoint[]>;
  getFiles(container: string): void;
}

export class FileServiceProvider implements Provider<FileService> {
  constructor(
    @inject('datasources.storage')
    protected dataSource: juggler.DataSource = new StorageDataSource(),
  ) {}

  value(): Promise<FileService> {
    return getService(this.dataSource);
  }
}
