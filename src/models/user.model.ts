import {Entity, model, property} from '@loopback/repository';

@model({name: 'user'})
export class User extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    id: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  email_login: string;

  @property({
    type: 'number',
    required: true,
  })
  role: number;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  organisasi: number;

  @property({
    type: 'date',
  })
  last_access?: string;

  @property({
    type: 'string',
    required: true,
  })
  active: string;

  @property({
    type: 'date',
  })
  session_end?: string;

  @property({
    type: 'date',
    required: true,
  })
  date_created: string;

  @property({
    type: 'date',
    required: true,
  })
  date_modified: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
