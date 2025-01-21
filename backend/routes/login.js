const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../db/User');
dotenv.config();
exports.login=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username:username});
        if(!user){
            return res.status(401).json({message:'User not found'});
        }
        console.log(user);
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).json({message:'wrong password'});
        }
        const token=jwt.sign({
            userId:user._id, username:user.username
        },
        process.env.SECRET_KEY,
        {expiresIn:'1h'});
        console.log(token);
        res.status(200).json({token:token,
            message:'Login successfull'
        });
    }catch(e){
        res.status(500).json({
            message:'Internal Server Error'
        });
    }
}
