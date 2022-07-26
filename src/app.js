const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const {User} = require('./models/User');


app
 .use(cors())
 .use(bodyParser.json())
 .get('/users', (req, res)=>{
    return res.status(200).json('OKAY');
 })
 .post('/user', async(req, res)=>{
    try {
        const user = await User.create(req.body);
        if(!user) Promise.reject();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(401).json(error);
    }    
 })
 .put('/user/:id', (req, res)=>{

 })
 .delete('/user/:id', (req, res)=>{

 })
 .post('/auth', (req, res)=>{

 })
 .get('/todos', (req, res)=>{

 });


module.exports = app;