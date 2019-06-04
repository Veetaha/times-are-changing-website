import { Module } from '@nestjs/common';

import { DebugService      } from './debug/debug.service';
import { LoggingService    } from './logging/logging.service';
import { EnvService        } from './env/env.service';
import { WorkflowService   } from './workflow/workflow.service';
import { AlgorithmsService } from './algorithms/algorithms.service';
import { OrmUtilsService   } from './orm/orm-utils.service';
import { GqlUtilsService   } from './gql/gql-utils.service';

const exposedServices =  [
    LoggingService,
    DebugService,
    EnvService,
    AlgorithmsService,
    WorkflowService,
    OrmUtilsService,
    GqlUtilsService
];

@Module({
    providers: exposedServices,
    exports:   exposedServices
})
export class UtilsModule {}
