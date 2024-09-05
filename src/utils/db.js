import mongoose from "mongoose";

//Mongo DB connection
const connect = async () => {
  
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('*****************************\nMongoDB connected successfully\n*****************************');
  } catch (error) {
    throw new Error("*****************************\nConnection failed!\n*****************************");
  }


};

export default connect;

