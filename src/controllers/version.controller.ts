import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {AppConstant} from '../models';
import {AppConstantRepository} from '../repositories';

export class VersionController {
  constructor(
    @repository(AppConstantRepository)
    public appConstantRepository : AppConstantRepository,
  ) {}

  @post('/app-constants', {
    responses: {
      '200': {
        description: 'AppConstant model instance',
        content: {'application/json': {schema: getModelSchemaRef(AppConstant)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppConstant, {
            title: 'NewAppConstant',
            exclude: ['id'],
          }),
        },
      },
    })
    appConstant: Omit<AppConstant, 'id'>,
  ): Promise<AppConstant> {
    return this.appConstantRepository.create(appConstant);
  }

  @get('/app-constants/count', {
    responses: {
      '200': {
        description: 'AppConstant model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(AppConstant)) where?: Where<AppConstant>,
  ): Promise<Count> {
    return this.appConstantRepository.count(where);
  }

  @get('/app-constants', {
    responses: {
      '200': {
        description: 'Array of AppConstant model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AppConstant)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(AppConstant)) filter?: Filter<AppConstant>,
  ): Promise<AppConstant[]> {
    return this.appConstantRepository.find(filter);
  }

  @patch('/app-constants', {
    responses: {
      '200': {
        description: 'AppConstant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppConstant, {partial: true}),
        },
      },
    })
    appConstant: AppConstant,
    @param.query.object('where', getWhereSchemaFor(AppConstant)) where?: Where<AppConstant>,
  ): Promise<Count> {
    return this.appConstantRepository.updateAll(appConstant, where);
  }

  @get('/app-constants/{id}', {
    responses: {
      '200': {
        description: 'AppConstant model instance',
        content: {'application/json': {schema: getModelSchemaRef(AppConstant)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<AppConstant> {
    return this.appConstantRepository.findById(id);
  }

  @patch('/app-constants/{id}', {
    responses: {
      '204': {
        description: 'AppConstant PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppConstant, {partial: true}),
        },
      },
    })
    appConstant: AppConstant,
  ): Promise<void> {
    await this.appConstantRepository.updateById(id, appConstant);
  }

  @put('/app-constants/{id}', {
    responses: {
      '204': {
        description: 'AppConstant PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() appConstant: AppConstant,
  ): Promise<void> {
    await this.appConstantRepository.replaceById(id, appConstant);
  }

  @del('/app-constants/{id}', {
    responses: {
      '204': {
        description: 'AppConstant DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appConstantRepository.deleteById(id);
  }
}
