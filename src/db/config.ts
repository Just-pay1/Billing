import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from "../config";
import { Bill } from "../models/bill";
import { ActiveMerchants } from "../models/merchant";
import { Service } from "../models/services";


export const mysql = new Sequelize(
    {
        database: DB_NAME,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        host: DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // disables cert verification
            }
        },
        logging: (msg) => {
            if (msg.toLowerCase().includes('error')) {
                console.error(msg); // Log only errors
            }
        }
    }
)

export async function dbConnection() {
    try {
        // init models 
        Bill.initialize(mysql);
        ActiveMerchants.initialize(mysql);
        Service.initialize(mysql);

        // relations
        ActiveMerchants.associate();
        Bill.associate();
        Service.associate();

        await mysql.authenticate();
        await mysql.sync({ alter: true });
        console.log(`== Connection to BILLING DB has been established successfully! ==`)
    } catch (error) {
        console.log(`unable to connect to BILLING DB:`, error)
    }
}