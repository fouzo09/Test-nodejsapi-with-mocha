const fs = require('fs');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const existingUser = {
    email: `devfouzo@mail.com`,
    password: '123456'
};

const unexistingUser = {
    email: `devfouzo@mail.com`,
    password: '12346'
};

const newUser = {
    email: `dev${getRndInteger(10, 10000)}@mail.com`,
    prenom: 'Mafouz',
    nom: 'DIALLO',
    telephone: `666000${getRndInteger(10, 10000)}`,
    password: '123456'
};


const userWithEmptyFields = {
    email: `dev${getRndInteger(10, 10000)}@mail.com`,
    prenom: '',
    nom: 'DIALLO',
    telephone: `666000${getRndInteger(10, 10000)}`,
    password: '123456'
};

const getToken = ()=>{

    return new Promise(function (resolve, reject) {
        fs.readFile(`${process.env.BASE_PATH}/src/utils/token.json`, function(err, data) {
            data = JSON.parse(data);
            resolve(data.token);
        });
    });    
}

module.exports = { existingUser, unexistingUser, getToken, newUser, userWithEmptyFields }