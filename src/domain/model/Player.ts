import { v4 as uuidv4 } from 'uuid';

interface Props {
    id: string;
    name: string;
    points: number;
}

export class Player {
    
    public id: string;
    public name: string;
    public points: number;

    constructor(props: Props) {
        this.id = props.id
        this.name = props.name
        this.points = props.points
    }

    addPoints(points: number) {
        this.points += points
    }

    static create(props: Omit<Props, 'id'>) {
        return new Player({ 
            id: uuidv4(), 
            ...props 
        })
    }

    static from(props: Props) {
        return new Player(props)
    }

    toString() {
        return `Player(name="${this.name}", points=${this.points})`
    }
    
}