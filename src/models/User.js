const mongoose = require('mongoose');
const validator = require('validator');
const {model, Schema} = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate:{
            validator: (value)=>{
                return validator.isEmail(value);
            },
            message: (props)=> `${props.value} n'est pas un email valide`
        },
        required: [true, 'L\'adresse email est obligatoire']        
    }
});

const User = model('User', UserSchema);
module.exports = { User };