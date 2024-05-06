const express = require("express");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

app.use("/cars", carRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
