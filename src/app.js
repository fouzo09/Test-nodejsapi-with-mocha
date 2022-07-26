const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app
 .use(cors())
 .use(bodyParser.json())
 .get('/', (req, res)=>{
    return res.status(200).json('OKAY');
 });

module.exports = app;