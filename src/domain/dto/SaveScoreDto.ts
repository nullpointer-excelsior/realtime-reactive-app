import { Score } from "../model/Score";

export type SaveScoreDto = Pick<Score, 'game' | 'points' | 'player' | 'playingTime' | 'submitedAt'>