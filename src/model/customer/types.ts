


export default interface ICustomer {
    customer_id: number;          // The unique identifier for the customer
    first_name: string;           // The customer's first name
    last_name: string;            // The customer's last name
    email: string;                // The customer's email address, must be unique
    phone?: string;               // The customer's phone number, optional
    street?: string;              // The customer's street address, optional
    city?: string;                // The city where the customer resides, optional
    postal_code?: string;         // The postal code for the customer's address, optional
}

export interface ICustomerCreation {
    first_name: string;           // The customer's first name
    last_name: string;            // The customer's last name
    email: string;                // The customer's email address, must be unique
    phone?: string;               // The customer's phone number, optional
    street?: string;              // The customer's street address, optional
    city?: string;                // The city where the customer resides, optional
    postal_code?: string;  
}