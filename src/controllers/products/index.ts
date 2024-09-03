import express, { NextFunction, Request, Response }  from "express"
import products from "../../services/products"


const productsRouter = express.Router()

productsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allProducts = await products.getAllProducts()
        return res.json(allProducts)
    } catch (error: any) {
        console.error('Error while getting all products', error?.message)
        next(error)
    }
})

productsRouter.get('/:productId',async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {productId} = req.params
        const product = await products.getProductById(productId)
        return res.json(product)
    } catch (error: any) {
        console.error('Error while retrieving product', error?.message)
        next(error)
    }

} )


export default productsRouter