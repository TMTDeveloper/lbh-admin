import {Entity, model, property} from '@loopback/repository';

@model({name: 'provinces'})
export class Provinces extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  name?: string;

  constructor(data?: Partial<Provinces>) {
    super(data);
  }
}
