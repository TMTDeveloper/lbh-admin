import {Entity, model, property} from '@loopback/repository';

@model({name: 'general'})
export class General extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  keyword: string;

  @property({
    type: 'number',
    required: true,
  })
  id_keyword: number;

  @property({
    type: 'string',
    required: true,
  })
  value_keyword: string;

  @property({
    type: 'date',
  })
  date_created?: string;

  @property({
    type: 'date',
  })
  date_modified?: string;

  @property({
    type: 'string',
  })
  active?: string;

  constructor(data?: Partial<General>) {
    super(data);
  }
}
