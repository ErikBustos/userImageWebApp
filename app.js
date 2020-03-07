const express = require('express');
const hbs = require('express-handlebars');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const path = require('path');

const loginRouter = require('./routes/login');
const uploadRouter = require('./routes/upload');
const imagesRouter = require('./routes/images')

const userController= require('./controllers/user.controller');
const photoController= require('./controllers/photo.controller');

require('./config/passport-setup');

let app = express();

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, './views/layouts')
}));

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'hbs');

app.use(cookieSession({
  maxAge: 24 * 60 *60 * 1000,
  keys:['clave']
 }))

app.use(passport.initialize());
app.use(passport.session());

app.use(loginRouter);
app.use(uploadRouter);
app.use(imagesRouter);

app.get('/hola', async (req, res) =>{
  let email = 'erik@gmail.com';
  let password = 'erik';
  res.json(await userController.read(email,password));
})

app.get('/userphotos',async (req,res) =>{
  let id = '5e63e43783199b32b02fa8f0';
  res.json(await photoController.photosOfUser(id));
})

app.post('/testAuth', 
  passport.authenticate('local', {successRedirect: '/upload',
                                  failureRedirect: '/faill'}))

app.get('/', (req, res) => {
    res.render('home',
    {
        title: 'title'
    }
    )
  });
  
  app.listen(3000,()  =>{
    console.log('Example app listening on port 3000!');
  });
  