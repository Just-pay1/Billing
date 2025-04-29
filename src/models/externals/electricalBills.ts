import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
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

interface ElectricBillCreationAttributes extends Optional<BillAttributes, 'bill_id' | 'payment_date'> { }


export class ElectricBill
    extends Model<BillAttributes, ElectricBillCreationAttributes>
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
        ElectricBill.init(
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
                },
            },
            {
                tableName: 'electric_bills',
                sequelize,
                timestamps: true,
                underscored: true,
            }
        )
    }

    static async generateBills(){
    
        const today = new Date();
    
        const bills = Array.from({ length: 20 }, (_, index) => {
            const dueDate = new Date(today);
            dueDate.setMonth(dueDate.getMonth() + 1); // add 1 month
    
            return {
                bill_id: uuidv4(),
                bill_code: `BILL${String(index + 1).padStart(4, '0')}`,
                amount: parseFloat((Math.random() * 500 + 50).toFixed(2)), // random amount between 50 and 550
                issue_date: today,
                due_date: dueDate,
                status: 'pending' as const,
                payment_date: null,
            };
        });
    
        await ElectricBill.bulkCreate(bills);
        console.log('20 bills have been created with due dates 1 month later.');
    }
}