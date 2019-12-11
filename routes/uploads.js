const multer = require('multer');
const path = require('path');

let result = {
    success: true,
    data: 'NONE',
    message: ""
}

// file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    // limits: { //크기 제한
    //     fileSize: 5*1024*1024
    // },
});

//will be using this for uplading
const upload = multer({ storage: storage });

module.exports = upload;