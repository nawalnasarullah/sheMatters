import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(new Error("Token is required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check the type of token to ensure it's for password reset
    if (decoded.type !== 'password-reset') {
      return next(new Error('Invalid token type'));
    }

    // Check if token is expired
    if (Date.now() >= decoded.exp * 1000) {
      return next(new Error("Token has expired"));
    }

    // Attach decoded data to the request object for further use
    req.decoded = decoded;
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
};
