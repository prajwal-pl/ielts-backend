import express from "express";
import cors from "cors";

import dotenv from "dotenv";

import questionsData from "./routes/main.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", questionsData);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
