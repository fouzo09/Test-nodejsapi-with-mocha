const app = require('./src/app');
const mongoose = require('mongoose');
const PORT = 5000;

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, 
    ()=>{app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))},
    (error)=>console.log(error));