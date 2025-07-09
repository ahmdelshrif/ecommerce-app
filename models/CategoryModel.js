
const mongoose=require("mongoose")

const CategorySchema= new mongoose.Schema({
    name:{
        type:String ,
        required:[true,"Categroy required"],
        unique:[true,"Category Must be uniqe"],
        minlength:[3,"too short Caregory name"],
        maxlength:[32,"too log category name"],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,
},{timestamps: true})


const SechmaModel=  mongoose.model("category",CategorySchema)

module.exports=SechmaModel