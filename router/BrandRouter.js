
const express=require("express")
const validetoorerrors=require("../middelweres/validetorError")

const {getBrandvalidator
    ,creatBrandErrors
    ,updateOneBrandErrors
    ,DeleteOneBrandErrors,
}=require("../utils/valdetor/BrandVlidator")

const {getBrands,CreatBrands,
    getBrand,updateBrand
    ,DeleteBrand,resizeImage,uploadBrandImages
}=require("../services/BrandService")
const aouthservices=require("../services/authservice")


const router=express.Router()


router.route('/')
.get(getBrands)
.post(aouthservices.protect,aouthservices.allowTO('admin','manager'),uploadBrandImages,resizeImage,creatBrandErrors,validetoorerrors,CreatBrands)

router.route('/:id')
.get(getBrandvalidator,validetoorerrors,getBrand)
.put(uploadBrandImages,resizeImage,updateOneBrandErrors,validetoorerrors,updateBrand)
.delete(DeleteOneBrandErrors,validetoorerrors,DeleteBrand)

module.exports=router   