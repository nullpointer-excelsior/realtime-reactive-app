import { Injectable } from "@nestjs/common";
import { from } from "rxjs";
import { Ranking } from "../../domain/model/Ranking";

@Injectable()
export class RankingRepository {

    private ranking: Map<string, Ranking> = new Map()

    save(r: Ranking) {
        this.ranking.set(r.player, r)
    }

    findByPlayer(player: string) { 
        return this.ranking.get(player)
    }

    findAll() {
        return from(this.ranking.values())
    }

}