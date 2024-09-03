import IProduct from "../controllers/products/types";
import query from "./db";


async function getAllProducts() {
    const products = await query('SELECT * FROM products')
    return products as unknown as IProduct[]
}

async function getProductById(productId:string) {

    const product = await query(`SELECT * FROM products WHERE product_id = ${productId}`)
    return product as unknown as IProduct[]
    
}

export default {
    getAllProducts,
    getProductById
}