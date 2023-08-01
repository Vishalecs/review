//require express
const express = require('express');
//assigining post
const port = 4001;
const app = express();

//require express-ejs-layout, it willl help in rendering the page.
const expressLayout = require('express-ejs-layouts');

//require DataBase
const db = require('./config/mongoose');

const bodyParcer = require('body-parser');

//creating session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

// requiring mongo-store, so that we can use the existing user even after server start
const MongoStore = require('connect-mongo');

// they are used for showing action notifications
const flash = require('connect-flash'); 
const flashMiddleWare = require('./config/flashMiddleware');
const userController = require('./controllers/user_controller');
userController.createSuperUser();
// For getting the output from req.body(it will parse the upcoming request to String or Arrays).
app.use(bodyParcer.urlencoded({extended:false}));
// For using the file in assets folder.
app.use(express.static('./assets'));


//Setting up the views engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayout);

// mongo store is used to store the sessioon cookie in the db
app.use(session({
    name: "ERS",
    secret: "12345",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://vishalecs:Vishal123321@cluster0.ded7prj.mongodb.net/review1',
        autoRemove: 'disabled'
    },
    (err)=>{
        console.log(err || 'connect-mongo setup ok')
    }
    )
}));

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Using Connect flash
app.use(flash());
app.use(flashMiddleWare.setFlash);

// setting up the router, following MVC structure.
app.use('/' , require('./routes/index'));




app.listen(port, function(err){
    if(err){
        console.log("Error in running the app.");
        return;
    }
    console.log("Server is up and running at port: "+ port);
});