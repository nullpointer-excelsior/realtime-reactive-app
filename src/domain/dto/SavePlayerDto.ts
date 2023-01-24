import { Player } from "../model/Player";

export type SavePlayerDto = Pick<Player, 'name' | 'points'>