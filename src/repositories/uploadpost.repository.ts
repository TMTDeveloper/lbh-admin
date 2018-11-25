import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Uploadpost} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UploadpostRepository extends DefaultCrudRepository<
  Uploadpost,
  typeof Uploadpost.prototype.no_post
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Uploadpost, dataSource);
  }
}
