const router = require('express').Router();
const photoController = require('../controllers/photo.controller');

router.get('/images',  async (req, res) =>{

    let user = req.user;
    if(!user) res.redirect('/login')
    else{

        let imgArray = await photoController.photosOfUser(user.uid);
        res.render('userimages', {
            imgArray: imgArray,
            user: user.name
        });
    }
});

module.exports = router;