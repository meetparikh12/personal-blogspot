const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}
const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'uploads/images')
    }, 
    filename: (req,file,cb)=> {
        const ext = MIME_TYPE[file.mimetype];
        cb(null, uuidv4() + '.' +ext)
    }
})
const fileUpload = multer({
    storage: fileStorage,
    limits: 5000000,
    fileFilter: (req,file,cb)=> {
       const isValid = !!MIME_TYPE[file.mimetype]; 
       let error = isValid ? null : new Error('Invalid Mime Type')
       cb(error, isValid);
    } 
})

module.exports = fileUpload;