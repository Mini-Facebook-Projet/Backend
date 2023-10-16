
## In this version of our project, i add poste crud but to link this with the front you need to handle poste author;
##post Model:
    {
    content : {type : String},
    imageUrl : {type : String},
    likeNumber : {type : Number},
    dislikeNumber : {type : Number},
    commentNumber : {type : Number},
    author:{type : Number},

    }
## i use also some packages:
-mongoose : to handle the data base
-body-parse : as midleware to parse requeste bodies
-nodemon : to handle node server instade of node 
-express : to make the dev a litle bit easy then code with node

### To run the serveur 
nodemon index.js

### Don't forget to install packages
npm i


 // "test": "echo \"Error: no test specified\" && exit 1",
 Security steps :
 1-project structure
 2-register new user 
 3-Authentification d'un utilisateur
 4. Middleware d'authentification
 5. Routes protégées :
 6. Tests :
 7. Expiration des tokens
 8. Réinitialisation de mot de passe oublié
 9. Historique de connexion
 10. Sécurité de la base de données