import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<PlayerModel>;

@Schema()
export class PlayerModel {

    @Prop()
    _id: string;

    @Prop({ unique: true })
    name: string;

    @Prop()
    points: number;
    
}

export const PlayerSchema = SchemaFactory.createForClass(PlayerModel);