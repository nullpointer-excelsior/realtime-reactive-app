import { Injectable } from "@nestjs/common";
import { Score } from "../../domain/model/Score";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScoreRepository {

    private scores: Map<string, Score> = new Map()

    save(score: Score) {
        if (!score.uuid) {
            score.uuid = uuidv4()
        }
        this.scores.set(score.uuid, score)
    }

    findAll() {
        return Array.from(this.scores.values())
    }



}