import { Sequelize } from "sequelize";
import { ElectricBill } from "../models/externals/electricalBills";
import { WaterBill } from "../models/externals/waterBills";
import { GasBill } from "../models/externals/gasBills";
import { DB_USERNAME, DB_PASSWORD, DB_HOST, EXTERNAL_DB_NAME } from "../config";
import { InternetBill } from "../models/externals/internetBills";
import { MobileBill } from "../models/externals/mobileBills";


export const external_db = new Sequelize(
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
        await ElectricBill.initialize(external_db);
        await WaterBill.initialize(external_db);
        await GasBill.initialize(external_db);
        await InternetBill.initialize(external_db);
        await MobileBill.initialize(external_db);

        // await ElectricBill.generateBills()
        // await WaterBill.generateBills()
        // await GasBill.generateBills()
        // await InternetBill.generateBills()
        // await MobileBill.generateBills()



        await external_db.authenticate();
        await external_db.sync({ force: false });
        console.log(`== Connection to External DB has been established successfully! ==`)
    } catch (error) {
        console.log(`unable to connect to External DB:`, error)
    }
}