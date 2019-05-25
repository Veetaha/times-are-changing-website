import { NgModule         } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule   } from 'apollo-angular-link-http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';

import { ConfigService } from '@app/config/config.service';


@NgModule({
    imports: [ HttpClientModule ],
    exports: [ ApolloModule, HttpLinkModule ],
    providers: [{   
        provide:    APOLLO_OPTIONS, 
        useFactory: (config: ConfigService) => config.createApolloClientOptions(),
        deps:       [ConfigService]
    }]
})
export class GraphQLModule {}
