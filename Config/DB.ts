import mongoose from "mongoose"
import env from "dotenv"

env.config()

const dbConfig = ()=>{
    mongoose.connect(process.env.DB_STRING!).then(()=>{
        console.log("Database is good to go!!!")
    })
}

export default dbConfig