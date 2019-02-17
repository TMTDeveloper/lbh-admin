import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {PostLog} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostLogRepository extends DefaultCrudRepository<
  PostLog,
  typeof PostLog.prototype.id_user
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PostLog, dataSource);
  }
}
