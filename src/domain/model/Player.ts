interface Props {
    name: string;
    points: number;
}

export class Player {
    
    public name: string;
    public points: number;

    constructor(props: Props) {
        this.name = props.name
        this.points = props.points
    }

    toString() {
        return `Player(name="${this.name}", points=${this.points})`
    }
}