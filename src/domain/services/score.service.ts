import { Injectable } from "@nestjs/common";
import { of, retry, tap } from "rxjs";
import { ScoreRepository } from "../../persistence/repositories/score.repository";
import { Score } from "../model/Score";
import { ScoreSubject } from "./libs/subjects/score.subject";

@Injectable()
export class ScoreService {

    constructor(
        private readonly repository: ScoreRepository,
        private readonly source: ScoreSubject
    ) { }

    save(score: Score) {
        return of(score).pipe(
            tap(score => this.repository.save(score)),
            retry({ count: 3, delay: 3000 }),
            tap(score => this.source.emit(score)),
        )
    }

    findAll() {
        return of(this.repository.findAll())
    }

    onSaved() {
        return this.source.onEmited()
    }

}