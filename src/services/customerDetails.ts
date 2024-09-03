import { OkPacket } from "mysql";
import ICustomer, { ICustomerCreation } from "../model/customer/types";
import query from "./db";

const TABLE_NAME = 'customer_details'



async function getAll () {
    const customers = await query(`SELECT * FROM ${TABLE_NAME}`)
    return customers as unknown as ICustomer[]
}

async function create({last_name, first_name, email, phone, street, city, postal_code}: ICustomerCreation) {

    const queryString = `
    INSERT INTO ${TABLE_NAME} (
        first_name,
        last_name,
        email,
        phone,
        street,
        city,
        postal_code
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
`;

const values = [first_name, last_name, email, phone, street, city, postal_code];

    const insertResult = await query(
        queryString, values
    ) as OkPacket

    const insertId = insertResult.insertId;

    const customer = await query(
      `SELECT * FROM ${TABLE_NAME} WHERE customer_id = ${insertId};`);

    return customer as unknown as ICustomer[];
}

export default {
    getAll,
    create
}