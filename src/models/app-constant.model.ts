import {Entity, model, property} from '@loopback/repository';

@model({name: 'app_constant'})
export class AppConstant extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  version?: string;

  @property({
    type: 'date',
  })
  last_update?: string;

  @property({
    type: 'string',
  })
  note?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AppConstant>) {
    super(data);
  }
}

export interface AppConstantRelations {
  // describe navigational properties here
}

export type AppConstantWithRelations = AppConstant & AppConstantRelations;
