import { db } from "../config/database.js";

export async function getGames(_, res) {
  try {
    const games = await db.query("SELECT * FROM games");

    res.send(games.rows);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    await db.query(
      'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
      [name, image, stockTotal, pricePerDay]
    );

    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
