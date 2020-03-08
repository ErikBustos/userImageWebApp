const router = require('express').Router();
const cloudinary = require('cloudinary');
const multer = require('multer');

const path = require('path');

const photoController = require('../controllers/photo.controller');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));        
    }
})

const fileFilter = (req, file , cb) => {
    if(file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(null, false);
        }
}

const uploadImage = multer({
    storage,
    limits: {fileSize: 10000000},
    fileFilter
})

router.post('/upload_cloud', uploadImage.single('image'), async (req, res) =>{
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    let imageInfo = {
        url: result.url,
        description: req.body.description,
        uploadDate: new Date(new Date().getTime()).toDateString(),
        fileName: req.file.originalname,
        userId: req.user.uid
    }
    await photoController.uploadPhoto(imageInfo)
    res.redirect('/images');
})

router.get('/upload',  (req, res) =>{
    res.render('upload');
});

module.exports = router;