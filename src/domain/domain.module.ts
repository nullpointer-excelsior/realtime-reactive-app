import { Global, Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { RankingSubject } from './services/libs/subjects/ranking.subject';
import { ScoreSubject } from './services/libs/subjects/score.subject';
import { RankingService } from './services/ranking.service';
import { ScoreService } from './services/score.service';
import { PlayerService } from './services/player.service';
import { PlayerSubject } from './services/libs/subjects/player.subject';

const providersToExport = [
    PlayerService,
    RankingService,
    ScoreService
]

@Global()
@Module({
    imports: [
        PersistenceModule
    ],
    providers: [
        ...providersToExport,
        ScoreSubject,
        RankingSubject,
        PlayerSubject
    ],
    exports: [
        ...providersToExport,
    ]
})
export class DomainModule { }
