import express, { Router } from "express"
import { RegisterFamilyMember, SignInFamilyMember, getFamilyMembers, getOneFamilyMember } from "../Controller/familyAuthController"
import upload from "../Config/multer"



const router:Router = express.Router()

router.route("/register").post(upload ,RegisterFamilyMember)
router.route("/signin").post(SignInFamilyMember)
router.route("/get-all").get(getFamilyMembers)
router.route("/:FamilyID/get-one").get(getOneFamilyMember)


export default router