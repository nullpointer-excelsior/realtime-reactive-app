import { Injectable } from "@nestjs/common";
import { map, Observable, of, retry, switchMap, tap, toArray } from "rxjs";
import { SaveScoreDto } from "../dto/SaveScoreDto";
import { ScoreSubject } from "./libs/subjects/score.subject";
import { Score } from "../model/Score";
import { ScoreMongoRepository } from "../../persistence/repositories/score-mongo.repository";

@Injectable()
export class ScoreService {

    constructor(
        private readonly repository: ScoreMongoRepository,
        private readonly source: ScoreSubject
    ) { }

    save(dto: SaveScoreDto): Observable<Score> {
        return of(dto).pipe(
            
            map(dto => Score.create(dto)),
            tap(x => console.log('with-date', x)),
            switchMap(score => this.repository.create(score)),
            retry({ count: 3, delay: 3000 }),
            tap(score => this.source.emit(score)),
        )
    }

    findAll(): Observable<Score[]> {
        return this.repository.stream().pipe(
            toArray(),
            tap(x => console.log('with-date-findall', x)),
        )
    }

    onSaved(): Observable<Score> {
        return this.source.onEmited()
    }

}