import {Entity, model, property} from '@loopback/repository';

@model({name: 'upload_post'})
export class Uploadpost extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  no_post: string;

  @property({
    type: 'string',
    id: true,
    required: true,
  })
  filename?: string;

  @property({
    type: 'number',
  })
  size?: number;

  @property({
    type: 'string',
  })
  originalfilename?: string;

  @property({
    type: 'date',
  })
  date_upload?: string;

  constructor(data?: Partial<Uploadpost>) {
    super(data);
  }
}
