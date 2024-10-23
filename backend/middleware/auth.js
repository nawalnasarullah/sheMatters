import jwt from "jsonwebtoken";
export const isUserAuthenticated = (req, res, next) => {

    const {auth_token} = req.cookies;
    if(!auth_token){
        return next(new Error("You need to login to access this resource"));
    }
    try{
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        
        req.user = decoded; // req ky object mein user ki decoded info daal di req k obj har jagah available hai
        next();
    }catch(error){
        next(error)
    }
}

export const isUserAuthorised = (...roles) => {  
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Error("Unauthorized User"))
        }
        next()
    }
}