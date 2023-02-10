import express from "express";
import cors from "cors";

import gamesRouter from "./routes/gamesRoutes.js";
import customersRouter from "./routes/customersRoutes.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use([gamesRouter, customersRouter]);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
