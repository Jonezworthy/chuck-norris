module.exports = function jokesTest(server) {
    const testGoodJoke = {
        text: '[TEST] This is a test joke ' + new Date().valueOf().toString(), // this makes this text unique so it doesn't prompt overwrite
    };

    it('Should should create new jokes ok', async () => {
        const response = await server.post('/jokes').send(testGoodJoke);

        response.body.should.be.an.Object();
        response.body.status.should.be.equal('ok');
    });

    it('Should should find at least 1 joke', async () => {
        const response = await server.get('/jokes');

        response.body.should.be.an.Object();
        response.body.status.should.be.equal('ok');
        response.body.data.should.be.an.Array();
        response.body.count.should.be.a.Number();
        response.body.count.should.be.above(0);
    });

    it('Should be able to find the test joke in the database', async () => {
        const db = process.db.db('chucknorris');
        const storedJoke = await db.collection('jokes').findOne({ text: testGoodJoke.text });

        storedJoke._id.toString().length.should.be.above(10);
        process.testJokeId = storedJoke._id.toString();
    });

    it('Should be able to soft delete the joke', async () => {
        testGoodJoke.hidden = true;
        const response = await server.put('/jokes').send(testGoodJoke);

        response.body.should.be.an.Object();
        response.body.status.should.be.equal('ok');
    });

    it('Should be able to hard delete the joke', async () => {
        testGoodJoke.hidden = true;
        const response = await server.delete('/jokes?_id' + process.testJokeId);

        response.body.should.be.an.Object();
        response.body.status.should.be.equal('ok');
    });

}