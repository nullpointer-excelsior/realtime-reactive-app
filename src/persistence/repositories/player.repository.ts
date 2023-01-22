import { Injectable } from "@nestjs/common";
import { Player } from "../../domain/model/Player";

@Injectable()
export class PlayerRepository {
    
    private players: Map<string, Player> = new Map()

    save(r: Player) {
        this.players.set(r.name, r)
    }

    findByName(name: string) { 
        return this.players.get(name)
    }

    findAll() {
        return Array.from(this.players.values())
    }
    
}