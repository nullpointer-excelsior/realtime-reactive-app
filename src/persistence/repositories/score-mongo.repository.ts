import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from 'mongoose';
import { ScoreDocument } from "../model/ScoreModel";
import { ScoreRepository } from "../../domain/interfaces/repositories/ScoreRepository";
import { from, map, mergeMap, Observable, of, } from "rxjs";
import { Score } from "../../domain/model/Score";

@Injectable()
export class ScoreMongoRepository implements ScoreRepository {

    constructor(@InjectModel('score') private model: Model<ScoreDocument>) { }

    create(score: Score): Observable<Score> {
        const createdScore = new this.model(score)
        return of(createdScore.save()).pipe(
            map(() => score)
        )
    }

    stream(): Observable<Score> {
        
        const promise = this.model.find().exec()

        return from(promise).pipe(
            mergeMap(score => score),
            map(score => Score.from({ 
                id: score.id,game: 
                score.game, player: 
                score.player, 
                playingTime: score.playingTime, 
                points: score.points, 
                submitedAt: null 
            }))
        )

    }

}