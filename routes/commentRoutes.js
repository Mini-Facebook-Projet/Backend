const express = require('express')
const router = express.Router()
const commentController = require('../controllers/CommentController')
const authMiddleware = require('../middleware/authMiddleware'); 


// get All comments
// router.get('/', authMiddleware,commentController.getAllComments)

// return comments by post id and with a limit if defined
// router.get('/postId/:id',authMiddleware,commentController.getCommentsByPost);
// // Obtenir le nombre de commentaires par poste
// router.get('/countByPost/:postID', authMiddleware,commentController.getCommentsCountByPost);

// router.post('/create', authMiddleware,commentController.createComment);

router.get('/postId/:id',commentController.getCommentsByPost);
// Obtenir le nombre de commentaires par poste
router.get('/countByPost/:postID',commentController.getCommentsCountByPost);

router.post('/create',commentController.createComment);

module.exports = router