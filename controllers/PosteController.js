const express = require('express')

//to check object id
const objectId = require('mongoose').Types.ObjectId
// roote to handle rootes and http request
const router = express.Router()

//get the model to find data
const Poste = require('../models/PosteModel')

// get All postes
router.get('/list',(req,res)=>{
    // console.log('request body :',req.body)
    Poste.find().sort({dateCreation:-1})
    .then(data => res.status(201).json(data))
    .catch(err => console.log(err))
})


// get poste by id
router.get('/id/:id',(req,res)=>{
    if(objectId.isValid(req.params.id) == false){
        res.status(400).json({
            error: " id is not valid"
        })
    }else{
        Poste.findById(req.params.id)
            .then(data => {
                if(data){
                    res.send(data)
                }else{
                    res.status(404).json({
                        error: " id not found"
                    })
                }
            })
            .catch(err => console.log(err))
    }
})

// create a poste
// router.post('/',(req,res)=>{
//     Poste.create(req.body)
//     .then(data => res.send(data))
//     .catch(err => console.log(err))
// })
// create a post and return posts list if success
router.post('/', (req, res) => {
  Poste.create(req.body)
      .then(data => {
          // Après l'insertion réussie, récupérez la liste complète des postes
          Poste.find().sort({dateCreation:-1})
              .then(postes => {
                  res.send(postes);
              })
              .catch(err => {
                  console.log(err);
                  res.status(500).json({ error: 'Internal server error' });
              });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: 'Internal server error' });
      });
});


// update poste by id
router.put('/:id',(req,res)=>{
    if(objectId.isValid(req.params.id) == false){
        res.status(400).json({
            error: " id is not valid"
        })
    }else{
        Poste.findByIdAndUpdate(req.params.id, req.body,{new:true})
            .then(data => {
                if(data){
                    res.send(data)
                }else{
                    res.status(404).json({
                        error: " id not found"
                    })
                }
            })
            .catch(err => console.log(err))
    }
})

// delete poste by id
router.delete('/:id',(req,res)=>{
    if(objectId.isValid(req.params.id) == false){
        res.status(400).json({
            error: " id is not valid"
        })
    }else{
        Poste.findByIdAndDelete(req.params.id)
            .then(data => {
                if(data){
                    res.send(data)
                }else{
                    res.status(404).json({
                        error: " id not found"
                    })
                }
            })
            .catch(err => console.log(err))
    }
})

//like and dislike parts

// Ajoutez un like à un poste
router.post('/:id/like', (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId; // L'ID de l'utilisateur

  if (!objectId.isValid(postId)) {
    return res.status(400).json({
      error: 'ID de poste non valide',
    });
  }

  if (!objectId.isValid(userId)) {
    return res.status(400).json({
      error: 'ID d\'utilisateur non valide',
    });
  }

  Poste.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: 'Poste non trouvé',
        });
      }

      if (!post.likes.includes(userId)) {
        // Si l'ID de l'utilisateur n'existe pas dans les likes, ajoutez-le
        post.likes.push(userId);
        console.log(`post : ${post._id} ; user :${userId} added at ${Date.now()}`)
      }

      post.save()
        .then((updatedPost) => {
          res.status(200).json({
            message: 'Like ajouté avec succès',
            likeCount: updatedPost.likes.length,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: 'Erreur lors de l\'ajout du like',
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Erreur lors de la recherche du poste',
      });
    });
});

// Supprime un like d'un poste
router.delete('/:id/like', (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId; // L'ID de l'utilisateur

  if (!objectId.isValid(postId)) {
    return res.status(400).json({
      error: 'ID de poste non valide',
    });
  }

  if (!objectId.isValid(userId)) {
    return res.status(400).json({
      error: 'ID d\'utilisateur non valide',
    });
  }

  Poste.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: 'Poste non trouvé',
        });
      }

      const userIndex = post.likes.indexOf(userId);
      if (userIndex > -1) {
        // Si l'ID de l'utilisateur existe dans les likes, supprimez-le
        post.likes.splice(userIndex, 1);
      }

      post.save()
        .then((updatedPost) => {
          res.status(200).json({
            message: 'Like supprimé avec succès',
            likeCount: updatedPost.likes.length,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: 'Erreur lors de la suppression du like',
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Erreur lors de la recherche du poste',
      });
    });
});
router.get('/likes/:postId/:userId', (req, res) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
  
    if (!objectId.isValid(postId) || !objectId.isValid(userId)) {
      return res.status(400).json({
        error: "ID is not valid"
      });
    }
  
    Poste.findById(postId)
      .then(post => {
        if (!post) {
          return res.status(404).json({
            error: "Post not found"
          });
        }
  
        const likeCount = post.likes.length;
        const userLiked = post.likes.includes(userId);
  
        res.status(200).json({
          likeCount,
          userLiked
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "Server error"
        });
      });
  });

// Get posts by user id
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;

  // Assurez-vous que l'ID de l'utilisateur est valide
  if (!objectId.isValid(userId)) {
    return res.status(400).json({
      error: 'ID d\'utilisateur non valide',
    });
  }

  Poste.find({ userId }) 
    .sort({ dateCreation: -1 })
    .then(data => {
      if (data.length === 0) {
        res.status(200).json([]);
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'Erreur lors de la recherche des postes de l\'utilisateur',
      });
    });
});

module.exports = router;
