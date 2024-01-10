import mongoose from "mongoose";

const connectDB = async(DATABASE_URL)=>{
    try {

        const OPTION_DB ={
            dbName : 'Login_Project'
        }
        await mongoose.connect(DATABASE_URL , OPTION_DB) ;
        console.log("Database connection seccesfully")
        
        
    } catch (error) {
        console.log(error)
        
    }
}

export default connectDB