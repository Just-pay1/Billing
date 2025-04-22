import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

// attribute types for Bill
export interface BillAttributes {
    bill_id: string;
    bill_code: string;
    merchant_id: string;
    amount: number;
    issue_date: Date;
    due_date: Date;
    status: 'pending' | 'paid' | 'overdue' | 'failled';
    payment_date?: Date | null;
}

// for creation
interface BillCreationAttributes extends Optional<BillAttributes, 'bill_id' | 'payment_date'> { }

export class Bill
    extends Model<BillAttributes, BillCreationAttributes>
    implements BillAttributes {
    declare bill_id: string;
    declare bill_code: string;
    declare merchant_id: string;
    declare amount: number;
    declare issue_date: Date;
    declare due_date: Date;
    declare status: 'pending' | 'paid' | 'overdue' | 'failled';
    declare payment_date: Date | null;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    // initialize the model
    static initialize(sequelize: Sequelize) {
        Bill.init(
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
                merchant_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
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
                    type: DataTypes.ENUM('pending', 'paid', 'overdue', 'failled'),
                    allowNull: false,
                    defaultValue: 'pending',
                },
                payment_date: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                tableName: 'bills',
                sequelize,
                timestamps: true,
                underscored: true,
            }
        );
    }
}