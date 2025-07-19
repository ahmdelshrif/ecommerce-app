//module
const express=require("express")
const validetoorerrors=require("../middelweres/validetorError")

const {createProductValidatorErrors,
    getProductValidatorErrors 
   ,updateProductValidatorErrors
    ,deleteProductValidatorErrors
}=require("../utils/valdetor/productsvalidetor")
const {getproducts,creatOne
    , getOneproduct
     ,updateproduct
    ,Deleteproduct,resizeImage,uploadproductsImages
}=require("../services/productsrvices")

const aouthservices=require("../services/authservice")

const router=express.Router()


router.route('/')
.get(getproducts)
.post(aouthservices.protect,aouthservices.allowTO('admin','manager'),uploadproductsImages,resizeImage,createProductValidatorErrors,validetoorerrors,creatOne)

router.route('/:id')
.get(getProductValidatorErrors,validetoorerrors,getOneproduct)
.put(uploadproductsImages,resizeImage,updateProductValidatorErrors,validetoorerrors,updateproduct)
.delete(deleteProductValidatorErrors,validetoorerrors,Deleteproduct)



module.exports=router