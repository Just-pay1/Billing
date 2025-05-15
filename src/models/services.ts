import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import { ActiveMerchants } from "./merchant";


export interface ServiceArttributes {
    id: string;
    service_type: string;
}

interface ServiceCreationAttributes extends Optional<ServiceArttributes, 'id'> { }

export class Service 
    extends Model<ServiceArttributes, ServiceCreationAttributes>
    implements ServiceArttributes {
        declare id: string;
        declare service_type: string;
        declare readonly created_at: Date;
        declare readonly updated_at: Date;

        static initialize(sequelize: Sequelize) {
            Service.init(
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: () => uuidv4(),
                        allowNull: false,
                        primaryKey: true,
                    },
                    service_type: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                    }
                },
                {
                    tableName: 'services',
                    sequelize,
                    timestamps: true,
                    underscored: true,
                }
            )
        }

        static associate() {
            Service.hasMany(ActiveMerchants, {
                foreignKey: 'service_id',
                as: 'merchants',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }

    }