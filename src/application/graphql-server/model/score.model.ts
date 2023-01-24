import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Score {

    @Field(type => String)
    id: number;

    @Field()
    game: string;
    
    @Field(type => Int)
    points: number;

    @Field()
    player: string;
    
    @Field(type => Int)
    playingTime: number;
    
    // submitedAt: Date;


}