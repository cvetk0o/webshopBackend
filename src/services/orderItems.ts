import { OkPacket } from "mysql";
import query from "./db";

const TABLE_NAME = 'order_items'

interface ICreateOrderItem {
    orderId: number,
    productId: string,
    quantity: number,
    price: number
}

interface IOrderItem {
    order_item_id: string
    orderId: string,
    productId: string,
    quantity: number,
    price: number
}

async function create({ orderId, productId, quantity, price}: ICreateOrderItem){
    const insertResult = await query(
      `INSERT INTO ${TABLE_NAME} (order_id, product_id, quantity, price) VALUES (${orderId},${productId}, ${quantity}, ${price});`
    )  as OkPacket
    
    // Get the ID of the newly inserted row
    const insertId = insertResult.insertId
  
    // Retrieve the newly created row
    const newOrder = await query(
      `SELECT * FROM ${TABLE_NAME} WHERE order_id = ${insertId};`
    );
  
    return newOrder as unknown as IOrderItem[];
    }
  
  

    export default {
        create
    }