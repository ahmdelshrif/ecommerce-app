const express=require("express")
const validetoorerrors =require("../middelweres/validetorError")
const {subcreatcategoryErrors
      ,getsubcategoryvalidatorErrors
      ,updateOnesubcategoryErrors
      ,DeleteOnesubcategoryErrors
    }=require("../utils/valdetor/subcategoryvalidator ")

const {CreatsubCategoryes
      ,getsubCategoryes
      ,getsubCategory
      ,updatesubcategory
      ,Deletesubcategory
      ,creatcaregroyfromsubcategory
      ,filterobject , resizeImage ,uploadSubcategoryImages
}=require("../services/subcategoryservice")
const aouthservices=require("../services/authservice")

const router=express.Router({mergeParams:true})

router.route('/')
.get(filterobject,getsubCategoryes)
.post(aouthservices.protect,aouthservices.allowTO('admin','manager'),uploadSubcategoryImages,resizeImage,creatcaregroyfromsubcategory , subcreatcategoryErrors,validetoorerrors,CreatsubCategoryes)

router.route('/:id')
.get(getsubcategoryvalidatorErrors,validetoorerrors,getsubCategory)
.put(uploadSubcategoryImages,resizeImage,updateOnesubcategoryErrors,validetoorerrors,updatesubcategory)
.delete(DeleteOnesubcategoryErrors,validetoorerrors,Deletesubcategory)

module.exports=router