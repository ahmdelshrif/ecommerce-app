const mongoose=require("mongoose")

 // eslint-disable-next-line import/no-extraneous-dependencies
 const bycrpt=require("bcryptjs")

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true," name require"],
        trim:true
    },
   password:{
    type:String,
    require:[true," pass requre"],
    minlength:[6,"too short pass"]

   },
   passwordcahnageAt: Date,
   passcodehash:String,
   passcodexpir:Date,
   passwordRestvirfied:Boolean,
   emil:{
    type:String,
    unique:true,
    lowercase:true,
    require:[true," emil requre"],
   },
   phone:String,
   profileImg: String,
   role:{
    type:String, 
    enum:["user","admin","manager"],
    default:"user"
   },
   active:{
    type:Boolean,
    default:true
   }

},{timestamps: true})

UserSchema.pre(`save` , async function(next){
this.password=await bycrpt.hash(this.password,12)
next()  
}) 

const UserModel=mongoose.model("user",UserSchema)

module.exports=UserModel