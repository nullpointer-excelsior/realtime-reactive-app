import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { GraphQLServerModule } from './graphql-server/graphql-server.module';
import { RxSubscriptionsModule } from './rx-subscriptions/rx-subscriptions.module';

const providersToExport = [
    
]

@Module({
    providers: [
        ...providersToExport
    ],
    imports: [
        DomainModule,
        GraphQLServerModule,
        RxSubscriptionsModule
    ],
    exports: [
        ...providersToExport,
        GraphQLServerModule
    ]
})
export class ApplicationModule {}
