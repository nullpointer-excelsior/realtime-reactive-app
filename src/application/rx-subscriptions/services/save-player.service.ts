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
            map(score => new Player({
                name: score.player,
                points: score.points
            })),
            switchMap(player => {
                return this.player
                    .findByName(player.name)
                    .pipe(
                        defaultIfEmpty(new Player({
                            name: player.name,
                            points: 0
                        })),
                        map(playerFound => new Player({
                            name: playerFound.name,
                            points: playerFound.points + player.points
                        }))
                    )
            }),
            tap(x => console.log('saved', x.toString())),
            switchMap(player => this.player.save(player)),
        )
            .subscribe(player => Logger.log(`${player.toString()} Saved`))


    }

}