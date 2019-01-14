import {Entity, model, property} from '@loopback/repository';

@model({name: 'villages'})
export class Villages extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  district_id: string;

  @property({
    type: 'string',
  })
  name?: string;

  constructor(data?: Partial<Villages>) {
    super(data);
  }
}
