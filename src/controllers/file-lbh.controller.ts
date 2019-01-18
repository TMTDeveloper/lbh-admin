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
  Request,
  Response,
  RequestContext,
  RestBindings,
  HttpErrors,
} from '@loopback/rest';
import {FileService} from '../services';
import {toJSON} from '@loopback/testlab';
import * as Util from 'util';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';
import {UploadpostRepository} from '../repositories';
import * as moment from 'moment';
import {Uploadpost} from '../models';
export class FileLBHController {
  constructor(
    @inject(RestBindings.Http.REQUEST) public request: Request,
    @inject(RestBindings.Http.RESPONSE) public response: Response,
    @inject('services.FileService') protected fileService: FileService,
    @repository(UploadpostRepository)
    public uploadpostRepository: UploadpostRepository,
  ) {}

  @post('/uploadpost')
  async uploadFile() {
    const optionss = {};
    const upfile = Util.promisify(this.fileService.upload);
    try {
      const container: any = await upfile(
        'uploads',
        this.request,
        this.response,
      );
      container.files.file.forEach(async (element: any) => {
        let post = new Uploadpost({
          no_post: container.fields.no_post[0],
          filename: element.name,
          originalfilename: element.originalFilename,
          size: element.size,
          date_upload: moment().format(),
        });
        await this.uploadpostRepository.create(post);
      });
      return await container;
    } catch (err) {
      console.log('inHere');
      return err;
    }
  }

  @post('/findupload', {
    responses: {
      '200': {
        description: 'Array of Uploadpost model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Uploadpost}},
          },
        },
      },
    },
  })
  async find(@requestBody() body: Filter): Promise<Uploadpost[]> {
    console.log(body);
    return await this.uploadpostRepository.find(body);
  }

  @get('/download')
  async downloadFile(@param.query.string('filename') name?: string) {
    try {
      const downFile = Util.promisify(this.fileService.download);
      console.log(name);
      const container = await downFile(
        'uploads',
        name,
        this.request,
        this.response,
      );
      return await container;
    } catch {
      throw HttpErrors[500];
    }
  }

  @post('/filedelete')
  async deleteFile(@requestBody() body: any) {
    try {
      const delFile = Util.promisify(this.fileService.removeFile);
      console.log(body);
      const container = await delFile('uploads', body.filename);
      await container;
      return await this.uploadpostRepository.deleteById(body.filename);
    } catch (error) {
      console.log(error);
      throw HttpErrors[500];
    }
  }

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
}
