import { Module } from '@nestjs/common';
import { GraphQLServerModule } from '../graphql-server/graphql-server.module';
import { ChampionUpdatedService } from './services/champion-updated.service';
import { RankingUpdatedService } from './services/ranking-updated.service';
import { SavePlayerService } from './services/save-player.service';
import { SaveRankingService } from './services/save-ranking.service';

const providersToExport = [
    SavePlayerService,
    SaveRankingService,
    ChampionUpdatedService,
    RankingUpdatedService,
]

@Module({
    providers: [
        ...providersToExport
    ],
    exports: [
        ...providersToExport
    ],
    imports: [
        GraphQLServerModule
    ]
})
export class RxSubscriptionsModule {}
