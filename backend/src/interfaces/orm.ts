import * as I from '@common/interfaces';
import { Repository, UpdateResult } from 'typeorm';

export type CoreEntityData<TEntity extends I.Obj> = I.CoreObjData<
    I.RemoveKeys<TEntity, 'id' | 'creationDate' | 'lastUpdateDate'>
>;

export type EntityFromRepo<TRepo extends Repository<any>> = ReturnType<TRepo['create']>;

export type PgUpdateResult<
    TEntity extends I.Obj = I.Obj, TReturnedColNames extends keyof TEntity = keyof TEntity
> = I.Merge<UpdateResult, { raw: Pick<TEntity, TReturnedColNames>[] }>;