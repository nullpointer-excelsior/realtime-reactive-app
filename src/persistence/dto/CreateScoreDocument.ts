export interface CreateScoreDocument {
    game: string;
    points: number;
    player: string;
    playingTime: number;
    submitedAt: Date;
}