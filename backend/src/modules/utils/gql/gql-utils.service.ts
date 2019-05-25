import _ from 'lodash';
import { Nullable, Obj } from 'ts-typedefs';
import { Injectable } from '@nestjs/common';
import { OrderByCondition } from 'typeorm';

import { SortInput      } from './sorting/sort.input';
import { ISortInput     } from './sorting/sort-input.interface';
import { ObjFilterInput } from './filtering/inputs/obj-filter.input';
import { FilterBuilder, QueryAndParams } from './filtering/filter-builder';




@Injectable()
export class GqlUtilsService {

    getFilterParams(
        filterInput:    Nullable<ObjFilterInput>, 
        tableNameAlias: string, 
        paramsPrefix?:  string
    ): QueryAndParams {
        return filterInput == null 
            ? ['', {}] 
            : FilterBuilder.createFilterParams(filterInput, tableNameAlias, paramsPrefix);
    }

    getOrderByCondition<TObj extends Obj>(
        sortInput:      Nullable<ISortInput<TObj>>,
        tableNameAlias: string
    ) {
        return sortInput == null ? {} : _.transform(
            sortInput, 
            (acc, value, key) => this.addOrderingCondition(acc, value, key, tableNameAlias),
            {} as OrderByCondition
        );
    }

    private addOrderingCondition(
        conditions:     OrderByCondition, 
        value:          Nullable<SortInput>, 
        key:            string,
        tableNameAlias: string
    ) {
        if (value != null) {
            conditions[`"${tableNameAlias}"."${key}"`] = value.getOrderingCondition();
        }
        return conditions;
    }
}