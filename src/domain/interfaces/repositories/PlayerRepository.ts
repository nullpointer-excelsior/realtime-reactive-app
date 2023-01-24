import { Observable } from "rxjs";
import { Player } from "../../model/Player";

export interface PlayerRepository {
    
    create(player: Player): Observable<Player>;
    update(player: Player): Observable<Player>;
    findById(id: string): Observable<Player>;
    stream(): Observable<Player>;
    
}