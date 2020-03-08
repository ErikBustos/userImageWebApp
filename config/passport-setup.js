const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../controllers/user.controller');

passport.use(new LocalStrategy({
    usernameField: 'emailLogin',
    passwordField: 'passwordLogin'
}, async (username, password, done) => {
        let myUser= await userController.read(username,password);
        if(!myUser)
            return done(null,false, {message: 'Incorrect email'});
        else{
          if(password == myUser.password){
            delete myUser.password;
            return done(null,myUser);
          } else
            return done(null,false, {message: 'Incorrect password'});
        }
    }
  ));

passport.serializeUser((user, done) =>{
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    let myUser = await userController.findbyEmail(email);
    if(myUser){
      done(null, myUser);
    } else{
      done(new Error(email + ' not found'), null)
    }
  });