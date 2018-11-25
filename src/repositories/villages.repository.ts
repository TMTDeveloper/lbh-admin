import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Villages} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VillagesRepository extends DefaultCrudRepository<
  Villages,
  typeof Villages.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Villages, dataSource);
  }
}
