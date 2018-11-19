import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Filelbh} from '../models';
import {StorageDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FilelbhRepository extends DefaultCrudRepository<
  Filelbh,
  typeof Filelbh.prototype.id
> {
  constructor(
    @inject('datasources.storage') dataSource: StorageDataSource,
  ) {
    super(Filelbh, dataSource);
  }
}
