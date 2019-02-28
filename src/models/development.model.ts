import {Entity, model, property} from '@loopback/repository';

@model({name: 'development_dt'})
export class Development extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  no_post: string;

  @property({
    type: 'string',
  })
  message?: string;

  @property({
    type: 'string',
  })
  approved?: string;

  @property({
    type: 'date',
  })
  date_created?: string;

  constructor(data?: Partial<Development>) {
    super(data);
  }
}
