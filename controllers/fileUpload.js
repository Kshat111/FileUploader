// contains the logic for handling the file inputs, uploading to cloudinary, etc

const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


const MAX_VIDEO_SIZE_MB = 10;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB*1024*1024; 
const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB*1024*1024; 


// localFileUpload - this takes the user input of media and uploads on a path on the server
// its handler function is written below

exports.localFileUpload = async (req, res) => {
    try{
        // fetch file from request
        // 'file' should be the key in the form-data in postman while making a post request
        const file = req.files.file; // syntax... it is what it is
        console.log("Input file: ", file);

        // define the path on which file is to be uploaded
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`; // this will stores the image with current date and time as name on the server-side
        console.log("Path is: ", path);

        // add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        // successful response
        res.json({
            success: true,
            message: "File uploaded successfully on the server",
        })

    } catch (error) {
        console.log("Failed to upload file on the server");
        console.log(error);
    }
}



// first check if the image file type is supported or not
function isFileTypeSupported(type, supportedTypes) {
    // check if current 'type' is presemt in the 'supportedTypes' array or not using 'includes' method
    return supportedTypes.includes(type);
}



// upload to cloudinary
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("Temporary file path ", file.tempFilePath);

    // compress image size by lowering its quality
    if(quality) {
        options.quality = quality;
    }

    // detect the file type automatically
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}



// image upload handler
exports.imageUpload = async (req, res) => {
    try{
        // fetch data from req body
        const {name, tags, email} = req.body;
        // console.log(name, tags, email);
        const file = req.files.imageFile;
        // console.log(file);

        // image size limitation
        if (file.size > MAX_IMAGE_SIZE_BYTES) {
            return res.status(400).json({
                success: false,
                message: `File size exceeds the maximum limit of ${MAX_IMAGE_SIZE_MB} MB`,
            });
        }

        // validate the files
        const supportedTypes = ["jpeg", "jpg", "png", "webp", "svg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type: ", fileType);

        // file type not supported
        if(!isFileTypeSupported(fileType, supportedTypes)){
            // 400 - bad request
            return res.status(400).json({
                success: false,
                message: "File type is not supported",
            })
        }

        // file type supported -> upload it
        const response = await uploadFileToCloudinary(file, "filesFolderAxat");
        // console.log(response);

        // make the entry in the DB as well
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        // final step -> send response
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded'            
        })
        
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });
    }
}


// video upload handler
exports.videoUpload = async (req, res) => {
    try{
        // fetch the data
        const {name, email, tags} = req.body;
        const file = req.files.videoFile;
        // console.log(name, email, tags);
        // console.log(file);

        // video size limitation
        if (file.size > MAX_VIDEO_SIZE_BYTES) {
            return res.status(400).json({
                success: false,
                message: `File size exceeds the maximum limit of ${MAX_VIDEO_SIZE_MB} MB`,
            });
        }

        // validate the files
        const supportedTypes = ["mp4", "mov", "avi"];
        const fileType = file.name.split('.')[1].toLowerCase();

        // file type is not supported
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type is not supported",
            })
        }

        // file type is valid
        const response = await uploadFileToCloudinary(file, "filesFolderAxat");
        console.log(response);

        // create a DB entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        // send positive response
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded'            
        })

    } catch (err) {
        console.error(err);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });
    }
}



// image size reducer handler

exports.imageSizeReducer = async (req,res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        // console.log(name,tags,email);

        const file = req.files.imageFile;
        // console.log(file);

        //Validation
        const supportedTypes = ["jpeg", "jpg", "png", "webp", "svg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // file format supported 
        
        const response = await uploadFileToCloudinary(file, "filesFolderAxat", 90);
        console.log("response: ", response);

        // DB entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}