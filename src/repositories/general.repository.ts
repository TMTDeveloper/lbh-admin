import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {General} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GeneralRepository extends DefaultCrudRepository<
  General,
  typeof General.prototype.keyword
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(General, dataSource);
  }
}
