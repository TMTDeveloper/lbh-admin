import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {StorageDataSource} from '../datasources/storage.datasource';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
  Request,
  Response,
} from '@loopback/rest';
export interface standardCB {
  (err?: any, files?: []): void;
}

export interface FileService {
  // geocode(address: string): Promise<GeoPoint[]>;
  getFiles(container: string): void;
  upload(
    container?: string,
    req?: Request,
    res?: Response,
    options?: Object,
  ): void;
  download(container: any, file: any, req: any, res: any, cb: any): void;
  removeFile(container: any, file: any, cb: any): void;
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
