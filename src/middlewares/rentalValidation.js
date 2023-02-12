import dayjs from "dayjs";

import { db } from "../config/database.js";

export function rentalValidation(schema) {
  return async (req, res, next) => {
    try {
      const data = await schema.validateAsync(req.body, { abortEarly: false });

      data.returnDate = null;
      data.delayFee = null;
      data.rentDate = dayjs().format("YYYY-MM-DD");

      const verifyIfCustomerExists = await db.query(
        "SELECT * FROM customers WHERE id=$1",
        [data.customerId]
      );

      if (!verifyIfCustomerExists.rows.length) {
        return res.sendStatus(400);
      }

      const verifyIfGameExists = await db.query(
        'SELECT "stockTotal", "pricePerDay" FROM games WHERE id=$1',
        [data.gameId]
      );

      if (!verifyIfGameExists.rows.length) {
        return res.sendStatus(400); 
      }

      const verifyStock = await db.query(
        'SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL',
        [data.gameId]
      );

      if (verifyStock.rows.length >= verifyIfGameExists.rows[0].stockTotal) {
        return res.sendStatus(400);
      }

      data.originalPrice =
        data.daysRented * verifyIfGameExists.rows[0].pricePerDay;

      res.locals.rentalData = data;
      next();
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
}
