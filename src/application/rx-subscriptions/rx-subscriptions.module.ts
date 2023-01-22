import { Module } from '@nestjs/common';
import { SavePlayerService } from './services/save-player.service';
import { SaveRankingService } from './services/save-ranking.service';

const providersToExport = [
    SavePlayerService,
    SaveRankingService
]

@Module({
    providers: [
        ...providersToExport
    ],
    exports: [
        ...providersToExport
    ]
})
export class RxSubscriptionsModule {}
