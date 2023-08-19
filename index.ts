import express, {Application} from "express"
import env from "dotenv"
import dbConfig from "./Config/DB"
import appConfig from "./app"

env.config()

const app:Application = express()
const port: number = parseInt(process.env.PORT!)

appConfig(app)
const server = app.listen(port,()=>{
    console.log("A server is connected on port : ", port)
    dbConfig()
})

process.on("uncaughtException",(error:Error)=>{
    console.log("uncaughtException error: ",error)
    process.exit(1)
})

process.on("unhandledRejection",(reason)=>{
    console.log("unhandledRejection reason: ",reason)

    server.close(()=>{
        process.exit(1)
    })
})
