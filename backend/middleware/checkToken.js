import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(new Error("Token is required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== 'password-reset') {
      return next(new Error('Invalid token type'));
    }

    if (Date.now() >= decoded.exp * 1000) {
      return next(new Error("Token has expired"));
    }

    req.decoded = decoded;
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
};
