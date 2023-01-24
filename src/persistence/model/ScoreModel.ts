import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScoreDocument = HydratedDocument<ScoreModel>;

@Schema()
export class ScoreModel {

    @Prop()
    game: string;

    @Prop()
    points: number;

    @Prop()
    player: string;

    @Prop()
    playingTime: number;
    //  submitedAt: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(ScoreModel);