const jwt = require("jsonwebtoken");

// 1. VERIFY TOKEN MIDDLEWARE
const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    // Expected format: "Bearer <token>"
    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Attach decoded payload ({ id, role }) to req.user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// 2. ROLE AUTHORIZATION MIDDLEWARE
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission.",
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};