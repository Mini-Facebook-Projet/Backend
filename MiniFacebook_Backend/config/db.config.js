const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();


// CONNEXION A LA BASE DE DONNEES
/*mongoose.set("strictQuery", false)
const uri = "mongodb+srv://garba1:CIysSvBUM8lR80bI@minifacebookdb.mbdayov.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to mongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();*/

/*mongoose.connect('mongodb+srv://garba1:CIysSvBUM8lR80bI@minifacebookdb.mbdayov.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to mydatabase");
  });
  
mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error:", err);
});
  
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Mongoose connection closed");
      process.exit(0);
    });
});*/
