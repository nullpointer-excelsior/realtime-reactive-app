
interface Props {
    place: number,
    player: string,
    points: number
}

export class Ranking {
    
    place: number;
    player: string;
    points: number;

    constructor(props: Props) {
        this.place = props.place
        this.player = props.player
        this.points = props.points
    }
    

}