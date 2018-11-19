import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {User} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.email
> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(User, dataSource);
  }
}
