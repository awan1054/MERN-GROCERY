import path from "path"
import fs from "fs"

export const UPLOAD="upload"
const uploadPath=path.resolve(UPLOAD)

if(!fs.existsSync(uploadPath)){
fs.mkdirSync(uploadPath)
}

export default uploadPath