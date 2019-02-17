import {Entity, model, property} from '@loopback/repository';

@model({name: 'post_log'})
export class PostLog extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id_user: string;
  @property({
    type: 'string',
  })
  no_post: string;

  @property({
    type: 'date',
  })
  last_access?: string;

  constructor(data?: Partial<PostLog>) {
    super(data);
  }
}
