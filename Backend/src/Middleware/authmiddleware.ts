import  Jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    userId?: string;
    role?: string;
    
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const Header = req.headers.authorization;
    if(!Header) return res.status(401).json({message: "NO Token Provided"});

    const token = Header.split(" ")[1];
    if(!token) return res.status(401).json({message: "NO Token Provided"});

    if(token == "undefined") return res.status(401).json({message: "Undefined Token Provided"});

    try {
        if(!process.env.JWT_KEY) {
            throw new Error("No Key Provided in ENV");
        }

        const decoded = Jwt.verify(token, process.env.JWT_KEY) as {id: string; role: string};
        
        req.userId = decoded.id;
        
        req.role = decoded.role;
       

        next();
    } catch (error: any) {
        console.error(error);
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({message: "Token Expired login again"});
        }
       return res.status(403).json({message: "Invalid Token"});

    }
}
export const authorizeRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.role || !roles.includes(req.role)) {
            return res.status(403).json({message: "Insufficient permissions"});
        }
        next();
    };
};