const mongoose = require("mongoose");

const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL , {});
        console.log("MongoDb Connected");
    } catch (err) {
        console.log("Error while connecting MongoDb" , err);
        process.exit(1);
    }
};

module.exports = connectDB;