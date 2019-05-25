import * as I from '@common/interfaces';
import { AdvancedOptions } from '@nestjs/graphql/dist/external/type-graphql.types';

export type GqlFieldOpts = AdvancedOptions;

export type GqlFieldDecorFactory<TTargetType> = (

    <TOpts extends GqlFieldOpts = { nullable: false }>
    (opts?: TOpts) => GqlFieldDecor<TTargetType, TOpts>
    
);


export type GqlFieldDecor<
    TTargetType,
    TOpts extends AdvancedOptions
> = I.PropertyDecorator<
    I.If<(I.Or<[
        I.IsUnknown<TOpts['nullable']>, 
        I.UnionIncludes<null | undefined | false, TOpts['nullable']>
    ]>), 
        TTargetType,
    I.If<(I.Extends<TOpts['nullable'], 'items'>),
        (TTargetType extends (infer TItems)[] ? I.Nullable<TItems>[] : never),
    I.If<(I.Extends<TOpts['nullable'], 'itemsAndList'>),
        (TTargetType extends (infer TItems)[] ? I.Nullable<I.Nullable<TItems>[]> : never),
        I.Nullable<TTargetType>
    >>>
>;

