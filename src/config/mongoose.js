import mongoose from "mongoose";
const connectionurl=process.env.dburl
const connectDB = async () => {
  try {
    console.log(" waiting for connection  to mongodb");
    await mongoose.connect(connectionurl);
  } catch (error) {
    console.log(error);
  }
};
mongoose.connection.on("connected", () => {
  console.log("mongodb connected successfully");
});
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

export default connectDB;
