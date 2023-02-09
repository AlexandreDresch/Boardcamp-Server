import express from "express";
import cors from "cors";

import gamesRouter from "./routes/gamesRoutes.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use([gamesRouter]);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
