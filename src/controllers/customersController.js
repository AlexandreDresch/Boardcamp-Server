import { db } from "../config/database.js";

export async function getCustomers(_, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");

    res.send(customers.rows);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function getCustomerByID(req, res) {
  const { id } = req.params;

  try {
    const customerByID = await db.query("SELECT * FROM customers WHERE id=$1", [
      id,
    ]);

    if (customerByID.rows.length === 0) {
      return res.sendStatus(404);
    }

    res.send(customerByID.rows[0]);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const verifyIfCustomerAlreadyExists = await db.query(
      "SELECT cpf FROM customers WHERE cpf=$1;",
      [req.body.cpf]
    );

    if (verifyIfCustomerAlreadyExists.rows.length) {
      return res.sendStatus(409);
    }

    await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [name, phone, cpf, birthday]
    );

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  try {
    const verifyIfAnotherCustomerWithCPFAlreadyExists = await db.query(
      "SELECT * FROM customers WHERE cpf = $1 AND id != $2",
      [cpf, id]
    );

    if (verifyIfAnotherCustomerWithCPFAlreadyExists.rows.length !== 0) {
      return res.sendStatus(409);
    }

    await db.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
      [name, phone, cpf, birthday, id]
    );

    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
