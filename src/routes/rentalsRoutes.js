import { Router } from "express";

import {
  deleteRental,
  finishRental,
  getRentals,
  postRental,
} from "../controllers/rentalsController.js";

import { rentalIDValidation } from "../middlewares/rentalIDValidation.js";
import { rentalValidation } from "../middlewares/rentalValidation.js";
import { returnDateValidation } from "../middlewares/returnDateValidation.js";

import { rentalSchema } from "../schemas/rentalSchema.js";

const rentalRoutes = Router();

rentalRoutes.get("/rentals", getRentals);
rentalRoutes.post("/rentals", rentalValidation(rentalSchema), postRental);
rentalRoutes.post("/rentals/:id/return", rentalIDValidation(), finishRental);
rentalRoutes.delete("/rentals/:id", deleteRental); 

export default rentalRoutes;
