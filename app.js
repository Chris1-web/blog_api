const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();
const apiRouter = require("./routes/api");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Sever listening on port ${PORT}`);
});
