import dotenv from 'dotenv'

dotenv.config()


const connectionConfig = {
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    insecureAuth : true,
    connectTimeout: 60000
}

export default connectionConfig