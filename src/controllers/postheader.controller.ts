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
import {promises} from 'fs';
import {PostLogRepository} from '../repositories';
import {Postdetail} from '../models';
import {PostdetailRepository} from '../repositories';
import moment = require('moment');
export class PostheaderController {
  constructor(
    @repository(PostheaderRepository)
    public postheaderRepository: PostheaderRepository,
    @repository(PostLogRepository)
    public postLogRepository: PostLogRepository,
    @repository(PostdetailRepository)
    public postdetailRepository: PostdetailRepository,
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
    try {
      await this.postheaderRepository.create(postheader);
      console.log(postheader);
      return postheader;
    } catch {
      throw HttpErrors[500];
    }
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
    @param.query.object('filter', getFilterSchemaFor(Postheader))
    filter?: Filter,
  ): Promise<any> {
    let dataHeaders = await this.postheaderRepository.find(filter);
    let dataDetails = await this.postdetailRepository.find();
    let dataLog = await this.postLogRepository.find();
    let dataHeadersConverted: any[] = [];
    dataHeaders.forEach(element => {
      let a: any = element.toObject();
      let matchedNoPost = dataDetails.filter(elArr => {
        return elArr.no_post == element.no_post;
      });
      let matchedDataDetail: any;
      if (matchedNoPost.length > 0) {
        matchedDataDetail = matchedNoPost.reduce(function(prev, current) {
          return moment(prev.date_created).isAfter(current.date_created)
            ? prev
            : current;
        });
        a.last_post = matchedDataDetail.date_created;
      }

      let matchedLogPost = dataLog.filter(elArr => {
        return elArr.no_post == element.no_post;
      });
      let matchedLogDetail: any;
      if (matchedLogPost.length > 0) {
        matchedLogDetail = matchedLogPost.reduce(function(prev, current) {
          return moment(prev.last_access).isAfter(current.last_access)
            ? prev
            : current;
        });
        a.date_access = matchedLogDetail.last_access;
      } else {
        a.date_access = null;
      }

      dataHeadersConverted.push(a);
    });
    return new Promise((resolve, reject) => {
      resolve(dataHeadersConverted);
    });
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
