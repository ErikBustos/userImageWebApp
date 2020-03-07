const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../controllers/user.controller');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        console.log(username + password)
        let myUser= await userController.read(username,password);
        if(err) {return done(err); }
        if(!myUser)
            return done(null,false, {message: 'Incorrect credentials'});

        return done(null,myUser);
    }
  ));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });