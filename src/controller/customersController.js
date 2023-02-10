import { db } from "../config/database.js";

export async function getCustomers(_, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");

    res.send(customers.rows);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export async function getCustomerByID(req, res) {
  const {id} = req.params;

  try {
    const customerByID = await db.query("SELECT * FROM customers WHERE id=$1", [id]);

    if (customerByID.rows.length === 0) {
      return res.sendStatus(404);
    }

    res.send(customerByID.rows[0]);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    db.query(
      'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
      [name, phone, cpf, birthday]
    );

    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}