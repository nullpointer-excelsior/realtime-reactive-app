import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { RankingService } from "../../../domain/services/ranking.service";
import { PubSubService } from "../../graphql-server/services/pubsub.service";

@Injectable()
export class RankingUpdatedService implements OnModuleInit {

    constructor(
        private readonly ranking: RankingService,
        private readonly pubsub: PubSubService
    ) { }

    onModuleInit() {

        Logger.log('ranking-updated STARTED')
        
        this.ranking
            .onSaved()
            .subscribe(ranking => this.pubsub.publishRankingUpdated(ranking))
    }

}