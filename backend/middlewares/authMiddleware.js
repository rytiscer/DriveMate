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
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    console.error("Error", error);
    return res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = { authenticateUser };
