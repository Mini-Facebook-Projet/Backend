const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Local
// Import db promise
const connectDb = require('./db.js');

// Import controllers routers
// const posteRoutes = require('./controllers/PostController.js');
// const commentRoutes = require('./controllers/CommentController.js');
const app = express();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes.js')
const commentRoutes = require('./routes/commentRoutes.js')

// Middleware to parse request body to JSON
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);

const config = require('./config/config.js')
const port = config.PORT

connectDb()
    .then(() => {
        console.log('Database connection succeeded');
        // Start the server
        app.listen(port, () => console.log('Server started on 8080'));
    })
    .catch((err) => console.log(err));

    module.exports = app;