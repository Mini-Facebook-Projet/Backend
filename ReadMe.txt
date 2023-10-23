
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
nodemon index.js or npm start

### Don't forget to install packages
npm i
