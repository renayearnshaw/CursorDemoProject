import express from "express";
import { initializeDatabase } from "./db.js";
import { router } from "./routes/users.js";

const app = express();
app.use(express.json());

app.use("/users", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  try {
    initializeDatabase();
  } catch (err) {
    console.error("Failed to initialise database:", err.message);
    process.exit(1);
  }
});
