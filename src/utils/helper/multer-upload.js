import multer from "multer"
import { UPLOAD } from "../../middleware/upload.middleware.js";

const UploadImg=multer({
   storage:multer.diskStorage({
    destination:(_req,file,cb)=>{
cb(null,UPLOAD);

    },
    filename:(_req,file,cb)=>{
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9)
        cb(null,`${file.originalname}-${uniqueSuffix}`)
    }
   }),
   fileFilter:(_req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }
    else{
        cb(new Error("Only images are allowed"),false )
    }
   },
})
export default UploadImg