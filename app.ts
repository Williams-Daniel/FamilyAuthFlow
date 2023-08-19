import express, {Application, Request,Response} from "express"
import cors from "cors"
import { HTTP, mainError } from "./Error/mainError"
import familyAuth from "./Router/familyAuthRouter"


const appConfig =(app:Application)=>{
    app.use(express.json())
    app.use(cors({
        origin:"*",
        methods:["GET","POST","PATCH","DELETE"]
    }))

    app.get("/",(req:Request, res:Response)=>{
        try {
            res.status(HTTP.OK).json({
                message:"Everything is working fine"
            })
        } catch (error) {
            console.log(error)
        }
    })

    app.use("/api", familyAuth)

    .all("*",()=>{
        new mainError({
            name:"Route Error",
            message:"this error is as a result of an incorrect route",
            status: HTTP.BAD_REQUEST,
            success:false
        })
    })
}

export default appConfig