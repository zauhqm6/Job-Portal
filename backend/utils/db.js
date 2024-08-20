import mongoose from "mongoose";

const connectDB = async () => {
    const URI = "mongodb+srv://admin:admin1234@job.u22ia.mongodb.net/job?retryWrites=true&w=majority";


    try {
        await mongoose.connect(URI), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000,
        }.then(() => {
            console.log('Connected to MongoDB');
        })
    }

    catch (err) {
        console.error('Error connecting to MongoDB', err);
    };
}
export default connectDB;