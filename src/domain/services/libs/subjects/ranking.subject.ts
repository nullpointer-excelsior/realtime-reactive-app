import { Injectable } from "@nestjs/common";
import { Ranking } from "../../../model/Ranking";
import { SubjectBase } from "../rx/subject.base";

@Injectable()
export class RankingSubject extends SubjectBase<Ranking[]>{

}