//require the dependencies and modules
const config = require('config');
const mongoose = require('mongoose'); // mongoose for working on mongo db
const express = require('express'); // importing the express module.
const app = express(); // app will be used as name of the application.
// require routes of rest APIs made
const home = require('./routes/home'); // importing the home router for routing the paths for home page requests.
const disease = require('./routes/disease'); //importing the disease router for disease api
const nutrition = require('./routes/nutrition');//importing the nutrition route
const mentalhealth = require('./routes/mentalhealth');//for mental health .
const users = require('./routes/users');//for users 
const disorder_bot = require('./routes/disorder_bot');// routes for disorder bot
const auth = require('./routes/auth');//for login related work
//const { Exercise } = require('./models/nutrition');//
//const bodyParser = require('body-parser');


const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();




app.set('view engine','pug');
app.set('views','./views');


app.use(express.json());
app.use(cors());
app.use(cookieParser());   
app.use(express.urlencoded({extended : true}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended : true}));


app.use('/',home)
app.use('/index',home);// middleware router  
app.use('/disease',disease); // middleware router disease api 
app.use('/nutrition',nutrition); //middleware  router for nutrition api 
app.use('/mentalhealth',mentalhealth); //middleware router for mental health API 
app.use('/users',users); //for user post requests.
app.use('/m_bot',disorder_bot);
app.use('/auth',auth);
app.use('/send-msg',disorder_bot);
app.use(express.static('public'));

if(!config.get('jwtPrivateKey'))
    {
        console.error('FATALERROR : jwt privatekey not defined');
         process.exit(1);
    }

mongoose.connect('mongodb://localhost/medibot') // connection string for mongo db
    .then(()=>console.log('connected to db'))//debugging info to know whether connected or not
    .catch(err=>console.log('error while connecting to db : ',err))// if errr occurs 
 
const port = process.env.PORT || 3000  //setting the environment variable for the port else default 3000
    app.listen(port,()=>console.log(`listening on port ${port}`)); //debugging info.