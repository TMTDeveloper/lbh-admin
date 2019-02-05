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
import {General} from '../models';
import {GeneralRepository} from '../repositories';

export class GeneralController {
  constructor(
    @repository(GeneralRepository)
    public generalRepository : GeneralRepository,
  ) {}

  @post('/generals', {
    responses: {
      '200': {
        description: 'General model instance',
        content: {'application/json': {'x-ts-type': General}},
      },
    },
  })
  async create(@requestBody() general: General): Promise<General> {
    return await this.generalRepository.create(general);
  }

  @get('/generals/count', {
    responses: {
      '200': {
        description: 'General model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(General)) where?: Where,
  ): Promise<Count> {
    return await this.generalRepository.count(where);
  }

  @get('/generals', {
    responses: {
      '200': {
        description: 'Array of General model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': General}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(General)) filter?: Filter,
  ): Promise<General[]> {
    return await this.generalRepository.find(filter);
  }

  @patch('/generals', {
    responses: {
      '200': {
        description: 'General PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() general: General,
    @param.query.object('where', getWhereSchemaFor(General)) where?: Where,
  ): Promise<Count> {
    return await this.generalRepository.updateAll(general, where);
  }

  @get('/generals/{id}', {
    responses: {
      '200': {
        description: 'General model instance',
        content: {'application/json': {'x-ts-type': General}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<General> {
    return await this.generalRepository.findById(id);
  }

  @patch('/generals/{id}', {
    responses: {
      '204': {
        description: 'General PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() general: General,
  ): Promise<void> {
    await this.generalRepository.updateById(id, general);
  }

  @del('/generals/{id}', {
    responses: {
      '204': {
        description: 'General DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.generalRepository.deleteById(id);
  }
}
