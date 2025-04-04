import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token, decoded)
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid token." });
    }
};

export default authenticateToken
