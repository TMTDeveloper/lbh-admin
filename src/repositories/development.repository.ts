import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Development} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DevelopmentRepository extends DefaultCrudRepository<
  Development,
  typeof Development.prototype.no_post
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Development, dataSource);
  }
}
