const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const app = express();
const {User} = require('./models/User');
const isLogged = require('./middleware/auth.middleware');
const todos = require('./utils/todo.data.json');
const SALT = 10;


app
 .use(cors())
 .use(bodyParser.json())
 .get('/users', async(req, res)=>{
    try{
        const users = await User.find({});
        return res.status(200).json(users);
    }catch(error){
        return res.status(400).json(error);
    }
 })
 .post('/user', async(req, res)=>{
    try {
        const cryptedPassword = await bcrypt.hash(req.body.password, SALT);
        const user = await User.create({...req.body, password: cryptedPassword});        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }    
 })
 .put('/user/:email', async (req, res)=>{
    try {
        const user = await User.updateOne({email: req.params.email}, req.body);        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
 })
 .delete('/user/:email', async(req, res)=>{
    try {
        const user = await User.findOneAndDelete({email: req.params.email});
        if(!user) throw new Error('Aucun utilisateur ne correspond.');
        return res.status(200).json(user);
    } catch (error) {
        return res.status(401).json(error);
    }
 })
 .post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email}); 

        if(user && (await bcrypt.compare(req.body.password, user.password))){
            const token = await jwt.sign({email: user.email}, process.env.PRIVATE_KEY);
            fs.writeFile(`${process.env.BASE_PATH}/src/utils/token.json`, JSON.stringify({token: token}), (err)=>{
                if(err) throw err;
            });
            return res.status(200)
                      .set({'x-token': token})
                      .json(user);
        }else{
            throw new Error('Aucun utilisateur ne correspond aux acces fournis');
        }  
    }catch(error){
        return res.status(401).json(error);
    }
 })
 .get('/todos', isLogged, (req, res)=>{
    return res.status(200).json(todos);
 });


module.exports = app;