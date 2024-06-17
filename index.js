// instantiate express server
const express = require("express");
const app = express();

// port number
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middlewares
// parses the request from req.body
app.use(express.json());
// enables the file upload functionality
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connection with DB
const db = require("./config/database");
db.connect();

// connection with cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route and mounting
const upload = require("./routes/FileUpload");
app.use('/api/v1/upload', upload);

// activate the server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});

app.get("/", (req,res) => {
    res.send(`<h1> This is Homepage</h1>`);
})
