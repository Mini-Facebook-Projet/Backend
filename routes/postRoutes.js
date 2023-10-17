const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const authMiddleware = require('../middleware/authMiddleware');

// Route pour obtenir la liste de tous les postes
// router.get('/list', authMiddleware,postController.getAllPosts);

// // Route pour obtenir un poste par son ID
// router.get('/id/:id', authMiddleware, postController.getPostById);
// //
// router.get('/user/:userId',authMiddleware,postController.getPostByUserId)
// router.get('/likes/:postId/:userId', authMiddleware, postController.checkPostLikeByUser)

// // Route pour créer un nouveau poste
// router.post('/', authMiddleware, postController.createPost);

// router.put('/id/:id', authMiddleware, postController.updatePostById);


// //
// router.post('/:id/like', authMiddleware, postController.addLikeToPost);
// router.delete('/:id/like', authMiddleware, postController.deleteLikeToPost);

// router.delete('/:id', authMiddleware, postController.deletePostById);


router.get('/list',postController.getAllPosts);

// Route pour obtenir un poste par son ID
router.get('/id/:id', postController.getPostById);
//
router.get('/user/:userId',postController.getPostByUserId)
router.get('/likes/:postId/:userId', postController.checkPostLikeByUser)

// Route pour créer un nouveau poste
router.post('/',postController.createPost);

router.put('/id/:id', postController.updatePostById);


//
router.post('/:id/like', postController.addLikeToPost);
router.delete('/:id/like', postController.deleteLikeToPost);

router.delete('/:id', postController.deletePostById);


module.exports = router;