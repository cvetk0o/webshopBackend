import mysql from 'mysql2/promise'
import connectionConfig from "../config/mysql";


async function query(sql:  string, values?: any [] ) {
    const connection =  await mysql.createConnection(connectionConfig)

    let results;

    // Check if values are provided
    if (values) {
        // Execute query with parameters
        [results] = await connection.execute(sql, values);
    } else {
        // Execute query without parameters
        [results] = await connection.query(sql);
    }
    return results
}


export default query