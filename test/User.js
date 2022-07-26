const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const should = require('should');
const User = require('../src/models/User');

const PORT = 5001;
require('dotenv').config();

before(()=>{
    mongoose.connect(process.env.MONGO_URI, 
        ()=>{app.listen(PORT)},
        (error)=>console.log(error));
});

beforeEach(async()=>{
    // const u = await User.deleteMany();
    // console.log(u)
});




describe('GET /users', ()=>{
    it(`Should return a user if created`, (done)=>{  
        request(app)
                .get('/users')
                .end((err, res)=>{
                    should(res.status).be.exactly(200).and.be.a.Number();
                    should(res.body).be.an.Array();
                    done()
                });
    });

    it(`Should return error email is empty`, (done)=>{
        done();    
    });

    it(`Should return error phone is empty`, (done)=>{
        done();    
    });

    it(`Should return error firstName is empty`, (done)=>{
        done();    
    });

    it(`Should return error lastName is empty`, (done)=>{
        done();    
    });

    it(`Should return error password is empty`, (done)=>{
        done();    
    });
});

describe('POST /user', ()=>{
    it(`Should return a user if created`, (done)=>{

        const user = {
            email: 'dev06@gmail.com',
            prenom: 'Mafouz',
            nom: 'DIALLO',
            telephone: '666000006',
            password: '123456'
        };

        request(app)
                .post('/user')
                .send(user)
                .end((err, res)=>{
                    should(res.status).be.exactly(200).and.be.a.Number();
                    should(res.body).have.property('_id');
                    should(res.body.email).be.exactly(user.email).and.be.a.String();
                    should(res.body.password).not.be.exactly(user.password);
                    done()
                });
    });

    it(`Should return error email is empty`, (done)=>{
        done();    
    });

    it(`Should return error phone is empty`, (done)=>{
        done();    
    });

    it(`Should return error firstName is empty`, (done)=>{
        done();    
    });

    it(`Should return error lastName is empty`, (done)=>{
        done();    
    });

    it(`Should return error password is empty`, (done)=>{
        done();    
    });
});

describe('PUT /user/:email', ()=>{
    it(`Should return a user if created`, (done)=>{
        done();        
    });

    it(`Should return error email is empty`, (done)=>{
        done();    
    });

    it(`Should return error phone is empty`, (done)=>{
        done();    
    });

    it(`Should return error firstName is empty`, (done)=>{
        done();    
    });

    it(`Should return error lastName is empty`, (done)=>{
        done();    
    });

    it(`Should return error password is empty`, (done)=>{
        done();    
    });
});