import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ScoreService } from "../../../domain/services/score.service";
import { Response } from "../model/response.model";
import { ScoreInput } from "../model/score.input";
import { Score } from "../model/score.model";

@Resolver(of => Score)
export class ScoreResolver {

    constructor(
        private readonly score: ScoreService,
    ) { }

    @Query(returns => [Score])
    async getScores() {
        return this.score.findAll()
    }

    @Mutation(returns => Response)
    createScore(@Args('score') score: ScoreInput): Response {
        this.score.save({ ...score, submitedAt: new Date() }).subscribe()
        return {
            message: 'OK'
        }
    }

}