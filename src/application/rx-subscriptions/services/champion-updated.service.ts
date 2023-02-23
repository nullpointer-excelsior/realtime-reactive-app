import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { distinctUntilKeyChanged, filter, map, mergeMap, tap } from "rxjs";
import { RankingService } from "../../../domain/services/ranking.service";
import { PubSubService } from "../../graphql-server/services/pubsub.service";

@Injectable()
export class ChampionUpdatedService implements OnModuleInit {

    constructor(
        private readonly ranking: RankingService,
        private readonly pubsub: PubSubService
    ) { }
    
    onModuleInit() {

        Logger.log('champion-updated STARTED')

        this.ranking.onSaved().pipe(
            mergeMap(rankings => rankings),
            filter(ranking => ranking.place === 1),
            distinctUntilKeyChanged('player'),
            map(ranking => ({ player: ranking.player, points: ranking.points, datetime: new Date() })),
            tap(champion => Logger.log('Current Champion ',champion))
        )
            .subscribe(champion => this.pubsub.publishCurrentChampion(champion))
    }


}