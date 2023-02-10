import { db } from "../config/database.js";

export function customerValidation(schema) {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body, { abortEarly: false });

      const verifyIfCustomerAlreadyExists = await db.query(
        "SELECT cpf FROM customers WHERE cpf=$1;",
        [req.body.cpf]
      );

      if (verifyIfCustomerAlreadyExists.rows.length) {
        return res.sendStatus(409);
      }

      res.locals.value = value;
      next();
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
}
