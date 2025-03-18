const cError=(status,message)=>{
const error =new Error(message);
error.status=status
Error.captureStackTrace(error,cError)
return error;

}
export default cError