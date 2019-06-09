import _ from 'lodash';
import { Nullable, Debug, Obj, ValueOf } from 'ts-typedefs';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

import { hasOwnKey } from '@common/utils/obj';

import { AbstractFilterInput } from './inputs/abstract-filter.input';
import { ObjFilterInput      } from './inputs/obj-filter.input';
import { FilterUnion         } from './filter-union.enum';
import { FilterOperator      } from './fitler-operator.enum';
import { 
    andStrategy, 
    orStrategy, 
    nandStrategy, 
    norStrategy, 
    FilterUnionStrategy
} from './unite-filter-strategy';

export type QueryVariables = Obj<unknown, string>;
export type QueryAndParams = [string, QueryVariables];

type OpMap  = typeof FilterBuilder['gqlToSqlMap'];
type SqlBinOp  = SqlEqOp | SqlRelOp;

type SqlEqOp   = ValueOf<OpMap['eqOp']>;
type SqlRelOp  = ValueOf<OpMap['relOp']>;
type SqlLikeOp = ValueOf<OpMap['likeOp']>;
type SqlInOp   = ValueOf<OpMap['inOp']>;

export class FilterBuilder
<TMetaObjFilterInput extends ObjFilterInput = ObjFilterInput> 
{
    private params!:      QueryVariables;
    private lastParamId!: number;
    private static readonly gqlToSqlMap = {
        eqOp: {
            [FilterOperator.Eq]:  '=',
            [FilterOperator.Neq]:  '<>'
        },
        relOp: {
            [FilterOperator.Lt]:  '<',
            [FilterOperator.Leq]: '<=',
            [FilterOperator.Gt]:  '>',
            [FilterOperator.Geq]: '>='
        },
        inOp: {
            [FilterOperator.In]: 'IN',
            [FilterOperator.Nin]: 'NOT IN'
        },
        likeOp: {
            [FilterOperator.Like]:   'LILKE',
            [FilterOperator.Ilike]:  'ILIKE',
            [FilterOperator.Nlike]:  'NOT LIKE',
            [FilterOperator.Nilike]: 'NOT ILIKE' 
        }
    } as const;

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
                (query, value, key) => value == null ? query : unionStrat.addOperand(
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
     * @param meta     Database metadata, that describes this property.
     */
    private createFilterForOperator(
        operator: FilterOperator, 
        operand: unknown, 
        meta: ColumnMetadata
    ) {
        const colname = this.getColumnName(meta);
        const { eqOp, relOp, inOp, likeOp } = FilterBuilder.gqlToSqlMap;
        return (
            hasOwnKey(eqOp, operator) ? 
            this.tryCreateEq(colname, operand, meta.isNullable, eqOp[operator]) :
            
            hasOwnKey(relOp, operator) ? 
            this.tryCreateBinOp(colname, operand, relOp[operator]) :

            hasOwnKey(inOp, operator) ?
            this.tryCreateIn(colname, operand, inOp[operator]) : 

            hasOwnKey(likeOp, operator) ? 
            this.tryCreateLikeOp(colname, operand, likeOp[operator]) :

            (() => { throw new Debug.UnreachableCodeError(operator); })()
        );
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
     * @param eqOp       Defines which one of `==` or `<>` operator to use for the query.
     */
    private tryCreateEq(
        columnName: string, 
        operand:    unknown, 
        isNullable: boolean,
        eqOp:       SqlEqOp
    ) {
        return operand === null && isNullable 
            ? `${columnName} IS ${eqOp === '=' ? '': 'NOT' } NULL` 
            : this.tryCreateBinOp(columnName, operand, eqOp);
    }


    /**
     * Tries to create binary operator filtering query.
     * Does nothing if `operand == null`.
     * 
     * @param columnName  Name of the column to create filter for.
     * @param operand     Value to use as the right hand side for `operator`.
     * @param binOp       Defines the particular binary operator to use.
     */
    private tryCreateBinOp(columnName: string, operand: unknown, binOp: SqlBinOp) {    
        return operand == null 
            ? '' 
            : `${columnName} ${binOp} :${this.createParam(operand)}`; 
    }

    /**
     * Tries to create like operator filtering query.
     * Does nothing if `operand == null`.
     * 
     * @param columnName  Name of the column to create filter for.
     * @param operand     Value to use as the right hand side for `operator`.
     * @param likeOp      Defines the particular `LIKE` operator to use.
     */
    private tryCreateLikeOp(columnName: string, operand: unknown, likeOp: SqlLikeOp) {    
        if (typeof operand !== 'string') {
            throw new Error(
                `Invalid operand for '${FilterOperator.Like}' or '${FilterOperator.Nilike}' ` +
                "operator: value is not a string"
            );
        }
        const param = this.createParam(this.escapeLikeOperand(operand));
        return operand == null 
            ? '' 
            : `${columnName} ${likeOp} '%' || :${param} || '%'`; 
    }

    /**
     * Escapes string for `LIKE` operator argument. Doesn't add quotes around the string
     * so that you may interpolate it into your custom `LIKE` search pattern string.
     * 
     * @param untrustedOperand Untrusted input string to escape. 
     */
    private escapeLikeOperand(untrustedOperand: string) {
        return untrustedOperand.replace(/%|_|\\/g, '\\$&');
    }

    /**
     * Tries to add `IN` or `NOT IN` filtering to the query for the given `operand`.
     * Does nothing if `operand == null`.
     * 
     * @param columnName Name of the column to create filter for.
     * @param operand    Array of values to pass to `IN` operator.
     * @param inOperator Defines particular `IN` operator to use for the query.
     */
    private tryCreateIn(columnName: string, operand: unknown, inOperator: SqlInOp) {
        if (!Array.isArray(operand) || operand.length === 0) {
            throw new Error(
                `invalid operand for '${FilterOperator.In}' or '${FilterOperator.Nin}' ` +
                "operator: value is not an array or array is empty"
            );
        }
        return operand == null 
            ? '' 
            : `${columnName} ${inOperator} (:...${this.createParam(operand)})`;
    }
}