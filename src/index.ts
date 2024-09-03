import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import ordersRouter from './controllers/orders'
import productsRouter from './controllers/products'
import customeRouter from './controllers/customers'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.get('/',(req: Request, res: Response) => {
    res.send('Hello Webshop')
})

app.use("/orders", ordersRouter)
app.use('/products', productsRouter)
app.use('/customers', customeRouter)

app.use((err: any, req: Request,res: Response, next: NextFunction)=>{
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
})

app.listen(port, ()=>{
    console.log(`Index is listening on port ${port}`)
})