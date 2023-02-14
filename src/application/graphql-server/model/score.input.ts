import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty,  IsPositive } from 'class-validator';

@InputType()
export class ScoreInput {
  
    @Field()
    @IsNotEmpty()
    game: string;
    
    @IsPositive()
    @Field(type => Int)
    points: number;

    @IsNotEmpty()
    @Field()
    player: string;
    
    @IsPositive()
    @Field(type => Int)
    playingTime: number;

    @Field()
    submitedAt: Date;

}