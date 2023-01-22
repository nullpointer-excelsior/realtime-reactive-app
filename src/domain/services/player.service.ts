import { Injectable } from "@nestjs/common";
import { EMPTY, of, retry, tap } from "rxjs";
import { PlayerRepository } from "../../persistence/repositories/player.repository";
import { Player } from "../model/Player";
import { ReactiveBase } from "./libs/rx/reactive.base";
import { PlayerSubject } from "./libs/subjects/player.subject";

@Injectable()
export class PlayerService extends ReactiveBase {

    constructor(
        private repository: PlayerRepository,
        private source: PlayerSubject
    ) { super() }

    findByName(name: string) {
        const player = this.repository.findByName(name)
        if (player) {
            return of(player)
        }
        return EMPTY
    }

    findAll() {
        return this.findMultiple(() => this.repository.findAll())
    }

    save(player: Player) {
        return of(player).pipe(
            tap(player => this.repository.save(player)),
            retry({ count: 3, delay: 3000 }),
            tap(player => this.source.emit(player))
        )
    }

    onSaved() {
        return this.source.onEmited()
    }

}