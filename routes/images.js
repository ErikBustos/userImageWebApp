const router = require('express').Router();
const photoController = require('../controllers/photo.controller');

router.get('/images',  async (req, res) =>{
    let id = '5e63e43783199b32b02fa8f0';
    let user= 'Erik Bustos';
    let imgArray = await photoController.photosOfUser(id)
    res.render('userimages', {
        imgArray: imgArray,
        user: user
    });
});

module.exports = router;