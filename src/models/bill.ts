import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { ActiveMerchants } from './merchant';

// attribute types for Bill
export interface BillAttributes {
    bill_id: string;
    bill_code: string;
    merchant_id: string;
    amount: number;
    fee: number;
    paid_amount: number | null; 
    issue_date: Date;
    due_date: Date;
    status: 'pending' | 'paid' | 'overdue' | 'failed';
    payment_date?: Date | null;
    // payment_method: 'credit' | 'debit' | 'prepaid' | null;
    user_id: string | null; // user who paid the bill;
    model: string;
}

// for creation
interface BillCreationAttributes extends Optional<BillAttributes, 'payment_date' | 'user_id'> { }

export class Bill
    extends Model<BillAttributes, BillCreationAttributes>
    implements BillAttributes {
    declare bill_id: string;
    declare bill_code: string;
    declare merchant_id: string;
    declare amount: number;
    declare fee: number;
    declare paid_amount: number | null; 
    declare issue_date: Date;
    declare due_date: Date;
    declare status: 'pending' | 'paid' | 'overdue' | 'failed';
    declare payment_date: Date | null;
    // declare payment_method: 'credit' | 'debit' | 'prepaid' | null;
    declare user_id: string | null;
    declare model: string;

    declare readonly created_at: Date;
    declare readonly updated_at: Date;

    // initialize the model
    static initialize(sequelize: Sequelize) {
        Bill.init(
            {
                bill_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
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
                    references: {
                        model: 'active_merchants', // table name
                        key: 'merchant_id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                amount: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                fee: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                paid_amount: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: true,
                    defaultValue: null
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
                    type: DataTypes.ENUM('pending', 'paid', 'overdue', 'failed'),
                    allowNull: false,
                    defaultValue: 'pending',
                },
                payment_date: {
                    type: DataTypes.DATE,
                    defaultValue: null,
                    allowNull: true,
                },
                // payment_method: {
                //     type: DataTypes.ENUM('credit', 'debit', 'prepaid'),
                //     allowNull: true,
                //     defaultValue: null,
                // },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: true,
                    defaultValue: null,
                },
                model: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                tableName: 'bills',
                sequelize,
                timestamps: true,
                underscored: true,
            }
        );
    }

    static associate() {
        Bill.belongsTo(ActiveMerchants, {
            foreignKey: 'merchant_id',
            as: 'merchant'
        });
    }
}