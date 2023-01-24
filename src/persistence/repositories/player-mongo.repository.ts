import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { PlayerDocument } from "../model/PlayerModel";
import { PlayerRepository } from "../../domain/interfaces/repositories/PlayerRepository";
import { EMPTY, from, map, mergeMap, Observable, of, switchMap, tap } from "rxjs";
import { Player } from "../../domain/model/Player";

@Injectable()
export class PlayerMongoRepository implements PlayerRepository {

    constructor(@InjectModel('player') private model: Model<PlayerDocument>) { }
    
    findById(id: string): Observable<Player> {
        
        const promise = this.model.findOne({ _id: id }).exec()
        
        return from(promise).pipe(
            switchMap(document => document? of(document) : EMPTY),
            map(document => Player.from({ id: document.id, name: document.name, points: document.points })),
        )

    }

    create(player: Player): Observable<Player> {
        
        const model = new this.model({ _id: player.id, ...player })
        
        return from(model.save()).pipe(
            map(() => player)
        )

    }

    update(player: Player): Observable<Player> {
        
        const promise = this.model.findByIdAndUpdate(player.id, player, { new: true }).exec()
        
        return from(promise).pipe(
            map(() => player)
        )
        
    }


    stream(): Observable<Player> {

        const promise = this.model.find().exec()

        return from(promise).pipe(
            mergeMap(players => players),
            map(player => Player.from({
                id: player.id,
                name: player.name,
                points: player.points
            }))
        )

    }


}