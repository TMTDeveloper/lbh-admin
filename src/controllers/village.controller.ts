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
import {Villages} from '../models';
import {VillagesRepository} from '../repositories';

export class VillageController {
  constructor(
    @repository(VillagesRepository)
    public villagesRepository: VillagesRepository,
  ) {}

  @post('/villages', {
    responses: {
      '200': {
        description: 'Villages model instance',
        content: {'application/json': {'x-ts-type': Villages}},
      },
    },
  })
  async create(@requestBody() villages: Villages): Promise<Villages> {
    return await this.villagesRepository.create(villages);
  }

  @get('/villages/count', {
    responses: {
      '200': {
        description: 'Villages model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Villages)) where?: Where,
  ): Promise<Count> {
    return await this.villagesRepository.count(where);
  }

  @get('/villages', {
    responses: {
      '200': {
        description: 'Array of Villages model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Villages}},
          },
        },
      },
    },
  })
  async find(
    @requestBody() filterbody: Filter,
    @param.query.object('filter', getFilterSchemaFor(Villages)) filter?: Filter,
  ): Promise<Villages[]> {
    return await this.villagesRepository.find(filterbody);
  }

  @patch('/villages', {
    responses: {
      '200': {
        description: 'Villages PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() villages: Villages,
    @param.query.object('where', getWhereSchemaFor(Villages)) where?: Where,
  ): Promise<Count> {
    return await this.villagesRepository.updateAll(villages, where);
  }

  @get('/villages/{id}', {
    responses: {
      '200': {
        description: 'Villages model instance',
        content: {'application/json': {'x-ts-type': Villages}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Villages> {
    return await this.villagesRepository.findById(id);
  }

  @patch('/villages/{id}', {
    responses: {
      '204': {
        description: 'Villages PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() villages: Villages,
  ): Promise<void> {
    await this.villagesRepository.updateById(id, villages);
  }

  @del('/villages/{id}', {
    responses: {
      '204': {
        description: 'Villages DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.villagesRepository.deleteById(id);
  }
}
