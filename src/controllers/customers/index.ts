import express, { NextFunction, Request, Response } from 'express'
import customerDetails from '../../services/customerDetails'

const customeRouter = express.Router()

customeRouter.get('/',async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const allCustomers  = await customerDetails.getAll()
        return res.json(allCustomers)
    } catch (error: any) {
        console.error('Error while getting all products', error?.message)
        next(error)
    }
})

export default customeRouter