import User from "./userModules.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import {promisify} from "util";

const signToken = (id) =>{
  return jwt.sign({id:id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const signIn = (user,statusCode,res) =>{
    const token = signToken(user.id);

    const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    res.cookie('jwt',token,cookieOptions);
    
    user.password = undefined;

    res.status(statusCode).json({
      status: 'success',
      token: token,
      user: user
    })
}


export const signUp = async (req,res,next) =>{
  try{
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      number:req.body.number,
      confirmPassword: req.body.confirmPassword
    })

    signIn(user,201,res);

  } catch(err){
    next(err)
  }
}

export const login = async (req,res,next) =>{
  try{

    const {email,password} = req.body;

    if(!email || !password){
      return next(new AppError('please provide email and password',400));
    }

    const user = await User.findOne({email:email}).select('+password');
    
    if(!user){
      return next(new AppError('This user does not exist',400));
    }
    const loggedPassword = password;

    const isCorrectPassword = await bcrypt.compare(loggedPassword,user.password);

    if(!isCorrectPassword){
      return next(new AppError('Incorrect password',400));
    }

    signIn(user,200,res);

  }catch(err){
    next(err);
  }
}

export const protect = async (req,res,next) =>{
  try{
    if(!req.cookies.jwt){
      return next(new AppError('You are not logged in'),400);
    }

    const token = req.cookies.jwt;

    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    
    if(!decoded){
      return next(new AppError('Invalid jwt'),400);
    }

    const user = await User.findOne({_id: decoded.id});
    if(!user){
      return next(new AppError('User no longer exists'),400);
    }

    req.user = user;
    next();
  }catch(err){
    next(err);
  }
}

export const restrictTo = (...roles) =>{
  return (req,res,next) => {
    if(!roles.includes(req.user.role)){
      return next(new AppError("User is not authorized to access this route",403));
    }
    next();
  }
}

