import { Router } from "express";

import { getGames, postGame } from "../controllers/gamesController.js";

import { gameValidation } from "../middlewares/gameValidation.js";

import { gameSchema } from "../schemas/gameSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gameValidation(gameSchema), postGame);

export default gamesRouter;