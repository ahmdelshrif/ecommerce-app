//module
const express=require("express")
const validetoorerrors=require("../middelweres/validetorError")

const {getcategooryvalidatorErrors
    ,creatcategoryErrors
    ,updateOnecategoryErrors
    ,DeleteOnecategoryErrors
}=require("../utils/valdetor/categoryvalidator")

const {getCategoryes,CreatCategoryes,
    getCategory,updatecategory
    ,Deletecategory
}=require("../services/CategoryServices")
const aouthservices=require("../services/authservice")

const router=express.Router()


//used
const subcategoryRouter=require("./subcategoryRouter")

router.use('/api/v1/category/:categoryid/subcategory',subcategoryRouter)

router.route('/')
.get(getCategoryes)
.post(aouthservices.protect,aouthservices.allowTO('admin','manager') ,creatcategoryErrors,validetoorerrors,CreatCategoryes)

router.route('/:id')
.get(getcategooryvalidatorErrors,validetoorerrors,getCategory)
.put(updateOnecategoryErrors,validetoorerrors,updatecategory)
.delete(DeleteOnecategoryErrors,validetoorerrors,Deletecategory)

module.exports=router