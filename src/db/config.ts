import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from "../config";
import { Bill } from "../models/bill";
import { ActiveMerchants } from "../models/merchant";


export const mysql = new Sequelize(
    {
        database: DB_NAME,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        host: DB_HOST,
        dialect: 'mysql',
        logging: (msg) => {
            if (msg.toLowerCase().includes('error')) {
                console.error(msg); // Log only errors
            }
        }
    }
)

export async function dbConnection() {
    try {
        Bill.initialize(mysql);
        ActiveMerchants.initialize(mysql);

        await mysql.authenticate();
        await mysql.sync({ force: false });
        console.log(`== Connection to BILLING DB has been established successfully! ==`)
    } catch (error) {
        console.log(`unable to connect to BILLING DB:`, error)
    }
}