import { Args, Resolver, Subscription } from "@nestjs/graphql";
import { RankingInput } from "../model/ranking.input";
import { Ranking } from "../model/ranking.model";
import { PubSubService } from "../services/pubsub.service";

@Resolver(of => Ranking)
export class RankingResolver {

    constructor(
        private readonly pubsub: PubSubService
    ) { }

    @Subscription(returns => [Ranking], { 
        name: 'rankingUpdated' ,
        resolve: value => value
    })
    subscribeToRankingUpdated() {
        return this.pubsub.subscribeToRankingUpdated()
    }

}