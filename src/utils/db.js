import mongoose from "mongoose";

//Mongo DB connection
const connect = async () => {

  console.log(`****************************\n If 0 not connected If 1 connected \n database connection state: ${mongoose.connections[0].readyState} \n*****************************`) 
  if (mongoose.connections[0].readyState) {
        // Already connected
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('*****************************\nMongoDB connected successfully\n*****************************');
  } catch (error) {
    throw new Error("*****************************\nConnection failed!\n*****************************");
  }


};

export default connect;

