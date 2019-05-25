import { Field, Int, Float } from 'type-graphql';

import * as I from '@app/interfaces';

const intTypeFn     = () => Int;
const stringTypeFn  = () => String;
const booleanTypeFn = () => Boolean;
const floatTypeFn   = () => Float;
const dateTypeFn    = () => Date;

const intArrTypeFn     = () => [Int];
const stringArrTypeFn  = () => [String];
const booleanArrTypeFn = () => [Boolean];
const floatArrTypeFn   = () => [Float];
const dateArrTypeFn    = () => [Date];


export const IntField:     I.GqlFieldDecorFactory<number>  = opts => Field(intTypeFn,     opts);
export const StringField:  I.GqlFieldDecorFactory<string>  = opts => Field(stringTypeFn,  opts);
export const BooleanField: I.GqlFieldDecorFactory<boolean> = opts => Field(booleanTypeFn, opts);
export const FloatField:   I.GqlFieldDecorFactory<number>  = opts => Field(floatTypeFn,   opts);
export const DateField:    I.GqlFieldDecorFactory<Date>    = opts => Field(dateTypeFn,    opts); 

export const IntArrField:     I.GqlFieldDecorFactory<number[]>  = opts => Field(intArrTypeFn,     opts);
export const StringArrField:  I.GqlFieldDecorFactory<string[]>  = opts => Field(stringArrTypeFn,  opts);
export const BooleanArrField: I.GqlFieldDecorFactory<boolean[]> = opts => Field(booleanArrTypeFn, opts);
export const FloatArrField:   I.GqlFieldDecorFactory<number[]>  = opts => Field(floatArrTypeFn,   opts);
export const DateArrField:    I.GqlFieldDecorFactory<Date[]>    = opts => Field(dateArrTypeFn,    opts);