import { ICustomerCreation } from "../../model/customer/types"


export default interface IOrderItemAndQuantity {
    orderItemId: string
    quantity: number
}


export interface IOrder {
    order_id: number
    orderDate: string
    total_price: number
}

export  interface IOrderDTO {
    orderItemsAndQuantity: IOrderItemAndQuantity[]
    customerDetails: ICustomerCreation
}