const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Non authorized token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: false,
    });
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error("Error", error);
    res.status(401).json({ error: "Error" });
  }
};

module.exports = { authenticateUser };
