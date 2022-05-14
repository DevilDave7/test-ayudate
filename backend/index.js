require('dotenv').config();
require('./Config/db');

const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.header("Access-Control-Allow-Headers", '*');
    res.header('Alow', 'GET,POST,PUT');
    next();
});

const user = require('./Routes/userRoute')

app.use('/api', user);

app.listen(process.env.PORT,()=>{
    console.log(`Server running ${process.env.PORT}`)
})