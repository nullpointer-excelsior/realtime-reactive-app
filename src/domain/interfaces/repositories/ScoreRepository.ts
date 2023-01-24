import { Observable } from "rxjs"
import { Score } from "../../model/Score"

export interface ScoreRepository {

    create(score: Score): Observable<Score>
    stream(): Observable<Score>;
    
}