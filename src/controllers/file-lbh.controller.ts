// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {inject} from '@loopback/core';
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
import {FileService} from '../services';
import {toJSON} from '@loopback/testlab';
import * as Util from 'util';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';

export class FileLBHController {
  constructor(
    @inject('services.FileService') protected fileService: FileService,
    @inject(AuthenticationBindings.CURRENT_USER) private user: UserProfile,
  ) {}

  @get('/filelist', {
    responses: {
      '200': {
        description: 'Array of File',
        content: {
          'application/json': {
            schema: {type: 'array'},
          },
        },
      },
    },
  })
  async createTodo() {
    // if (!todo.title) {
    //   throw new HttpErrors.BadRequest('title is required');
    // }

    // if (todo.remindAtAddress) {
    //   // TODO handle "address not found"
    //   const geo = await this.geoService.geocode(todo.remindAtAddress);
    //   // Encode the coordinates as "lat,lng"
    //   todo.remindAtGeo = `${geo[0].y},${geo[0].x}`;
    // }

    // return await this.todoRepo.create(todo);
    // const file = await this.fileService.getFiles('img', async (err, files) => {
    //   console.log(err);
    //   return await files;
    // });
    // console.log(file);

    const fileList = Util.promisify(this.fileService.getFiles);

    const container = await fileList('pdf');

    return await container;
  }

  @authenticate('BasicStrategy')
  @get('/whoami')
  whoAmI(): string {
    return this.user.id;
  }
}
