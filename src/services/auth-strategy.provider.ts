import {Provider, inject, ValueOrPromise} from '@loopback/context';
import {Strategy} from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import {BasicStrategy} from 'passport-http';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  RepositoryMixin,
} from '@loopback/repository';
import {UserRepository} from '../repositories';
import {SHA256} from 'crypto-js';
import {MysqlDataSource} from '../datasources';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {User} from '../models';
import * as moment from 'moment';
import {HttpErrors} from '@loopback/rest';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}

  value(): ValueOrPromise<Strategy | undefined> {
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify);
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify = async (
    username: string,
    password: string,
    cb: (err: Error | null, user?: UserProfile | false) => void,
  ) => {
    const encpass = SHA256(password);
    try {
      let filter: Filter = {
        where: {email_login: username},
      };
      let userdb = await this.userRepository.find(filter);
      if (userdb == null) {
        return cb(null, false);
      }
      if (userdb[0].password != encpass.toString().toUpperCase()) {
        return cb(null, false);
      }
      userdb[0].last_access = moment().format();
      await this.userRepository.updateById(username, userdb[0]);
      const userauth = {
        id: userdb[0].email,
        name: userdb[0].name,
        password: userdb[0].password,
      };

      return cb(null, userauth);
    } catch (error) {
      return cb(error);
    }
  };
}
