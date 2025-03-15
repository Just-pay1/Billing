import express, { Request, Response } from "express";
import merchant_route from "./routes/merchantRoutes";
import bill_route from "./routes/billRoutes";
import sequelize from "./database/database";
import "./models/merchant";
import "./models/Elect_company";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/bills", bill_route);
app.use("/merchants", merchant_route);
sequelize
  .sync({ force: false })
  .then(() => console.log("Database connected and models synced"))
  .catch((err) => console.error("DB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
