import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { defaultIfEmpty, map, switchMap, tap } from "rxjs";
import { Player } from "../../../domain/model/Player";
import { PlayerService } from "../../../domain/services/player.service";
import { ScoreService } from "../../../domain/services/score.service";

@Injectable()
export class SavePlayerService implements OnModuleInit {

    constructor(
        private readonly player: PlayerService,
        private readonly score: ScoreService,
    ) {
    }

    onModuleInit() {

        Logger.log('save-player STARTED')

        this.score.onSaved().pipe(
            // tap(score => console.log('save-player-from-score', score)),
            switchMap(score => {
                return this.player
                    .findByName(score.player)
                    .pipe(
                        defaultIfEmpty(Player.create({ name: score.player, points: 0 })),
                        map(player => {
                            player.addPoints(score.points)
                            return player
                        })
                    )
            }),
            switchMap(player => this.player.saveOrUpdate(player)),
        )
            .subscribe({ 
                next: player => Logger.log(`${player.toString()} Saved`),
                error: err => Logger.error(err)
            })


    }

}