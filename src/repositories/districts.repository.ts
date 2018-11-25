import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Districts} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DistrictsRepository extends DefaultCrudRepository<
  Districts,
  typeof Districts.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Districts, dataSource);
  }
}
