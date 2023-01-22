import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class RankingInput {
  
    @IsPositive()
    @Field(type => Int)
    top: number;

}