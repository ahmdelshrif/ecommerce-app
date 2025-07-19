
const synchandler=require("express-async-handler")
 // eslint-disable-next-line import/no-extraneous-dependencies
 const bycrpt=require("bcryptjs")
const ApiError=require("../utils/apiError")
const Apifeature=require("../utils/Apifeauture")

exports.DeleteOne = (model) => synchandler(async (req, res, next) => {
        const { id } = req.params;
        const doc = await model.findByIdAndDelete(id);
        if (!doc) {
            return next(new ApiError(`No document found for id ${id}`, 404));
        }
        res.status(200).json({ data: doc });
    });
    exports.deactivate = (model) => synchandler(async (req, res, next) => {
        const { id } = req.params;
        const doc = await model.findByIdAndUpdate(id,{active:false});
        if (!doc) {
            return next(new ApiError(`No document found for id ${id}`, 404));
        }
        res.status(200).json({ data: doc });
    });


exports.updateOne=(model) => synchandler(async (req, res, next) => {
    const doc =await model.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        phone:req.body.phone,
        emil:req.body.emil,
        profileImg:req.body.profileImg

    }
    ,{new:true})
    if(!doc){
        //res.status(404).json({msg :`No category by id ${id}`})
        return  next(new ApiError(`No document find this id ${req.params.id}`, 404))
    }   
        res.status(200).json({data:doc}) 
})




exports.updatePassword = (model) => synchandler(async (req, res, next) => {
    if (!req.body.password) {
      return next(new ApiError('Password is required', 400));
    }
  
    const hashedPassword = await bycrpt.hash(req.body.password, 12);
  
    const doc = await model.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword,
        passwordcahnageAt: Date.now()
       },
      { new: true }
    );
  
    if (!doc) {
      return next(new ApiError(`No document found with id ${req.params.id}`, 404));
    }
  
    res.status(200).json({ data: doc });
  });

exports.creatOne=(model) => synchandler(async (req, res, next) => {
   const document = await model.create(req.body);
 res.status(200).json({data:document})    
 }) 

exports.getOne=(model) => synchandler(async (req, res, next) => {
    const doc = await model.findById(req.params.id)
    if(!doc){
    return  next(new ApiError( `No document find this id ${req.params.id}`, 404 ))
    }   
        res.status(200).json({data:doc}) 
  }) 

 exports.getAll=(model,modelname=null) => synchandler(async (req, res, next) => {
     const documents=await model.countDocuments()
            const Apifeatures= new Apifeature( model.find(req.filterobj),req.query ).sort().search(modelname)
            .fields().filtring().pagenation(documents);

            const{pagenationResulte,mongoosequery}=Apifeatures
               const doc =await mongoosequery
               
            //. populate({path:'category' , select:"name -_id"})
            res.status(200).json({pagenationResulte,Resulte:doc.length, data:doc})
  })