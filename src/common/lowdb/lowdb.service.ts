import { Injectable, OnModuleInit } from '@nestjs/common';
import { Post } from '../../posts/domain/post';
import * as low from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync'

@Injectable()
export class LowdbService implements OnModuleInit {
  private _db: low.LowdbAsync<Data>; 

  get db() {
    return Object.freeze(this._db);
  }

  async onModuleInit() {
    this._db = await low(new FileAsync<Data>('db.json'));
    await this._db.defaults({ posts: [] }).write();
    await this._db.read();
  }
}

type Data = {
  posts: Post[]
}