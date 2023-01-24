import { v4 as uuidv4 } from 'uuid';

interface Props {
    id: string
    game: string;
    points: number;
    player: string;
    playingTime: number;
    submitedAt: Date;
}

export class Score {

    id: string
    game: string;
    points: number;
    player: string;
    playingTime: number;
    submitedAt: Date;

    constructor(props: Props) {
        this.id = props.id
        this.game = props.game
        this.player = props.player
        this.playingTime = props.playingTime
        this.points = props.points
        this.submitedAt = props.submitedAt
    }

    static create(props: Omit<Props, 'id'>) {
        return new Score({
            id: uuidv4(),
            ...props
        })
    }

    static from(props: Props) {
        return new Score({ ...props })
    }

}