import {Request, Response} from "express"
import bcrypt from "bcrypt"
import cloudinary from "../Config/cloudinary"
import familyAuthModel from "../Model/familyAuthModel"
import { HTTP, mainError } from "../Error/mainError"



export const RegisterFamilyMember = async(req:any,res:Response)=>{
    try {
        

        const {Familyname, email, password, Address} =req.body
        
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password,salt)

        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path)

        const newFamilyMember = await familyAuthModel.create({
            Familyname,
            email,
            password:hashed,
            Address,
            FamilyAvatar:secure_url,
            FamilyAvatarID:public_id
        })

        res.status(HTTP.CREATED).json({
            message:"New family member added",
            data:newFamilyMember
        })
    } catch (error) {
        res.status(HTTP.BAD_REQUEST).json({
            message:"family member cannot be registered!!",
            data: error.message
        })
    }
}
export const SignInFamilyMember = async(req:Request,res:Response)=>{
    try {

        const {email,password} = req.body


        const familyMember = await familyAuthModel.findOne({email})
        if(familyMember){
            const checked = await bcrypt.compare(password,familyMember.password)
            if(checked){
                res.status(HTTP.CREATED).json({
                    message:`Welcome back ${familyMember?.Familyname}`,
                    data:familyMember?.id   
                })
            }else{
                new mainError({
                    name:"invalid/incorrect password",
                    message:"this  error is as a result of an invalid password",
                    status:HTTP.NOT_FOUND,
                    success:false
                })
            }
        }else{
            new mainError({
                name:"Invalid/wrong email",
                message:"couldn't find this Email",
                status:HTTP.NOT_FOUND,
                success:false
            })
        }
    } catch (error) {
        res.status(HTTP.NOT_FOUND).json({
            message:"family member cannot be signed in!!",
            data: error.message
        })
    }
}
export const getFamilyMembers = async(req:Request,res:Response)=>{
    try {

        const familyMembers = await familyAuthModel.find().sort({updatedAt:-1})
       

        res.status(HTTP.CREATED).json({
            message:"All family members gotten",
            data:familyMembers
        })
    } catch (error) {
        res.status(HTTP.NOT_FOUND).json({
            message:"family members cannot be gotten!!",
            data: error.message
        })
    }
}
export const getOneFamilyMember = async(req:Request,res:Response)=>{
    try {

        const {FamilyID} = req.params

        const oneFamilyMember = await familyAuthModel.findById(FamilyID)
       

        res.status(HTTP.CREATED).json({
            message:"One family member gotten",
            data:oneFamilyMember
        })
    } catch (error) {
        res.status(HTTP.NOT_FOUND).json({
            message:"family member cannot be gotten!!",
            data: error.message
        })
    }
}