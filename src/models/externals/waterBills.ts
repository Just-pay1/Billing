import { Model, DataTypes, Optional, Sequelize } from 'sequelize';


export interface BillAttributes {
    bill_id: string;
    bill_code: string;
    amount: number;
    issue_date: Date;
    due_date: Date;
    status: 'pending' | 'paid' | 'overdue';
    payment_date?: Date | null;
}

interface WaterBillCreationAttributes extends Optional<BillAttributes, 'bill_id' | 'payment_date'> { }


export class WaterBill
    extends Model<BillAttributes, WaterBillCreationAttributes>
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
        WaterBill.init(
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
                tableName: 'water_bills',
                sequelize,
                timestamps: true,
                underscored: true,
            }
        )
    }
}