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
import {Kegiatanheader} from '../models';
import {KegiatanheaderRepository} from '../repositories';

export class KegiatanController {
  constructor(
    @repository(KegiatanheaderRepository)
    public kegiatanheaderRepository: KegiatanheaderRepository,
  ) {}

  @post('/kegiatanheaders', {
    responses: {
      '200': {
        description: 'Kegiatanheader model instance',
        content: {'application/json': {'x-ts-type': Kegiatanheader}},
      },
    },
  })
  async create(@requestBody() Kegiatanheader: Kegiatanheader) {
    let defaultNo = 'KGT0000000';
    const count = await this.kegiatanheaderRepository.count();
    let a = count.count + 1;

    let str = defaultNo.substr(0, 10 - a.toString().length);
    Kegiatanheader.no_post = str + a.toString();
    try {
      await this.kegiatanheaderRepository.create(Kegiatanheader);
      console.log(Kegiatanheader);
      return Kegiatanheader;
    } catch (error) {
      console.log(error);
      throw HttpErrors[500];
    }
  }

  @get('/kegiatanheaders/count', {
    responses: {
      '200': {
        description: 'Kegiatanheader model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Kegiatanheader))
    where?: Where,
  ): Promise<Count> {
    return await this.kegiatanheaderRepository.count(where);
  }

  @get('/kegiatanheaders', {
    responses: {
      '200': {
        description: 'Array of Kegiatanheader model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Kegiatanheader}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Kegiatanheader))
    filter?: Filter,
  ): Promise<Kegiatanheader[]> {
    return await this.kegiatanheaderRepository.find(filter);
  }

  @patch('/kegiatanheaders', {
    responses: {
      '200': {
        description: 'Kegiatanheader PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() Kegiatanheader: Kegiatanheader,
    @param.query.object('where', getWhereSchemaFor(Kegiatanheader))
    where?: Where,
  ): Promise<Count> {
    return await this.kegiatanheaderRepository.updateAll(Kegiatanheader, where);
  }

  @get('/kegiatanheaders/{id}', {
    responses: {
      '200': {
        description: 'Kegiatanheader model instance',
        content: {'application/json': {'x-ts-type': Kegiatanheader}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Kegiatanheader> {
    return await this.kegiatanheaderRepository.findById(id);
  }

  @patch('/kegiatanheaders/{id}', {
    responses: {
      '204': {
        description: 'Kegiatanheader PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() Kegiatanheader: Kegiatanheader,
  ): Promise<void> {
    await this.kegiatanheaderRepository.updateById(id, Kegiatanheader);
  }

  @del('/kegiatanheaders/{id}', {
    responses: {
      '204': {
        description: 'Kegiatanheader DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.kegiatanheaderRepository.deleteById(id);
  }
}
