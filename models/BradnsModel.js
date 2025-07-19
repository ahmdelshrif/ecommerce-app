
const mongoose=require("mongoose")

const BrandsSchema= new mongoose.Schema({
    name:{
        type:String ,
        required:[true,"Brand required"],
        unique:[true,"Brand Must be uniqe"],
        minlength:[3,"too short Brand name"],
        maxlength:[32,"too log Brand name"],
    },
    slug:{
        type:String,
        lowercase:true,
    },

    image:String,
    
},{timestamps: true})


const BrandModel=  mongoose.model("Brand",BrandsSchema)

module.exports=BrandModel