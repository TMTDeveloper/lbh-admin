import {Entity, model, property} from '@loopback/repository';

@model({name: 'post_dt'})
export class Postdetail extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  no_post: string;

  @property({
    type: 'string',
  })
  posted_by?: string;

  @property({
    type: 'string',
  })
  posted_name?: string;

  @property({
    type: 'string',
  })
  message?: string;

  @property({
    type: 'date',
  })
  date_created?: string;

  constructor(data?: Partial<Postdetail>) {
    super(data);
  }
}
