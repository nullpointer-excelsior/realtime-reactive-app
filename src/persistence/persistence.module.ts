import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema } from './model/ScoreModel';
import { PlayerSchema } from './model/PlayerModel';
import { ScoreMongoRepository } from './repositories/score-mongo.repository';
import { PlayerMongoRepository } from './repositories/player-mongo.repository';

const providersToExport = [
    ScoreMongoRepository,
    PlayerMongoRepository
]

@Module({
    providers:[
        ...providersToExport
    ],
    exports: [
        ...providersToExport,
    ],
    imports: [
        MongooseModule.forRoot(`mongodb://rx:rx@localhost:27017/rx?authSource=admin`),
        MongooseModule.forFeature([
            { name: 'score', schema: ScoreSchema },
            { name: 'player', schema: PlayerSchema },
        ])
    ]

})
export class PersistenceModule {}
