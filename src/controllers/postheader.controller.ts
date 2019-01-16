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
  HttpErrors,
} from '@loopback/rest';
import {Postheader} from '../models';
import {PostheaderRepository} from '../repositories';

export class PostheaderController {
  constructor(
    @repository(PostheaderRepository)
    public postheaderRepository: PostheaderRepository,
  ) {}

  @post('/postheaders', {
    responses: {
      '200': {
        description: 'Postheader model instance',
        content: {'application/json': {'x-ts-type': Postheader}},
      },
    },
  })
  async create(@requestBody() postheader: Postheader) {
    let defaultNo = 'PST0000000';
    const count = await this.postheaderRepository.count();
    let a = count.count + 1;

    let str = defaultNo.substr(0, 10 - a.toString().length);
    postheader.no_post = str + a.toString();
    // try {
    //   await this.postheaderRepository.create(postheader);
    //   console.log(postheader);
    //   return postheader;
    // } catch {
    //   throw HttpErrors[500];
    // }
    await this.postheaderRepository.create(postheader);
    console.log(postheader);
    return postheader;
  }

  @get('/postheaders/count', {
    responses: {
      '200': {
        description: 'Postheader model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Postheader)) where?: Where,
  ): Promise<Count> {
    return await this.postheaderRepository.count(where);
  }

  @get('/postheaders', {
    responses: {
      '200': {
        description: 'Array of Postheader model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Postheader}},
          },
        },
      },
    },
  })
  async find(
    @requestBody() filterbody: Filter,
    @param.query.object('filter', getFilterSchemaFor(Postheader))
    filter?: Filter,
  ): Promise<Postheader[]> {
    return await this.postheaderRepository.find(filterbody);
  }

  @patch('/postheaders', {
    responses: {
      '200': {
        description: 'Postheader PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() postheader: Postheader,
    @param.query.object('where', getWhereSchemaFor(Postheader)) where?: Where,
  ): Promise<Count> {
    return await this.postheaderRepository.updateAll(postheader, where);
  }

  @get('/postheaders/{id}', {
    responses: {
      '200': {
        description: 'Postheader model instance',
        content: {'application/json': {'x-ts-type': Postheader}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Postheader> {
    return await this.postheaderRepository.findById(id);
  }

  @patch('/postheaders/{id}', {
    responses: {
      '204': {
        description: 'Postheader PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() postheader: Postheader,
  ): Promise<void> {
    await this.postheaderRepository.updateById(id, postheader);
  }

  @del('/postheaders/{id}', {
    responses: {
      '204': {
        description: 'Postheader DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postheaderRepository.deleteById(id);
  }
}
