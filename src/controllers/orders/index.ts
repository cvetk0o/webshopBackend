import express, { NextFunction, Request, Response } from "express";
import orderItems from "../../services/orderItems";
import orders from "../../services/orders";
import products from "../../services/products";
import customerService from "../../services/customerDetails";
import mailService from "../../services/mail";
import { IOrderDTO } from "./types";
import { readFile } from 'node:fs';
import path from "node:path";
import orderConfirmationEmail from "../../constants/templates/orderConfirmationEmail";
import timeUtils from "../../utils/timeUtils";
import IProduct from "../products/types";



const ordersRouter = express.Router()


ordersRouter.get('/',async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allOrders = await orders.getAllOrders()
        res.json(allOrders)
        
    } catch (error: any) {
        console.error(`Error while getting all orders `, error?.message)
        next(error)
    }
})

ordersRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {orderItemsAndQuantity, customerDetails} = req.body as IOrderDTO

        // create Customer
        const [customer] = await customerService.create(customerDetails)

        let totalPriceOfOrder = 0;
        const promises = orderItemsAndQuantity.map(async (item) => {
            const { orderItemId, quantity } = item;
            const [product] = await products.getProductById(orderItemId);
            totalPriceOfOrder += product?.price * quantity;
        });
        
        await Promise.all(promises);

        // create an order 
        const [order] = await orders.create(totalPriceOfOrder, customer.customer_id)
        const { order_id, orderDate } = order
        
        let productsA: IProduct[] = []
        const createOrderItemPromises = orderItemsAndQuantity.map(async (item)=>{
            const { orderItemId, quantity } = item;
            const [product] = await products.getProductById(orderItemId);
            productsA.push(product)
            await orderItems.create({
                orderId: order_id,
                productId: product.product_id,
                quantity,
                price: product.price
                
            })
        })

        await Promise.all(createOrderItemPromises);

        const templateHTML  = await orderConfirmationEmail({firstname: customer.first_name, lastname: customer.last_name, totalPrice: totalPriceOfOrder, creationDate: timeUtils.formatTimeForEmail(orderDate), productName: productsA[0]?.name, productImageUrl: productsA[0]?.imageUrl })
        mailService.sendEmail({
            to: [customer?.email],
            subject: 'Narudzbina primljena',
           html: templateHTML,

        })
      
        res.json('message')
    } catch (error: any) {
        console.error('Error while creating order',error?.message )
        next(error)
    }
})



ordersRouter.get('/test-email',(req: Request, res: Response, next: NextFunction) => {

    try {

        mailService.sendEmail({
            to: ['pp@binariilabs.com'],
            subject: 'Testing email',
            html: 'Sta je ovaj text',

        })
        
        res.json('Email sucessfully sent')
    } catch (error: any) {
        console.error(`Error /test-email`, error?.message)
        next(error)
    }
} )


export default ordersRouter