import { db } from "../config/database.js";

export function rentalIDValidation() {
  return async (req, res, next) => {
    const { id } = req.params;

    try {
      const verifyIfIDExists = await db.query(
        "SELECT * FROM rentals WHERE id=$1;",
        [id]
      );

      if (!verifyIfIDExists.rows.length) {
        return res.sendStatus(404);
      }

      res.locals.rentalData = verifyIfIDExists.rows[0];
 
      next();
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  };
}
