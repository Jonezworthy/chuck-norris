require('dotenv').config({ path: './.env' });
const supertest = require('supertest');
const should = require('should');
const https = require('https');
const testingURL = 'http://localhost:' + process.env.port;

const server = supertest.agent(testingURL); // For authenticated requests
const serverPublic = supertest.agent(testingURL); // For unauthenticated requests
const serverTTFAdmin = supertest.agent(testingURL); // For TTF Admin requests


const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

const connectApi = process.env.MONGODB_CONNECTION_STRING;

describe('System: (Setup)', () => {
    before(done => {
        MongoClient.connect(connectApi, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
            process.db = db;
            done();
        });
    });

    it('API Should be ready', done => {
        serverPublic.get('/').end((err, response) => {
            try {
                response.body.status.should.be.equal('ok', 'The API is not running! Please make sure you have nodemon or node running the API before running these tests.');
            } catch (err) {
                process.exit(0);
            }
            done();
        });
    })
}).timeout(5000);

describe('System: Jokes', () => {
    require('./steps/jokes.spec')(server);
});


describe('Able to finish', () => {
    it('Should be able to delete the test jokes we made', async () => {
        const db = process.db.db('chucknorris');
        const jokes = await db.collection('jokes');

        await jokes.deleteMany({ text: /^\[TEST\]/i });
    });

    it('Should be able to close the database connections', done => {
        process.db.close();
        done();
    });
    it('Should be able to exit the process', done => {
        done();
        setTimeout(() => {
            process.exit(0);
        }, 250);
    });
});