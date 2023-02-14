import { Inject, Injectable } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { GRAPHQL_PUB_SUB } from "../contants";
import { Champion } from "../model/champion.model";
import { Ranking } from "../model/ranking.model";

@Injectable()
export class PubSubService {

    constructor(@Inject(GRAPHQL_PUB_SUB) private readonly pubsub: PubSub) {}

    publishRankingUpdated(rankings: Ranking[]) {
        this.pubsub.publish('rankingUpdated', rankings)
    }

    subscribeToRankingUpdated() {
        return this.pubsub.asyncIterator('rankingUpdated')
    }

    publishCurrentChampion(champion: Champion) {
        this.pubsub.publish('currentChampion', champion)
    }

    subscribeToCurrentChampion() {
        return this.pubsub.asyncIterator('currentChampion')
    }

}