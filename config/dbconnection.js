const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config({path:"Config.env"})

const DBConnection=()=>{
    mongoose.connect(process.env.Url_DB).then((Data)=>{
        console.log(`DataBase Connect: ${Data.connection.host}  `)
    }).catch((err)=>{
        console.error(`error DataBase:${err}`)
    })

}

module.exports=DBConnection


