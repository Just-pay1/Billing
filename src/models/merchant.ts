import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

class Merchant extends Model { }

Merchant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING, // Store URL or file path
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true, // Ensures it's a valid URL
      },
    },
    commissionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "merchants",
  }
);

export default Merchant;
