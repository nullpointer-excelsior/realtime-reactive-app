import { Injectable } from "@nestjs/common";
import { defaultIfEmpty, EMPTY, find, Observable, of, retry, switchMap, tap, toArray } from "rxjs";
import { PlayerMongoRepository } from "../../persistence/repositories/player-mongo.repository";
import { Player } from "../model/Player";
import { ReactiveBase } from "./libs/rx/reactive.base";
import { PlayerSubject } from "./libs/subjects/player.subject";

@Injectable()
export class PlayerService extends ReactiveBase {

    constructor(
        private source: PlayerSubject,
        private repository: PlayerMongoRepository
    ) { super() }

    findByName(name: string): Observable<Player> {

        return this.repository.stream().pipe(
            find(player => player.name === name),
            switchMap(player => player ? of(player) : EMPTY)
        )

    }

    findAll(): Observable<Player[]> {
        return this.repository.stream().pipe(
            toArray(),
        )
    }

    saveOrUpdate(player: Player) {
        
        return of(player).pipe(
            switchMap(player => {
                return this.repository.findById(player.id).pipe(
                    defaultIfEmpty(null)
                )
            }),
            switchMap(doc => doc ? this.repository.update(player) : this.repository.create(player)),
            tap(player => this.source.emit(player))
        )

    }

    onSaved() {
        return this.source.onEmited()
    }

}