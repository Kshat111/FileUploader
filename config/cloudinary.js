// Cloudinary is a cloud-based media management platform that helps companies optimize
// and manage images, videos, and other media for delivery to any device or channel.

const cloudinary = require("cloudinary").v2;

require("dotenv").config();
exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
        console.log("Connected with Cloudinary");
    } catch (error){
        console.log(error);
    }
}