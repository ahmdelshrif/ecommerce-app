const mongoose=require("mongoose")

const subCategorySchema= new mongoose.Schema({
    name:{
        type:String ,
        required:[true,"Categroy required"],
        unique:[true,"Category Must be uniqe"],
        minlength:[2,"too short Caregory name"],
        maxlength:[32,"too log category name"],
    },
    category: {
        type:mongoose.Schema.ObjectId,
        ref:"category",
        required:[true,`Categroy required`]

    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,
},{timestamps: true})


const SubcategorySechmaModel=  mongoose.model("subCategory",subCategorySchema)

module.exports=SubcategorySechmaModel