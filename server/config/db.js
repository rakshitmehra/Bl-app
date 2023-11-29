import mongoose from "mongoose";

const connectToMongo = async () => {
    const res = await mongoose.connect(
        "mongodb+srv://rakshitmehra88:LkUjPi8p3EU4MOkG@blog-db.jtaoy10.mongodb.net/?retryWrites=true&w=majority"
    );
    if(res)
    {
        console.log("Connected Successfully");
    }
};

export default connectToMongo;