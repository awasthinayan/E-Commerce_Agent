import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ✅ Extend Express Request to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ✅ Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized: No token provided",
        message: "Please include Authorization header with Bearer token"
      });
    }

    // ✅ Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    // ✅ Verify token
    const decoded = jwt.verify(token, JWT_SECRET as string) as any;

    // ✅ Attach userId and user info to request
    req.userId = decoded.userId;
    req.user = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Unauthorized: Token expired",
        message: "Please login again"
      });
    }

    return res.status(401).json({
      error: "Unauthorized: Invalid token",
      message: "Token verification failed"
    });
  }
};

// ✅ Optional: Middleware to check if user is authenticated (non-blocking)
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET as string) as any;
      req.userId = decoded.userId;
      req.user = decoded;
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};