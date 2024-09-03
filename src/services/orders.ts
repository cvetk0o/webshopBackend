import { OkPacket } from "mysql";
import { IOrder } from "../controllers/orders/types";
import query from "./db";


async function getAllOrders () {
   const orders =   await query('SELECT * FROM orders')
    return orders as unknown as IOrder[]
}


async function create(totalPrice: number, customer_id: number){
  const insertResult = await query(
    `INSERT INTO orders (total_price, customer_id) VALUES (${totalPrice}, ${customer_id});`
  )  as OkPacket

  // Get the ID of the newly inserted row
  const insertId = insertResult.insertId

  // Retrieve the newly created row
  const newOrder = await query(
    `SELECT * FROM orders WHERE order_id = ${insertId};`
  );

  return newOrder as unknown as IOrder[];
  }


export default {
    getAllOrders,
    create
}