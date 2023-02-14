import { Resolver, Subscription } from "@nestjs/graphql";
import { Champion } from "../model/champion.model";
import { PubSubService } from "../services/pubsub.service";

@Resolver(of => Champion)
export class ChampionResolver {

    constructor(
        private readonly pubsub: PubSubService
    ) { }

    @Subscription(returns => Champion, { 
        name: 'currentChampion' ,
        resolve: value => value
    })
    subscribeToCurrentChampion() {
        return this.pubsub.subscribeToCurrentChampion()
    }

}