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
import {Postdetail} from '../models';
import {PostdetailRepository} from '../repositories';

export class PostdetailController {
  constructor(
    @repository(PostdetailRepository)
    public postdetailRepository: PostdetailRepository,
  ) {}

  @post('/postdetails', {
    responses: {
      '200': {
        description: 'Postdetail model instance',
        content: {'application/json': {'x-ts-type': Postdetail}},
      },
    },
  })
  async create(@requestBody() postdetail: Postdetail): Promise<Postdetail> {
    return await this.postdetailRepository.create(postdetail);
  }

  @get('/postdetails/count', {
    responses: {
      '200': {
        description: 'Postdetail model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Postdetail)) where?: Where,
  ): Promise<Count> {
    return await this.postdetailRepository.count(where);
  }

  @get('/postdetails', {
    responses: {
      '200': {
        description: 'Array of Postdetail model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Postdetail}},
          },
        },
      },
    },
  })
  async find(
    @requestBody() filterbody: Filter,
    @param.query.object('filter', getFilterSchemaFor(Postdetail))
    filter?: Filter,
  ): Promise<Postdetail[]> {
    return await this.postdetailRepository.find(filter);
  }

  @patch('/postdetails', {
    responses: {
      '200': {
        description: 'Postdetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() postdetail: Postdetail,
    @param.query.object('where', getWhereSchemaFor(Postdetail)) where?: Where,
  ): Promise<Count> {
    return await this.postdetailRepository.updateAll(postdetail, where);
  }

  @get('/postdetails/{id}', {
    responses: {
      '200': {
        description: 'Postdetail model instance',
        content: {'application/json': {'x-ts-type': Postdetail}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Postdetail> {
    return await this.postdetailRepository.findById(id);
  }

  @patch('/postdetails/{id}', {
    responses: {
      '204': {
        description: 'Postdetail PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() postdetail: Postdetail,
  ): Promise<void> {
    await this.postdetailRepository.updateById(id, postdetail);
  }

  @del('/postdetails/{id}', {
    responses: {
      '204': {
        description: 'Postdetail DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postdetailRepository.deleteById(id);
  }
}
