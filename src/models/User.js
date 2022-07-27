const mongoose = require('mongoose');
const validator = require('validator');
const {model, Schema} = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'L\'adresse email est deja utilisée.'],
        validate:{
            validator: (value)=>{
                return validator.isEmail(value);
            },
            message: (props)=> `${props.value} n'est pas une adresse email valide.`
        },
        required: [true, 'L\'adresse email est obligatoire.']        
    },
    telephone:{
        type: String,
        unique: [true, 'Le numero de telephone est deja utilisé.'],
        validate:{
            validator: (value)=>{
                return true; //Ecrire des regex pour valider les numeros
            },
            message: (props)=> `${props.value} n'est pas un numero guineen valide`
        },
        required: [true, 'Le numero de telephone est obligatoire.']
    },
    prenom:{
        type: String,
        minLength: [3, 'Le prenom doit avoir au moins 3 caracteres'],
        maxLength: [12, 'Le prenom doit avoir au maximum 12 caracteres'],
        required: [true, 'Le prenom est obligatoire.']
    },
    nom:{
        type: String,
        minLength: [3, 'Le nom doit avoir au moins 3 caracteres'],
        maxLength: [10, 'Le nom doit avoir au maximum 10 caracteres'],
        required: [true, 'Le nom est obligatoire.']
    },
    password:{
        type: String,
        minLength: [6, 'Le mot de passe doit avoir au moins 6 caracteres'],
        required: [true, 'Le  mot de passe est obligatoire.']
    }
});

const User = model('User', UserSchema);
module.exports = { User };