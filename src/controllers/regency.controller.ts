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
import {Regencies} from '../models';
import {RegenciesRepository} from '../repositories';

export class RegencyController {
  constructor(
    @repository(RegenciesRepository)
    public regenciesRepository: RegenciesRepository,
  ) {}

  @post('/regencies', {
    responses: {
      '200': {
        description: 'Regencies model instance',
        content: {'application/json': {'x-ts-type': Regencies}},
      },
    },
  })
  async create(@requestBody() regencies: Regencies): Promise<Regencies> {
    return await this.regenciesRepository.create(regencies);
  }

  @get('/regencies/count', {
    responses: {
      '200': {
        description: 'Regencies model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Regencies)) where?: Where,
  ): Promise<Count> {
    return await this.regenciesRepository.count(where);
  }

  @get('/regencies', {
    responses: {
      '200': {
        description: 'Array of Regencies model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Regencies}},
          },
        },
      },
    },
  })
  async find(
    @requestBody() filterbody: Filter,
    @param.query.object('filter', getFilterSchemaFor(Regencies))
    filter?: Filter,
  ): Promise<Regencies[]> {
    return await this.regenciesRepository.find(filterbody);
  }

  @patch('/regencies', {
    responses: {
      '200': {
        description: 'Regencies PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() regencies: Regencies,
    @param.query.object('where', getWhereSchemaFor(Regencies)) where?: Where,
  ): Promise<Count> {
    return await this.regenciesRepository.updateAll(regencies, where);
  }

  @get('/regencies/{id}', {
    responses: {
      '200': {
        description: 'Regencies model instance',
        content: {'application/json': {'x-ts-type': Regencies}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Regencies> {
    return await this.regenciesRepository.findById(id);
  }

  @patch('/regencies/{id}', {
    responses: {
      '204': {
        description: 'Regencies PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() regencies: Regencies,
  ): Promise<void> {
    await this.regenciesRepository.updateById(id, regencies);
  }

  @del('/regencies/{id}', {
    responses: {
      '204': {
        description: 'Regencies DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.regenciesRepository.deleteById(id);
  }
}
