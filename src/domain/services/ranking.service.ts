import { Injectable } from "@nestjs/common";
import { of, tap } from "rxjs";
import { Player } from "../model/Player";
import { Ranking } from "../model/Ranking";
import { RankingSubject } from "./libs/subjects/ranking.subject";

@Injectable()
export class RankingService {

    constructor(private readonly source: RankingSubject) { }
    
    save(rankings: Ranking[]) {
        return of(rankings).pipe(
            tap(ranking => this.source.emit(ranking))
        )
    }

    onSaved() {
        return this.source.onEmited()
    }

    createRanking(players: Player[]) {
        return [...players]
            .sort((playerA: Player, playerB: Player) => playerB.points - playerA.points)
            .map((player, idx) => new Ranking({
                place: idx + 1,
                player: player.name,
                points: player.points
            }))
    }

}