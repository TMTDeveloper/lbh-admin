import {Entity, model, property} from '@loopback/repository';

@model()
export class Regencies extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  province_id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  constructor(data?: Partial<Regencies>) {
    super(data);
  }
}
