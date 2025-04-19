import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // This creates the SQLite database file
  logging: false, // Disable logging (optional)
});

export default sequelize;
