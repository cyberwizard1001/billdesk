var { mongoose } = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


var pcController = require('./controllers/pcController.js');
var gameController = require('./controllers/gameController.js');
var softwareController = require('./controllers/softwareController.js');

var app = express();


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/pc', pcController);
app.use('/games', gameController);
app.use('/software', softwareController);