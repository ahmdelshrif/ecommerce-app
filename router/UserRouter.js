const express=require("express")
const validetoorerrors=require("../middelweres/validetorError")

const {getUservalidator
    ,creatUserErrors
    ,updateOneUserErrors
    ,DeleteOneUserErrors,updatepasswordUserErrors,updateloggedUserErrors
}=require("../utils/valdetor/UserVlidator")

const {getUser,CreatUser,
    getUsers,updateUser
    ,DeleteUser,resizeImage,uploadUserImages,updatePasswordUser,deactivateuser
    ,getloggeduser,upadateloggeduser,upadapasswordteloggeduser,deleteloggeduser
}=require("../services/userservices")

const aouthservices=require("../services/authservice")

const router=express.Router()

router.use(aouthservices.protect)


 router.route('/getme')
.get(aouthservices.protect,getloggeduser,
getUser)

router.route('/changemypassword')
.put(updatepasswordUserErrors,validetoorerrors,upadapasswordteloggeduser)

router.route('/updatemydate')
.put(updateloggedUserErrors,validetoorerrors,upadateloggeduser)
router.route("/deleteMyaccount").delete(deleteloggeduser)


router.use(aouthservices.allowTO(`admin`))
router.route('/')
.get(getUsers)
.post(uploadUserImages,resizeImage,creatUserErrors,validetoorerrors
 ,CreatUser)

router.route('/:id')
.get(getUservalidator,validetoorerrors,
getUser)
.put(uploadUserImages,resizeImage,updateOneUserErrors,validetoorerrors,
updateUser)
.delete(DeleteOneUserErrors,validetoorerrors,
DeleteUser).put(DeleteOneUserErrors,validetoorerrors,deactivateuser)

router.route('/changepassword/:id').put(updatepasswordUserErrors,validetoorerrors,updatePasswordUser)

module.exports=router  