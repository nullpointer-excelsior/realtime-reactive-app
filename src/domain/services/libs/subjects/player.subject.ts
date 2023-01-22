import { Injectable } from "@nestjs/common";
import { Player } from "../../../model/Player";
import { SubjectBase } from "../rx/subject.base";

@Injectable()
export class PlayerSubject extends SubjectBase<Player> {

}