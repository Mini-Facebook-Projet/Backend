const express = require('express')

//to check object id
const objectId = require('mongoose').Types.ObjectId

const comment = require('../models/CommentModel')

// get All comments
// exports.getAllComments =(req, res) => {
//     comment.find()
//         .then(data => res.status(201).json(data))
//         .catch(err => console.log(err))
// }

// return comments by post id and with a limit if defined
exports.getCommentsByPost = (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "ID is not valid"
        });
    }
    const limit = parseInt(req.query.limit, 10);

    if (!isNaN(limit) && limit > 0) {
        // Si le paramètre limit est défini et valide, limitez le nombre de commentaires
        comment.find({ post: req.params.id }).limit(limit)
            .then(data => {
                if (data.length > 0) {
                    res.json(data);
                } else {
                    // Aucun commentaire trouvé, renvoyer un tableau vide
                    res.json([]);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: "Internal server error"
                });
            });
    } else {
        // Si le paramètre limit n'est pas défini ou n'est pas valide, listez tous les commentaires
        comment.find({ post: req.params.id })
            .then(data => {
                if (data.length > 0) {
                    res.json(data);
                } else {
                    // Aucun commentaire trouvé, renvoyer un tableau vide
                    res.json([]);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: "Internal server error"
                });
            });
    }
}
// Obtenir le nombre de commentaires par poste
exports.getCommentsCountByPost = (req, res) => {
    const postID = req.params.postID;

    // Compter le nombre de commentaires associés à un poste spécifique
    comment.countDocuments({ post: postID })
        .then(commentCount => {
            res.json({ commentCount });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        });
}

// Create comments
// router.post('/create', (req, res) => {
//     comment.create(req.body)
//         .then(data => res.send(data))
//         .catch(err => console.log(err))
// })
exports.createComment=(req, res) => {
    // Insérez le commentaire dans la base de données
    comment.create(req.body)
        .then(data => {
            // Si l'insertion est réussie, comptez le nombre de commentaires associés à ce poste
            comment.countDocuments({ post: data.post })
                .then(commentCount => {
                    // Renvoyez le nombre total de commentaires en réponse
                    res.status(201).json({ comment: data, commentCount });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ error: 'Bad request' });
        });
}
