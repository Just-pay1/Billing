import { Sequelize } from "sequelize";
import { ElectricBill } from "../models/externals/electricalBills";
import { WaterBill } from "../models/externals/waterBills";
import { GasBill } from "../models/externals/gasBills";


export const mysql = new Sequelize(
    {
        database: 'EXTERNAL',
        username: 'crm_user',
        password: 'pass1234',
        host: '127.0.0.1',
        dialect: 'mysql',
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


        await mysql.authenticate();
        await mysql.sync({ force: false });
        console.log(`== Connection to External DB has been established successfully! ==`)
    } catch (error) {
        console.log(`unable to connect to External DB:`, error)
    }
}