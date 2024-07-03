const express = require("express");
const appRoute = require("./Route/routes");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", appRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
