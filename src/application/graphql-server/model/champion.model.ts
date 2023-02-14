import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Champion {

    // @Field(type => String)
    // id: number;

    @Field()
    player: string;

    @Field(type => Int)
    points: number;

    @Field()
    datetime: Date;

}