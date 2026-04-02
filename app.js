import express from "express";
import { initializeDatabase } from "./db.js";
import { router as usersRouter } from "./routes/users.js";
import { router as eventsRouter } from "./routes/events.js";
import cors from "cors";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/events", eventsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  try {
    initializeDatabase();
  } catch (err) {
    console.error("Failed to initialise database:", err.message);
    process.exit(1);
  }
});
