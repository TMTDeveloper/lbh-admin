import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Regencies} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RegenciesRepository extends DefaultCrudRepository<
  Regencies,
  typeof Regencies.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Regencies, dataSource);
  }
}
