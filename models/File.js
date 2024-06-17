// define schema here

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
    },
    tags:{
        type: String,
    },
    email:{
        type: String,
    }
});


// POST middleware - if you want to perform some action after an event then POST middleware is used

 fileSchema.post("save", async function(doc) {
    try{

        console.log("Doc: ", doc);
        // create a transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,             
            }
        });

        // send mail
        let info = await transporter.sendMail({
            from: `Sample Sender`,
            to: doc.email,
            subject: "You've uploaded some files on Cloudinary",
            html: `<h2>Hi there!</h2> <p>Your uploaded files are here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        });

        console.log("Info: ", info);

    } catch (err){
            console.error(err);
    }
 })


const File = mongoose.model("File", fileSchema);
module.exports = File;