import mongoose from "mongoose";



export interface iFamAuth {
    Familyname:string,
    email:string,
    password:string,
    Address:string,
    FamilyAvatar:string,
    FamilyAvatarID:string,
}

export interface iFamAuthData extends iFamAuth,mongoose.Document{}

const famAuthModel = new mongoose.Schema({
    Familyname:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        toLowercase:true
    },
    password:{
        type:String
    },
    Address:{
        type:String
    },
    FamilyAvatar:{
        type:String
    },
    FamilyAvatarID:{
        type:String
    },
},{timestamps:true})

export default mongoose.model<iFamAuthData>("FamilyAuth",famAuthModel)