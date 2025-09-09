import mongoose from "mongoose";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'A user must have a name'],
    maxLength: 45
  },
  email: {
    type: String,
    required: [true,'A user must have an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true,'A user must have a password'],
    minLength: [8,'Password must be at least 8 characters'],
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true,'A user must confirm password']
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user','admin']
  },
  passwordChangedAt: Date,
  number : String
})



userSchema.methods.correctPassword = async function(enteredPassword,userPassword){
  return await bcrypt.compare(enteredPassword,userPassword)
}


userSchema.pre('save',async function(next){
  if(this.password !== this.confirmPassword){
    return(next(new AppError('Password and confirmPassword do not match')));
  }
  this.password = await bcrypt.hash(this.password,12);
  this.confirmPassword = undefined;
  next()
})





const User = mongoose.model('User',userSchema);

export default User;