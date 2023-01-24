import { Query, Resolver } from "@nestjs/graphql";
import { PlayerService } from "../../../domain/services/player.service";
import { Player } from "../model/player.model";

@Resolver(of => Player)
export class PlayerResolver {

    constructor(private readonly player: PlayerService) { }

    @Query(returns => [Player])
    getPlayers() {
        
        return this.player.findAll()

    }

}