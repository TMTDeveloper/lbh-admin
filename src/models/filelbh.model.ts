import {Entity, model, property} from '@loopback/repository';

@model()
export class Filelbh extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  dateupload: string;

  constructor(data?: Partial<Filelbh>) {
    super(data);
  }
}
