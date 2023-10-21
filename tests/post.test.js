const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 
const expect = chai.expect;

chai.use(chaiHttp);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMxMGY1NmIwYzMxYjA5OTA2OTBhMTgiLCJpYXQiOjE2OTc3MjI1NDgsImV4cCI6MTcwMDMxNDU0OH0.246jFRp8hNptLtlupjnuEBKSegKEkzJoJzWxT8kbUQIeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMxMGY1NmIwYzMxYjA5OTA2OTBhMTgiLCJpYXQiOjE2OTc3MjI1NDgsImV4cCI6MTcwMDMxNDU0OH0.246jFRp8hNptLtlupjnuEBKSegKEkzJoJzWxT8kbUQI"

describe('Tests pour les postes', () => {
  it('Test pour la création d\'un poste avec succès', (done) => {
    // Envoyez une requête POST à l'endpoint de création de poste avec des données valides
    chai.request(app)
      .post('/api/v1/posts/')
      .set('Authorization',token)
      .send({ author:{id:'652dc64ef84aafc3c3fee6db',name:'test'}, content: 'Mon poste' })
      .end((err, res) => {
        // Vérifiez le statut de la réponse
        expect(res).to.have.status(201);
        // Vérifiez que la réponse contient les données du poste créé
        expect(res.body).to.be.an('object');
        // Vous pouvez ajouter d'autres assertions ici
        done();
      });
  });

  it('Test pour la création d\'un poste avec des données manquantes', (done) => {
    // Envoyez une requête POST à l'endpoint de création de poste avec des données manquantes
    chai.request(app)
      .post('/api/v1/posts/')
      .set('Authorization',token)
      .send( {author:{id:'652dc64ef84aafc3c3fee6db',name:'test'}}) // Données manquantes
      .end((err, res) => {
        // Vérifiez le statut de la réponse
        expect(res).to.have.status(400);
        done();
      });
  });
});
