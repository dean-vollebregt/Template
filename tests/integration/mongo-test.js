const mongoose = require('mongoose');
const config = require('../../config.js');
const expect = require('chai').expect;
const User = require('../../models/user').User;

describe('User Model', function() {

    before(async function(){
        await mongoose.connect(config.connectionstring);
    });

    it('User.create() should create new user', async function() {

        let testUser = {
            email: "test@email.com",
            name: "test",
            favoriteWalk: "test walk",
            password: "testpassword"
        };

        await User.create(testUser, function (error, user) {
                expect(error).to.not.exist;
                expect(user.isNew).to.be.false;
        })
    });

    it('User.findOne() should find a given user', async function() {
        let result = await User.findOne({email: 'test@email.com'});
        expect(result.email).to.equal('test@email.com');
    });

    it('User should update a given user', async function() {

    });


    it('User should a delete a given user', async function() {

    });

    after(function(){
        mongoose.connection.close();
    });

});
