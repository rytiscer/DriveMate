const express = require("express");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");
const userRoutes = require("./routes/userRoutes");
const clientsRoutes = require("./routes/clientsRoutes");
const { authenticateUser } = require("./middlewares/authMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

app.use("/cars", carRoutes);
app.use("/clients", authenticateUser, clientsRoutes);
app.use("/register", userRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
