import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Postdetail} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostdetailRepository extends DefaultCrudRepository<
  Postdetail,
  typeof Postdetail.prototype.no_post
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Postdetail, dataSource);
  }
}
