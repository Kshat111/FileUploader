const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Connected with DB successfully!"))
    .catch((err) => {
        console.log("Error in connceting with the DB");
        console.error(err);
        process.exit(1);
    });
};