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

      const verifyIfGameAndStockExists = await db.query(
        'SELECT "stockTotal", "pricePerDay" FROM games WHERE id=$1',
        [data.gameId]
      );

      if ( 
        !verifyIfGameAndStockExists.rows.length ||
        verifyIfGameAndStockExists.rows[0].stockTotal === 0
      ) {
        return res.sendStatus(400);
      }

      data.originalPrice =
        data.daysRented * verifyIfGameAndStockExists.rows[0].pricePerDay;

      res.locals.rentalData = data;
      next();
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
}
