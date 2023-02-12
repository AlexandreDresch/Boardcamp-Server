import dayjs from "dayjs";

import { db } from "../config/database.js";

export async function getRentals(req, res) {
  try {
    const rentalsList = await db.query(
      `SELECT json_build_object('id',rentals.id, 'customerId', rentals."customerId", 'gameId', rentals."gameId",'rentDate', rentals."rentDate",'daysRented', rentals."daysRented", 'returnDate', rentals."returnDate", 'originalPrice', rentals."originalPrice",'delayFee', rentals."delayFee",
        'customer', json_build_object('id', customers.id, 'name', customers.name), 'game', json_build_object('id', games.id, 'name',games.name )) from rentals 
        JOIN customers ON customers.id=rentals."customerId" 
        JOIN games ON games.id=rentals."gameId";`
    );

    let rentalData = [];
    for (let i in rentalsList.rows) {
      rentalData.push(rentalsList.rows[i].json_build_object);
    }

    res.send(rentalData);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function postRental(req, res) {
  const { rentalData } = res.locals;

  try {
    await db.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        rentalData.customerId,
        rentalData.gameId,
        rentalData.rentDate,
        rentalData.daysRented,
        rentalData.returnDate,
        rentalData.originalPrice,
        rentalData.delayFee,
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function finishRental(req, res) {
  const { rentalData } = res.locals;
  try {
    if (rentalData.returnDate !== null) {
      res.sendStatus(400);
    }

    rentalData.returnDate = dayjs().format("YYYY-MM-DD"); 

    const daysDifference = Math.floor(new Date(rentalData.returnDate) - new Date(rentalData.rentDate)) / (1000 * 3600 * 24);

    //console.log(daysDifference);

    if(daysDifference > 0) {
        rentalData.delayFee = daysDifference * rentalData.pricePerDay;
    } else {
        rentalData.delayFee = 0;
    }

    await db.query(
      'UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;',
      [rentalData.returnDate, rentalData.delayFee, rentalData.id]
    );

    res.sendStatus(200);  
  } catch (error) {
    console.error(error);
    res.sendStatus(500); 
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const verifyIfIDExists = await db.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );

    if (!verifyIfIDExists.rows.length) {
      return res.sendStatus(404);
    }

    if (verifyIfIDExists.rows[0].returnDate === null) {
      return res.sendStatus(400);
    }

    await db.query("DELETE FROM rentals WHERE id=$1", [id]);

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
