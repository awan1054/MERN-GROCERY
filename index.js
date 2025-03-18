import app from "./src/config/express.js";
import connectDB from "./src/config/mongoose.js";
 const port=process.env.port??5000;

app.listen(port, ()=>{
    
    connectDB()

    console.log("server running at  http://localhost:"+port)
})