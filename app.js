require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
//const helmet = require('helmet');
const cors = require('cors');
const hsts = require('./middleware/hsts');
const mongoose = require('mongoose');
//const morgan = require('morgan');

// setup the logger
//app.use(morgan('combined', { stream: accessLogStream }))

//DB
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('DB connected...'));

// Middleware
//app.use(helmet());
app.use(cors({ origin: 'https://localhost:4200', optionsSuccessStatus: 200}))
app.use(express.json());
app.use(hsts);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

//Allow frontend to call backend
app.use((reg,res,next) =>{
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

//Listen
https
    .createServer(
        {
            key: fs.readFileSync('./Keys/privatekey.pem'),
            cert: fs.readFileSync('./Keys/certificate.pem'),
            passphrase: 'apds'
        },
        app
    )
    .listen(3000);