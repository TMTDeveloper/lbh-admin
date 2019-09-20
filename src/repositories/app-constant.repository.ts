import {DefaultCrudRepository} from '@loopback/repository';
import {AppConstant, AppConstantRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AppConstantRepository extends DefaultCrudRepository<
  AppConstant,
  typeof AppConstant.prototype.id,
  AppConstantRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(AppConstant, dataSource);
  }
}
