import {Entity, model, property} from '@loopback/repository';

@model({name: 'kegiatan_hd'})
export class Kegiatanheader extends Entity {
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
  nama_pelaksana?: string;

  @property({
    type: 'number',
  })
  jenis_kegiatan?: number;

  @property({
    type: 'date',
  })
  tanggal_kegiatan?: string;

  @property({
    type: 'string',
  })
  deskripsi?: string;

  @property({
    type: 'date',
  })
  date_created?: string;

  @property({
    type: 'date',
  })
  date_modified?: string;

  constructor(data?: Partial<Kegiatanheader>) {
    super(data);
  }
}
