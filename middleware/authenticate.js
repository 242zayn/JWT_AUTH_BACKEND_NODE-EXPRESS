 import jwt from "jsonwebtoken" ;
 import UserModel from "../model/sceema.js";

 import { keysecret } from "../model/sceema.js";

const authenticate = async(req, res, next)=>{

    //  console.log(req.headers.authorization)
        
    try {

        const token = req.headers.authorization ;
        const verifytoken = jwt.verify(token , keysecret)
        const rootUser = await UserModel.findOne({_id:verifytoken._id});

        console.log(rootUser)

         if (!rootUser) {
            throw new Error(" User not found ") ;
         }

         req.token = token;
         req.rootUser = rootUser ;
         req.userId = rootUser._id ;

        
         

         next();

        
    } catch (error) {

        res.status(401).json({status:401, message:" Unothorized check in middleware  "}) 
        
    }


}


export default authenticate