import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';


export interface BillAttributes {
    bill_id: string;
    bill_code: string;
    amount: number;
    issue_date: Date;
    due_date: Date;
    status: 'pending' | 'paid' | 'overdue';
    payment_date?: Date | null;
}

interface MobileBillCreationAttributes extends Optional<BillAttributes, 'bill_id' | 'payment_date'> { }

export class MobileBill
    extends Model<BillAttributes, MobileBillCreationAttributes>
    implements BillAttributes {
    declare bill_id: string;
    declare bill_code: string;
    declare amount: number;
    declare issue_date: Date;
    declare due_date: Date;
    declare status: 'pending' | 'paid' | 'overdue';
    declare payment_date?: Date | null;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    static async initialize(sequelize: Sequelize) {
        MobileBill.init(
            {
                bill_id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                bill_code: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                amount: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                due_date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                issue_date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM('pending', 'paid', 'overdue'),
                    allowNull: false,
                    defaultValue: 'pending',
                },
                payment_date: {
                    type: DataTypes.DATE,
                    allowNull: true,
                }
            },
            {
                sequelize,
                modelName: 'MobileBill',
                tableName: 'mobile_bills',
                timestamps: true,
                underscored: true,
            }
        );
    }

    static async generateBills() {
        const today = new Date();
    
        const prefixes = ['011', '012', '010'];
    
        const generateBillCode = () => {
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const randomDigits = Math.floor(Math.random() * 1_0000_0000)
                .toString()
                .padStart(8, '0'); // ensure 8 digits
            return `${prefix}${randomDigits}`; // e.g., 01154461886
        };
    
        const bills = Array.from({ length: 1000 }, () => {
            const dueDate = new Date(today);
            dueDate.setMonth(dueDate.getMonth() + 1); // add 1 month
    
            return {
                bill_id: uuidv4(),
                bill_code: generateBillCode(), // e.g., 01154461886
                amount: parseFloat((Math.random() * 500 + 50).toFixed(2)), // between 50 and 550
                issue_date: today,
                due_date: dueDate,
                status: 'pending' as const,
                payment_date: null,
            };
        });
    
        await MobileBill.bulkCreate(bills);
        console.log('1000 bills with bill codes starting with 011, 012, or 010 followed by 8 digits have been created.');
    }
    
}