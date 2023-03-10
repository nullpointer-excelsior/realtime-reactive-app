import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { map, Observable, switchMap } from "rxjs";
import { Player } from "../../../domain/model/Player";
import { PlayerService } from "../../../domain/services/player.service";
import { Ranking } from "../../../domain/model/Ranking";
import { RankingService } from "../../../domain/services/ranking.service";

@Injectable()
export class SaveRankingService implements OnModuleInit {

    ranking$: Observable<Ranking[]>

    constructor(
        private readonly player: PlayerService,
        private readonly ranking: RankingService
    ) {
    }

    onModuleInit() {

        Logger.log('save-rankings STARTED')

        this.ranking$ = this.player.onSaved().pipe(
            switchMap(() => this.calculateRanking()),
            switchMap(rankings => this.ranking.save(rankings))
        )

        this.ranking$.subscribe()

    }


    calculateRanking() {

        const createRanking = (players: Player[]) => {
            return [...players]
                .sort((playerA: Player, playerB: Player) => playerB.points - playerA.points)
                .map((player, idx) => new Ranking({
                    place: idx + 1,
                    player: player.name,
                    points: player.points
                }))
        }

        return this.player.findAll().pipe(
            map(players => createRanking(players))
        )

    }

}