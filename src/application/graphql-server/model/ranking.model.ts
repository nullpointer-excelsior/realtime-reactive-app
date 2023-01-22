import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ranking {

    @Field(type => Int)
    place: number;

    @Field()
    player: string;
    
    @Field(type => Int)
    points: number;

}