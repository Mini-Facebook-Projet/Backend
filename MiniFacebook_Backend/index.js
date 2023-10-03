const express = require("express");
const mongoose = require('mongoose');
//const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
require('dotenv').config();
dotenv.config();

const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = 8080

// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json());

// Utilisation des routes utilisateur
app.use(cors());
app.use('/api/v1/', userRoutes);




// CONNEXION A LA BASE DE DONNEES
mongoose.set("strictQuery", false)
const uri = "mongodb+srv://abdessamadOLM:root@cluster0.lepfubn.mongodb.net/mini_facebook?retryWrites=true&w=majority"

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


