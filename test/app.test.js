const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const should = require('should');
const User = require('../src/models/User');
const {existingUser, unexistingUser, getToken, newUser, userWithEmptyFields} = require('./seed');

const PORT = 5001;
require('dotenv').config();

before(()=>{
    mongoose.connect(process.env.MONGO_URI, 
        ()=>{app.listen(PORT)},
        (error)=>console.log(error));
});

describe('GET /users', ()=>{
    it(`Should return list of users`, (done)=>{  
        request(app)
            .get('/users')
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body).be.an.Array();
                done()
            });
    });
});

describe('POST /user', ()=>{
    it(`Should create a user`, (done)=>{
        request(app)
            .post('/user')
            .send(newUser)
            .end((err, res)=>{
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body).have.property('_id');
                should(res.body.email).be.exactly(newUser.email).and.be.a.String();
                should(res.body.password).not.be.exactly(newUser.password);
                done()
            });
    });

    it('Should return an error when required fields are empty', (done)=>{
        request(app)
            .post('/user')
            .send(userWithEmptyFields)
            .end((err, res)=>{
                should(res.status).be.exactly(400);
                done();
            });
    });

    it('Should return an error when email already exist', (done)=>{
        request(app)
            .post('/user')
            .send(newUser)
            .end((err, res)=>{
                should(res.status).be.exactly(400);
                done();
            });
    });

    it('Should return an error when phone already exist', (done)=>{
        request(app)
            .post('/user')
            .send(newUser)
            .end((err, res)=>{
                should(res.status).be.exactly(400);
                done();
            });
    });
});

describe('POST /login', ()=>{
    it(`Should login a user and return token`, (done)=>{
        request(app)
            .post('/login')
            .send(existingUser)
            .end((err, res)=>{
                should(res.status).be.exactly(200);
                should(res.header['x-token']).not.be.exactly(null);
                should(res.header['x-token']).be.a.String();
                done();
            }); 
    });

    it(`Should return 401 when credentials do not match`, (done)=>{
        request(app)
            .post('/login')
            .send(unexistingUser)
            .end((err, res)=>{
                should(res.status).be.exactly(401);
                should(res.header).not.have.property('x-token');                
                done();
            }); 
    });
});

describe('GET /todos', ()=>{
    it(`Should return todos list`, (done)=>{

        getToken().then((token)=>{   
            request(app)
                .get('/todos')
                .set('x-token', token)
                .end((err, res)=>{
                    should(res.status).be.exactly(200);
                    should(res.body).have.property('items'); 
                    should(res.body.items).be.an.Array();             
                    done();
                });
        }); 
    });

    it(`Should return an error if not authenticated`, (done)=>{

        token = null         
        request(app)
            .get('/todos')
            .set('x-token', token)
            .end((err, res)=>{
                should(res.status).not.be.exactly(200);               
                done();
            });
    });
});