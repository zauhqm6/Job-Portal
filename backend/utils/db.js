import mongoose from "mongoose";

const connectDB = async () => {
    const URI = "mongodb+srv://admin:admin1234@job.u22ia.mongodb.net/job?retryWrites=true&w=majority";


    try {
        await mongoose.connect(URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;