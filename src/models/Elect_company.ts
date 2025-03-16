import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";



class Elect extends Model { }

Elect.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "overdue"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "Elect",
    timestamps: true,
  }
);

export default Elect;