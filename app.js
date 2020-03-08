const express = require('express');
const hbs = require('express-handlebars');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const http = require('http').createServer(app);  
const io = require('socket.io')(http);

const AuthRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const imagesRouter = require('./routes/images');

const photosController = require('./controllers/photo.controller');
const usersController = require('./controllers/user.controller');

require('./config/passport-setup');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}))

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, './views/layouts')
}));

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'hbs');

app.use(cookieSession({
  maxAge: 24 * 60 *60 * 1000,
  keys:[process.env.COOKIE_KEY]
 }))

app.use(passport.initialize());
app.use(passport.session());

app.use(AuthRouter);
app.use(uploadRouter);
app.use(imagesRouter);

app.get('/hello', (req,res)=>{
  res.json(req.user);
})

app.get('/',  async (req, res) => {
  res.render('home',{
    numberPhotos: await photosController.numberofPhotos(),
    numberUsers: await usersController.numberofUsers()
  });
    // if(req.user)
    //   res.redirect('/');
    // else
    //   res.redirect('/login');
  });

io.on('connection', (socket) =>{

  socket.on('upload',async (msg) => {
    io.emit('render', 'need to render');
    })
})

io.on('upload',(msg) => console.log(msg))
  
  http.listen(process.env.APP_PORT ,()  =>{
    console.log(`Example app listening on port ${process.env.APP_PORT}!`);
  });
  