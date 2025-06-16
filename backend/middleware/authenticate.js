/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication Required. Please Log In or Register.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // assuming payload has user id
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

export default authenticate;
