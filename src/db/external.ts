import { Sequelize } from "sequelize";
import { ElectricBill } from "../models/externals/electricalBills";
import { WaterBill } from "../models/externals/waterBills";
import { GasBill } from "../models/externals/gasBills";
import { DB_USERNAME, DB_PASSWORD, DB_HOST, EXTERNAL_DB_NAME } from "../config";


export const mysql = new Sequelize(
    {
        database: EXTERNAL_DB_NAME,
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

export async function externalDbConnection() {
    try {
        await ElectricBill.initialize(mysql);
        await WaterBill.initialize(mysql);
        await GasBill.initialize(mysql);

        // await ElectricBill.generateBills()
        // await WaterBill.generateBills()
        // await GasBill.generateBills()



        await mysql.authenticate();
        await mysql.sync({ force: false });
        console.log(`== Connection to External DB has been established successfully! ==`)
    } catch (error) {
        console.log(`unable to connect to External DB:`, error)
    }
}