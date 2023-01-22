import { Module } from '@nestjs/common';
import { PlayerRepository } from './repositories/player.repository';
import { RankingRepository } from './repositories/ranking.repository';
import { ScoreRepository } from './repositories/score.repository';

const providersToExport = [
    ScoreRepository,
    RankingRepository,
    PlayerRepository
]

@Module({
    providers:[
        ...providersToExport
    ],
    exports: [
        ...providersToExport
    ]
})
export class PersistenceModule {}
