import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { GraphQLServerModule } from './graphql-server/graphql-server.module';
import { RxSubscriptionsModule } from './rx-subscriptions/rx-subscriptions.module';

@Module({
    imports: [
        DomainModule,
        GraphQLServerModule,
        RxSubscriptionsModule
    ],
    exports: [
        GraphQLServerModule
    ]
})
export class ApplicationModule {}
