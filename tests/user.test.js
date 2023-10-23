// tests/userController.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Registration', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/v1/users/Signup')
      .send({ name: 'test2', email: 'test2@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal({status:'ok'});
        done();
      });
  });

  it('should not register a user with an existing email', (done) => {
    chai.request(app)
      .post('/api/v1/users/Signup')
      .send({ name: 'Jane Doe', email: 'test2@example.com', password: 'newpassword' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('This email already exists.');
        done();
      });
  });
});
