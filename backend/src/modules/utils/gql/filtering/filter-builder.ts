import _ from 'lodash';
import { } from 'sqlstring';
import { Nullable, Debug, Obj } from 'ts-typedefs';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

import { AbstractFilterInput } from './inputs/abstract-filter.input';
import { ObjFilterInput      } from './inputs/obj-filter.input';
import { FilterUnion         } from './filter-union.enum';
import { FilterOperator      } from './fitler-operator.enum';
import { SqlBinOp            } from './sql-bin-op.enum';
import { 
    andStrategy, 
    orStrategy, 
    nandStrategy, 
    norStrategy, 
    FilterUnionStrategy
} from './unite-filter-strategy';

export type QueryVariables = Obj<unknown, string>;
export type QueryAndParams = [string, QueryVariables];

export class FilterBuilder
<TMetaObjFilterInput extends ObjFilterInput = ObjFilterInput> 
{
    private params!:      QueryVariables;
    private lastParamId!: number;

    /**
     * Returns `[query, parameters]` tuple that contains filtering `WHERE` clause
     * operators and parameters for them. 
     * @param input        Input object to build filtering `WhereParams` for.
     * @param paramsPrefix Prefix that will be used for query all created variables.
     */
    static createFilterParams
    <TFilterObjInput extends ObjFilterInput = ObjFilterInput>
    (input: TFilterObjInput, tableNameAlias: string, paramsPrefix = '_filterParam') {
        return new FilterBuilder(tableNameAlias, paramsPrefix).build(input);
    } 


    private constructor(
        private readonly tableNameAlias: string,
        private readonly paramsPrefix = '_filterParam'
    ) {
        this.wipeState();
    }

    private wipeState() {
        this.params      = {};
        this.lastParamId = 0;
    }


    private build(input: TMetaObjFilterInput): QueryAndParams {
        const unionStrat = FilterBuilder.getFilterUnionStrategy(input.unionMode);
        const meta       = input.getColumnsMetadata();

        const result: QueryAndParams = [
            unionStrat.wrapOperands(_.reduce(
                input.props, 
                (query, value, key) => unionStrat.addOperand(
                    query,
                    this.createFilterForProperty(value, meta[key])
                ),
                ''
            )), 
            this.params
        ];
        
        this.wipeState();
        return result;
    }

    /**
     * Creates filtering query for the given property
     * @param param0 Input value of the given property.
     * @param meta   Database metadata, that describes this property.
     */
    private createFilterForProperty(
        { unionMode, ...operators}: AbstractFilterInput, 
        meta: ColumnMetadata
    ) {
        const uniteOperands = FilterBuilder.getFilterUnionStrategy(unionMode);
        return uniteOperands.wrapOperands(_.reduce(
            operators,
            (query, operand, operator) => uniteOperands.addOperand(
                query,
                this.createFilterForOperator(operator as FilterOperator, operand, meta)
            ),
            ''
        ));
    }

    /**
     * Creates filtering query for the given `operator` and `operand`.
     * 
     * @param operator Operator type to create according query.
     * @param operand  Operand value to pass as an argument tp `operator`.
     * @param param2   Database metadata, that describes this property.
     */
    private createFilterForOperator(
        operator: FilterOperator, 
        operand: unknown, 
        meta: ColumnMetadata
    ) {
        switch (operator) {
            case FilterOperator.Eq:     return this.tryCreateEq   (this.getColumnName(meta), operand, meta.isNullable, true);
            case FilterOperator.Neq:    return this.tryCreateEq   (this.getColumnName(meta), operand, meta.isNullable, false);
            case FilterOperator.Gt:     return this.tryCreateBinOp(this.getColumnName(meta), SqlBinOp.Gt,  operand);
            case FilterOperator.Lt:     return this.tryCreateBinOp(this.getColumnName(meta), SqlBinOp.Lt,  operand);
            case FilterOperator.Geq:    return this.tryCreateBinOp(this.getColumnName(meta), SqlBinOp.Geq, operand);
            case FilterOperator.Leq:    return this.tryCreateBinOp(this.getColumnName(meta), SqlBinOp.Leq, operand);
            case FilterOperator.In:     return this.tryCreateIn   (this.getColumnName(meta), operand as Nullable<unknown[]>, true);
            case FilterOperator.Nin:    return this.tryCreateIn   (this.getColumnName(meta), operand as Nullable<unknown[]>, false);
            case FilterOperator.Regexp:   return this.tryCreateBinOp(this.getColumnName(meta), SqlBinOp.Regexp,   operand);
            case FilterOperator.Nregexp:  return this.tryCreateBinOp(this.getColumnName(meta), SqlBinOp.Nregexp,  operand);
            case FilterOperator.Iregexp:  return this.tryCreateBinOp(this.getColumnName(meta), SqlBinOp.Iregexp,  operand);
            case FilterOperator.Niregexp: return this.tryCreateBinOp(this.getColumnName(meta), SqlBinOp.Niregexp, operand);
            default: throw new Debug.UnreachableCodeError(operator);
        }
    }

    private static getFilterUnionStrategy(mode?: Nullable<FilterUnion>): FilterUnionStrategy {
        switch (mode) {
            case null:
            case undefined:
            case FilterUnion.And:  return andStrategy;
            case FilterUnion.Or:   return orStrategy;
            case FilterUnion.Nand: return nandStrategy;
            case FilterUnion.Nor:  return norStrategy;
            default: throw new Debug.UnreachableCodeError(mode);
        }
    }

    /**
     * Returns unique query parameter identifier that was not used in this query yet.
     * Additionaly, adds `value` to `parameters` object.
     * 
     * @param value Target value to create parameter for.
     */
    private createParam(value: unknown) {
        const paramId = `${this.paramsPrefix}${++this.lastParamId}`;
        this.params[paramId] = value;
        return paramId;
    }

    /**
     * Returns column name prefixed with `tableNameAlias` for the given metadata.
     */
    private getColumnName(metadata: ColumnMetadata) {
        return `"${this.tableNameAlias}"."${metadata.propertyName}"`;
    }

    /**
     * Tries to add check for equality/not equality with operator `=` or `<>` 
     * to the query for the given `operand`. If `operand === null` 
     * adds a `IS [NOT] NULL` condition.
     * 
     * @param columnName Name of the column to create filter for.
     * @param operand    Value to compare for equality to.
     * @param isNullable Tell whether this column is nullable in the database schema.
     * @param shouldBeEq Defines forward or negated equality comparison mode.
     */
    private tryCreateEq(
        columnName: string, 
        operand:    unknown, 
        isNullable: boolean,
        shouldBeEq: boolean
    ) {
        return operand === null && isNullable         ?
            this.createIsNull(columnName, shouldBeEq) :
            operand == null                           ?
            ''                                        :
            this.tryCreateBinOp(
                columnName,
                shouldBeEq ? SqlBinOp.Eq : SqlBinOp.Neq, 
                operand
            );
    }


    /**
     * Tries to create binary operator filtering query.
     * Does nothing if `operand == null`.
     * 
     * @param columnName Name of the column to create filter for.
     * @param operator   Defines the binary operator to use.
     * @param operand    Value to use as the right hand side for `operator`.
     */
    private tryCreateBinOp(columnName: string, operator: SqlBinOp, operand: unknown) {    
        return operand == null ? '' : 
            `${columnName} ${operator} :${this.createParam(operand)}`; 
    }

    /**
     * Tries to add `IN` or `NOT IN` filtering to the query for the given `operand`.
     * Does nothing if `operand == null`.
     * 
     * @param columnName Name of the column to create filter for.
     * @param operand    Array of values to pass to `IN` operator.
     * @param shouldBeIn If `false`, then `NOT` operator is used, otherwise no negation is added.
     */
    private tryCreateIn(columnName: string, operand: Nullable<unknown[]>, shouldBeIn: boolean) {
        return operand == null ? '' : 
            `${columnName}${this.getNotIf(!shouldBeIn)}IN (:...${this.createParam(operand)})`;
    }

    /**
     * Creates `IS [NOT] NULL` query for the given `columnName`.
     * 
     * @param columnName   Name of the column to create filter for.
     * @param shouldBeNull If `true` `IS NULL` query is returned, `IS NOT NULL` otherwise
     */
    private createIsNull(columnName: string, shouldBeNull: boolean) {
        return `${columnName} IS${this.getNotIf(!shouldBeNull)}NULL`;
    }


    private getNotIf(shouldBeNot: boolean) {
        return shouldBeNot ? ' NOT ' : ' ';
    }
}