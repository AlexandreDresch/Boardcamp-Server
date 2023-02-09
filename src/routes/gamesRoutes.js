import { Router } from "express";

import { getGames, postGame } from "../controller/gamesController.js";

import { gameValidation } from "../middleware/gameValidation.js";

import { gameSchema } from "../schema/gameSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gameValidation(gameSchema), postGame);

export default gamesRouter;