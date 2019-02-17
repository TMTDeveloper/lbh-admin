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
import {PostLog} from '../models';
import {PostLogRepository} from '../repositories';

export class PostlogController {
  constructor(
    @repository(PostLogRepository)
    public postLogRepository : PostLogRepository,
  ) {}

  @post('/post-logs', {
    responses: {
      '200': {
        description: 'PostLog model instance',
        content: {'application/json': {'x-ts-type': PostLog}},
      },
    },
  })
  async create(@requestBody() postLog: PostLog): Promise<PostLog> {
    return await this.postLogRepository.create(postLog);
  }

  @get('/post-logs/count', {
    responses: {
      '200': {
        description: 'PostLog model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PostLog)) where?: Where,
  ): Promise<Count> {
    return await this.postLogRepository.count(where);
  }

  @get('/post-logs', {
    responses: {
      '200': {
        description: 'Array of PostLog model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': PostLog}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PostLog)) filter?: Filter,
  ): Promise<PostLog[]> {
    return await this.postLogRepository.find(filter);
  }

  @patch('/post-logs', {
    responses: {
      '200': {
        description: 'PostLog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() postLog: PostLog,
    @param.query.object('where', getWhereSchemaFor(PostLog)) where?: Where,
  ): Promise<Count> {
    return await this.postLogRepository.updateAll(postLog, where);
  }

  @get('/post-logs/{id}', {
    responses: {
      '200': {
        description: 'PostLog model instance',
        content: {'application/json': {'x-ts-type': PostLog}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<PostLog> {
    return await this.postLogRepository.findById(id);
  }

  @patch('/post-logs/{id}', {
    responses: {
      '204': {
        description: 'PostLog PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() postLog: PostLog,
  ): Promise<void> {
    await this.postLogRepository.updateById(id, postLog);
  }

  @del('/post-logs/{id}', {
    responses: {
      '204': {
        description: 'PostLog DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postLogRepository.deleteById(id);
  }
}
