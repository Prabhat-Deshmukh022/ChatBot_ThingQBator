import { User } from "../models/user.models.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {cloudinary_upload} from "../utils/cloudinary.js";

const userRegister = asyncHandler( async (req,res) => {

    const {username,email,fullname,password} = req.body

    console.log(req.body);

    if(!(username&&email&&fullname&&password)){
        console.log(`Field not entered`);
        return res.send(`Please enter all fields!`)
    }

    const existUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existUser){
        return res.send(`User already exists!`)
    }

    // console.log(`req.files = ${req.file.avatar}`);

    const avatarPath = req?.file?.path

    console.log(`avatar path ${avatarPath}`);

    if(!avatarPath){
        return res.send(`Not uploaded profile`)
    }

    const avatarURL = await cloudinary_upload(avatarPath)

    if(!avatarURL){
        return res.send(`profile URL not received!`)
    }

    const userCreated = await User.create({
        username,
        email,
        fullname,
        password,
        avatar: avatarURL.secure_url
    })

    if(!userCreated){
        return res.send(`User not created!`)
    }

    console.log(`User created ${userCreated}`);

    return res
    .status(200)
    .json({"message":"Success!"})

} )

export {userRegister}