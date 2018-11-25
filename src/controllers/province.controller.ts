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
import {Provinces} from '../models';
import {ProvincesRepository} from '../repositories';

export class ProvinceController {
  constructor(
    @repository(ProvincesRepository)
    public provincesRepository: ProvincesRepository,
  ) {}

  @post('/provinces', {
    responses: {
      '200': {
        description: 'Provinces model instance',
        content: {'application/json': {'x-ts-type': Provinces}},
      },
    },
  })
  async create(@requestBody() provinces: Provinces): Promise<Provinces> {
    return await this.provincesRepository.create(provinces);
  }

  @get('/provinces/count', {
    responses: {
      '200': {
        description: 'Provinces model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Provinces)) where?: Where,
  ): Promise<Count> {
    return await this.provincesRepository.count(where);
  }

  @get('/provinces', {
    responses: {
      '200': {
        description: 'Array of Provinces model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Provinces}},
          },
        },
      },
    },
  })
  async find(
    @requestBody() filterbody: Filter,
    @param.query.object('filter', getFilterSchemaFor(Provinces))
    filter?: Filter,
  ): Promise<Provinces[]> {
    return await this.provincesRepository.find(filterbody);
  }

  @patch('/provinces', {
    responses: {
      '200': {
        description: 'Provinces PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() provinces: Provinces,
    @param.query.object('where', getWhereSchemaFor(Provinces)) where?: Where,
  ): Promise<Count> {
    return await this.provincesRepository.updateAll(provinces, where);
  }

  @get('/provinces/{id}', {
    responses: {
      '200': {
        description: 'Provinces model instance',
        content: {'application/json': {'x-ts-type': Provinces}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Provinces> {
    return await this.provincesRepository.findById(id);
  }

  @patch('/provinces/{id}', {
    responses: {
      '204': {
        description: 'Provinces PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() provinces: Provinces,
  ): Promise<void> {
    await this.provincesRepository.updateById(id, provinces);
  }

  @del('/provinces/{id}', {
    responses: {
      '204': {
        description: 'Provinces DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.provincesRepository.deleteById(id);
  }
}
