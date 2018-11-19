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
import {Filelbh} from '../models';
import {FilelbhRepository} from '../repositories';

export class FiledownloadController {
  constructor(
    @repository(FilelbhRepository)
    public filelbhRepository : FilelbhRepository,
  ) {}

  @post('/filelbhs', {
    responses: {
      '200': {
        description: 'Filelbh model instance',
        content: {'application/json': {'x-ts-type': Filelbh}},
      },
    },
  })
  async create(@requestBody() filelbh: Filelbh): Promise<Filelbh> {
    return await this.filelbhRepository.create(filelbh);
  }

  @get('/filelbhs/count', {
    responses: {
      '200': {
        description: 'Filelbh model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Filelbh)) where?: Where,
  ): Promise<Count> {
    return await this.filelbhRepository.count(where);
  }

  @get('/filelbhs', {
    responses: {
      '200': {
        description: 'Array of Filelbh model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Filelbh}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Filelbh)) filter?: Filter,
  ): Promise<Filelbh[]> {
    return await this.filelbhRepository.find(filter);
  }

  @patch('/filelbhs', {
    responses: {
      '200': {
        description: 'Filelbh PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() filelbh: Filelbh,
    @param.query.object('where', getWhereSchemaFor(Filelbh)) where?: Where,
  ): Promise<Count> {
    return await this.filelbhRepository.updateAll(filelbh, where);
  }

  @get('/filelbhs/{id}', {
    responses: {
      '200': {
        description: 'Filelbh model instance',
        content: {'application/json': {'x-ts-type': Filelbh}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Filelbh> {
    return await this.filelbhRepository.findById(id);
  }

  @patch('/filelbhs/{id}', {
    responses: {
      '204': {
        description: 'Filelbh PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() filelbh: Filelbh,
  ): Promise<void> {
    await this.filelbhRepository.updateById(id, filelbh);
  }

  @del('/filelbhs/{id}', {
    responses: {
      '204': {
        description: 'Filelbh DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.filelbhRepository.deleteById(id);
  }
}
