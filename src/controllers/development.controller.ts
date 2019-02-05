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
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Development} from '../models';
import {DevelopmentRepository} from '../repositories';

export class DevelopmentController {
  constructor(
    @repository(DevelopmentRepository)
    public developmentRepository : DevelopmentRepository,
  ) {}

  @post('/developments', {
    responses: {
      '200': {
        description: 'Development model instance',
        content: {'application/json': {'x-ts-type': Development}},
      },
    },
  })
  async create(@requestBody() development: Development): Promise<Development> {
    return await this.developmentRepository.create(development);
  }

  @get('/developments/count', {
    responses: {
      '200': {
        description: 'Development model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Development)) where?: Where,
  ): Promise<Count> {
    return await this.developmentRepository.count(where);
  }

  @get('/developments', {
    responses: {
      '200': {
        description: 'Array of Development model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Development}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Development)) filter?: Filter,
  ): Promise<Development[]> {
    return await this.developmentRepository.find(filter);
  }

  @patch('/developments', {
    responses: {
      '200': {
        description: 'Development PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() development: Development,
    @param.query.object('where', getWhereSchemaFor(Development)) where?: Where,
  ): Promise<Count> {
    return await this.developmentRepository.updateAll(development, where);
  }

  @get('/developments/{id}', {
    responses: {
      '200': {
        description: 'Development model instance',
        content: {'application/json': {'x-ts-type': Development}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Development> {
    return await this.developmentRepository.findById(id);
  }

  @patch('/developments/{id}', {
    responses: {
      '204': {
        description: 'Development PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() development: Development,
  ): Promise<void> {
    await this.developmentRepository.updateById(id, development);
  }

  @del('/developments/{id}', {
    responses: {
      '204': {
        description: 'Development DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.developmentRepository.deleteById(id);
  }
}
