import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: "dizo2ylm7",
    api_key: 631964359375334,
    api_secret: "mPVHHb1wJxS6cdb7KlP5scN1Nl4"
});
export default cloudinary;