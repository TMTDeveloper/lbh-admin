import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository, AppConstantRepository} from '../repositories';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';
import * as moment from 'moment';
import {SHA256} from 'crypto-js';

export class UsermanagementController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<UserProfile>,
    @repository(AppConstantRepository)
    public appConstantRepository: AppConstantRepository,
  ) {}

  currVer = '1.00';

  @authenticate('BasicStrategy')
  @get('/login')
  async whoAmI() {
    console.log('entering');
    const userProf = await this.getCurrentUser();
    let filter: Filter = {
      where: {email_login: userProf.id},
    };
    let userIns = await this.userRepository.find(filter);
    if (userIns[0].active != 'Y' || userIns[0].role > 2) {
      throw new HttpErrors.Unauthorized('User not Authorized to login');
    } else {
      userIns[0].session_end = moment()
        .add(2, 'h')
        .format();
      await this.userRepository.updateById(userProf.id, userIns[0]);
      return await this.userRepository.findById(userProf.id);
    }
  }

  @get('/version')
  async versionChecker() {
    return await this.appConstantRepository.findById(1);
  }

  @authenticate('BasicStrategy')
  @get('/loginadmin')
  async adminlog() {
    console.log('entering');

    const userProf = await this.getCurrentUser();
    let filter: Filter = {
      where: {email_login: userProf.id},
    };
    let userIns = await this.userRepository.find(filter);
    if (userIns[0].role < 3 || userIns[0].active != 'Y') {
      throw new HttpErrors.Unauthorized('User not Authorized to login');
    } else {
      userIns[0].session_end = moment()
        .add(2, 'h')
        .format();
      await this.userRepository.updateById(userProf.id, userIns[0]);
      return await this.userRepository.findById(userProf.id);
    }
  }

  // @authenticate('BasicStrategy')
  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {'x-ts-type': User}},
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    user.password = SHA256(user.password)
      .toString()
      .toUpperCase();
    return await this.userRepository.create(user);
  }

  // @authenticate('BasicStrategy')
  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  // @authenticate('BasicStrategy')
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': User}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  // @authenticate('BasicStrategy')
  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @patch('/users/reset', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async reset(
    @requestBody() user: any,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    user.password = SHA256(user.new_password)
      .toString()
      .toUpperCase();
    delete user.new_password;
    let newUser = new User(user);
    return await this.userRepository.updateAll(newUser, where);
  }

  // @authenticate('BasicStrategy')
  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {'x-ts-type': User}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  // @authenticate('BasicStrategy')
  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  // @authenticate('BasicStrategy')
  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
