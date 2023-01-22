import { Injectable } from "@nestjs/common";
import { Score } from "../../../model/Score";
import { SubjectBase } from "../rx/subject.base";

@Injectable()
export class ScoreSubject extends SubjectBase<Score> {

}