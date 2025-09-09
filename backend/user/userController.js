// Get public profile info for any user
import User from "./userModules.js";
import * as factory from "../utils/crudFactory.js";

export const getUsers = factory.getAll(User);

export const updateUser = factory.updateDoc(User);

export const deleteUser = factory.deleteDoc(User);

export const getMe = async(req, res, next) =>{
  try{
    res.status(200).json({
      status: 'success',
      data:{
        user: req.user
      }
    })
  } catch(err){
    next(err);
  }
}
