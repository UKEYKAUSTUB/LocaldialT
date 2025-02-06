const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization); // Debugging Log

    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No Token Found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user data
        console.log("Decoded User:", decoded); // Debugging Log
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error); // Debugging Log
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};

module.exports = { verifyToken };
