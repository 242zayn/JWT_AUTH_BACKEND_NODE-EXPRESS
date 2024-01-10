import express from "express" ;
const app = express();
// env
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 5000 ;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

import connectDB from "./database/database.js";

import cors from "cors"
app.use(cors());

//body-parser 
import bodyparser from "body-parser"
app.use(bodyparser.json());
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true})) ;



//routes
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
app.use(router)
app.use(cookieParser())


connectDB(DATABASE_URL);


const start = ()=>{
    try {
        app.listen(port , ()=>{
            console.log(`Project are runing on port ${port}`)
        })
        
    } catch (error) {
        console.log(error)      
    }
}
start()