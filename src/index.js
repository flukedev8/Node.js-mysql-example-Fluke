const express = require('express');
const morgan = require('morgan');


//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global Variables
app.use((req, res, next)=>{
    next();
})

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//Public


//Starting the server on backend
app.listen(app.get('port'), () =>{
    console.log('Server on port',app.get('port'));
})