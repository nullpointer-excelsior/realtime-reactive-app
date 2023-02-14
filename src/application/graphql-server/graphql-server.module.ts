import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ScoreResolver } from './resolvers/score.resolver';
import { PlayerResolver } from './resolvers/player.resolver';
import { PubSub } from 'graphql-subscriptions';
import { PubSubService } from './services/pubsub.service';
import { RankingResolver } from './resolvers/ranking.resolver';
import { GRAPHQL_PUB_SUB } from './contants';
import { DateScalar } from './model/date.scalar';
import { ChampionResolver } from './resolvers/champion.resolver';


const providersToExport = [
    PubSubService
]

@Module({
    providers: [
        ScoreResolver,
        PlayerResolver,
        RankingResolver,
        ChampionResolver,
        DateScalar,
        {
            provide: GRAPHQL_PUB_SUB,
            useValue: new PubSub(),
        },
        ...providersToExport
    ],
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            installSubscriptionHandlers: true,
            buildSchemaOptions: {
                dateScalarMode: 'timestamp',
              }
        }),
    ],
    exports: [
        ...providersToExport
    ]
})
export class GraphQLServerModule { }
