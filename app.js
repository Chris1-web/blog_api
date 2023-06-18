const express = require("express");
const app = express();
const PORT = 3000;
const apiRouter = require("./routes/api");

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Sever listening on port ${PORT}`);
});
