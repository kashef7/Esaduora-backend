import AppError from "./AppError.js";

export const getAll = (Model) =>{
  return( async (req,res,next) =>{
  try{
  const docs = await Model.find();

  res.status(200).json({
    status: 'success',
    data: {
      data: docs
    }
  })
  }catch(err){
      next(err)
  }
  })
}

export const createDoc = (Model) =>{
  return(async (req,res,next) =>{
    try{
    const doc = await Model.create(req.body);
  
    res.status(200).json({
      status: 'success',
      data: {
        NewDocument: doc
      }
    })
    }catch(err){
      next(err);
    }
  })
}

export const updateDoc = (Model) =>{
  return(async (req,res,next) =>{
    try{
    const doc = await Model.findByIdAndUpdate(req.params.id,{content: req.body.content});

    
    if(!doc){
      return next(new AppError('There are no documents with that id',400))
    }
    res.status(200).json({
      status: 'success',
      data: {
        updatedDocument: doc
      }
    })
  }catch(err){
    next(err);
  }
})
}

export const deleteDoc = (Model) =>{
  return(async (req,res,next) =>{
    try{
      const doc = await Model.findByIdAndDelete(req.params.id);

      if(!doc){
        return next(new AppError('There are no document with that id',400))
      }

      res.status(204).json({
        status: 'success',
        data: null
      })
  }catch(err){
    next(err);
  }
})
}

export const getDoc = (Model) =>{
  return(async (req,res,next) =>{
    try{
      const doc = await Model.findOne({_id: req.params.id});

      if(!doc){
        return next(new AppError('There are no documents with that id',400))
      }

      res.status(200).json({
        status: 'success',
        data: {
          data: doc
        }
      })
  }catch(err){
    next(err);
  }
})
}