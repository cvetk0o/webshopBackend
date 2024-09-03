import { readFile } from "fs/promises";
import Handlebars from "handlebars";
import path from "path";


interface IOrderConfirmationEmail {firstname: string, lastname: string, totalPrice: number, creationDate: string

productName: string
productImageUrl: string
}

const orderConfirmationEmail = async  ({firstname, lastname, totalPrice, creationDate, productImageUrl, productName}: IOrderConfirmationEmail ) => {

    const templatePath = path.join(__dirname, '../../../assets/emailTemplates/confirmationOrder.html');
    const htmlTemmplate = await readFile(templatePath, 'utf8')

    const template = Handlebars.compile(htmlTemmplate);


    const productTemplatePath = path.join(__dirname, '../../../assets/emailTemplates/productRowTemplate.html');
    const productHtmlTemmplate = await readFile(productTemplatePath, 'utf8')

    const productTemplate = Handlebars.compile(productHtmlTemmplate);

    const product1 = productTemplate({productName, productImageUrl})

    const result = template({firstname, lastname, totalPrice, creationDate, product1});
    return result
}


export default orderConfirmationEmail