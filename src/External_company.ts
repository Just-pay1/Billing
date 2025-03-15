// this server acts as Electric company from another port : 4000
import express, { Request, Response } from "express";
import Elect from "./models/Elect_company";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  const electRecord = await Elect.findByPk(user_id, {
    attributes: ["id", "name", "amount", "dueDate"],
  });
  if (electRecord) {
    res.status(200).json({ "Bill": electRecord });
  }
  else {
    res.status(404).json({ "msg": "Record not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Second server running on http://localhost:${PORT}`);
});
