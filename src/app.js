import express from "express";
import cors from "cors";

import gamesRouter from "./routes/gamesRoutes.js";
import customersRouter from "./routes/customersRoutes.js";
import rentalRoutes from "./routes/rentalsRoutes.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use([gamesRouter, customersRouter, rentalRoutes]);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
