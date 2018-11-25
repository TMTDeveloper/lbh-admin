import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Postheader} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostheaderRepository extends DefaultCrudRepository<
  Postheader,
  typeof Postheader.prototype.no_post
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Postheader, dataSource);
  }
}
