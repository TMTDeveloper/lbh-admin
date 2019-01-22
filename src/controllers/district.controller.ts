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
import {Districts} from '../models';
import {DistrictsRepository} from '../repositories';

export class DistrictController {
  constructor(
    @repository(DistrictsRepository)
    public districtsRepository: DistrictsRepository,
  ) {}

  @post('/districts', {
    responses: {
      '200': {
        description: 'Districts model instance',
        content: {'application/json': {'x-ts-type': Districts}},
      },
    },
  })
  async create(@requestBody() districts: Districts): Promise<Districts> {
    return await this.districtsRepository.create(districts);
  }

  @get('/districts/count', {
    responses: {
      '200': {
        description: 'Districts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Districts)) where?: Where,
  ): Promise<Count> {
    return await this.districtsRepository.count(where);
  }

  @get('/districts', {
    responses: {
      '200': {
        description: 'Array of Districts model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Districts}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Districts))
    filter?: Filter,
  ): Promise<Districts[]> {
    return await this.districtsRepository.find(filter);
  }

  @patch('/districts', {
    responses: {
      '200': {
        description: 'Districts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() districts: Districts,
    @param.query.object('where', getWhereSchemaFor(Districts)) where?: Where,
  ): Promise<Count> {
    return await this.districtsRepository.updateAll(districts, where);
  }

  @get('/districts/{id}', {
    responses: {
      '200': {
        description: 'Districts model instance',
        content: {'application/json': {'x-ts-type': Districts}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Districts> {
    return await this.districtsRepository.findById(id);
  }

  @patch('/districts/{id}', {
    responses: {
      '204': {
        description: 'Districts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() districts: Districts,
  ): Promise<void> {
    await this.districtsRepository.updateById(id, districts);
  }

  @del('/districts/{id}', {
    responses: {
      '204': {
        description: 'Districts DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.districtsRepository.deleteById(id);
  }
}
