const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); // Assurez-vous d'importer votre application correctement
const expect = chai.expect;

chai.use(chaiHttp);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI3YmE2MjM1ZjZhN2QwMDcyM2Q2MGUiLCJpYXQiOjE2OTc0OTczNzMsImV4cCI6MTcwMDA4OTM3M30.HNHEaJp-25SzGZDmngEAgtvtuM6_MSLx6IWQz4hX_Ws"


describe('Tests pour les commentaires', () => {
  it('Test pour la création d\'un commentaire avec succès', (done) => {
    // Envoyez une requête POST à l'endpoint de création de commentaire avec des données valides
    chai.request(app)
      .post('/api/v1/comments/create')
      .set('Authorization','Bearer ',token)
      .send({ content: 'Mon commentaire', postId: '652b3cbb2cc86d4e097090d6' })
      .end((err, res) => {
        // Vérifiez le statut de la réponse
        expect(res).to.have.status(201);
        // Vérifiez que la réponse contient les données du commentaire créé
        expect(res.body).to.be.an('object');
        // Vous pouvez ajouter d'autres assertions ici
        done();
      });
  });

  it('Test pour la création d\'un commentaire avec des données manquantes', (done) => {
    // Envoyez une requête POST à l'endpoint de création de commentaire avec des données manquantes
    chai.request(app)
      .post('/api/v1/comments/create')
      .set('Authorization','Bearer ',token)
      .send({ postId: '652b3cbb2cc86d4e097090d6' }) // Données manquantes
      .end((err, res) => {
        // Vérifiez le statut de la réponse
        expect(res).to.have.status(400);
        done();
      });
  });
});
