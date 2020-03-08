const router = require('express').Router();
const passport = require('passport');

router.get('/login',  (req, res) =>{
    res.render('login');
});

router.post('/login', 
  passport.authenticate('local', {successRedirect: '/images',
                                  failureRedirect: '/login',
                                  failureFlash:false}));

router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/login');
})

module.exports = router;