import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Kegiatanheader} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class KegiatanheaderRepository extends DefaultCrudRepository<
  Kegiatanheader,
  typeof Kegiatanheader.prototype.no_post
> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(Kegiatanheader, dataSource);
  }
}
