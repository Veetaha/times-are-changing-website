import { Args } from '@nestjs/graphql';
import { IdArgs } from './id.args';

export const ArgsId = Args(
    { type: () => IdArgs              }, 
    { transform: ({id}: IdArgs) => id }
);