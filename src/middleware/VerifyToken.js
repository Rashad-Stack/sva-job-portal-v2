import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookie.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // you can use req.user later in protected routes
    next(); // token is valid, move to next middleware or route handler
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default verifyToken;
