import { db } from "../config/database.js";

export function gameValidation(schema) {
  return async (req, res, next) => {
    try {
      const data = await schema.validateAsync(req.body, { abortEarly: false });

      const verifyIfGameAlreadyExists = await db.query(
        "SELECT name FROM games WHERE name=$1;",
        [req.body.name]
      );

      if (verifyIfGameAlreadyExists.rows.length) {
        return res.sendStatus(409);
      }

      res.locals.gameData = data;
      next();
    } catch (error) {
      return res.sendStatus(400);
    }
  };
}
