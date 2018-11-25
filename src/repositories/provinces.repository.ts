import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Provinces} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProvincesRepository extends DefaultCrudRepository<
  Provinces,
  typeof Provinces.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Provinces, dataSource);
  }
}
