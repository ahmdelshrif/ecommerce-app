const SechmaModel=require("./models/CategoryModel")

exports.findname=( (req,res,next)=>{
    const {id} = req.params
    SechmaModel.findById(id).then((category)=>{

       console.log(category)

    })
   
})