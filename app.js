const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const app = express();


//MONGO SETUP
const db = require('./config/keys').MongoURI;

//CONNECT TO MONGO
mongoose.connect(db, {useNewUrlParser: true , useUnifiedTopology: true})

.then(()=> console.log('connected to mongodb'))
.catch(err => console.log(err));


//EJS
app.use(expresslayouts);
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: false}));



//routes

app.use("/",  require('./routes/index'));
app.use("/users",  require('./routes/users'));



app.listen(5000, console.log('server started on port 5000'));