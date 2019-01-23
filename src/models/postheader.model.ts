import {Entity, model, property} from '@loopback/repository';

@model({name: 'post_hd'})
export class Postheader extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  no_post: string;

  @property({
    type: 'number',
  })
  type?: number;

  @property({
    type: 'string',
  })
  posted_by?: string;

  @property({
    type: 'string',
  })
  posted_name?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'number',
  })
  organisasi?: number;

  @property({
    type: 'number',
  })
  status?: number;

  @property({
    type: 'string',
  })
  province_id?: string;

  @property({
    type: 'string',
  })
  province?: string;

  @property({
    type: 'string',
  })
  regency_id?: string;

  @property({
    type: 'string',
  })
  regency?: string;

  @property({
    type: 'string',
  })
  district_id?: string;

  @property({
    type: 'string',
  })
  district?: string;

  @property({
    type: 'string',
  })
  village_id?: string;

  @property({
    type: 'string',
  })
  village?: string;

  @property({
    type: 'string',
  })
  nama_korban?: string;

  @property({
    type: 'string',
  })
  nama_pelaku?: string;

  @property({
    type: 'number',
  })
  jenis_kejadian?: number;

  @property({
    type: 'date',
  })
  tanggal_kejadian?: string;

  @property({
    type: 'string',
  })
  kronologi?: string;

  @property({
    type: 'string',
  })
  pembelajaran?: string;

  @property({
    type: 'date',
  })
  date_created?: string;

  @property({
    type: 'date',
  })
  date_modified?: string;

  constructor(data?: Partial<Postheader>) {
    super(data);
  }
}
