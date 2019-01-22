import {Entity, model, property} from '@loopback/repository';

@model({name: 'districts'})
export class Districts extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  regency_id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  constructor(data?: Partial<Districts>) {
    super(data);
  }
}
