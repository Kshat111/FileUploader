
# Project Overview

This project focuses on developing a backend system that accepts images or videos from clients, compresses them, uploads them to an Express server and Cloudinary, and sends a response email to the user.

## Architecture

The architectural details are outlined in the ps.png file.




## Account Requirements

You need to create accounts on the following platforms:
- Cloudinary
- MongoDB Atlas
- Postman

Additionally, create a less secure password for a Gmail account.



## Required NodeJS Packages

The following NodeJS packages are needed (ensure to use the latest versions):

- express
- nodemon
- nodemailer
- cloudinary
- dotenv
- express-fileupload
- mongoose

Install the above mentioned package using the following command:
```bash
  npm i <package_name>
```
## Steps to Run the Project
 

- Clone this repository to your local machine.
- Install all the required NodeJS packages.
- Open the project in an integrated terminal or PowerShell.
- Run the development server with the command: npm run dev.
- Make a POST request using Postman with the parameters  

```bash
{name, email, tags, imageFile}
```

to the local server at the route :
``` bash
http://localhost:4000/api/v1/upload/imageUpload
```
- Upon successfully sending the request, a response will be generated, and an email will be sent from MAIL_USER to the recipient specified in the request.