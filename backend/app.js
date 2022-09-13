const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("mongoose");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/users");
const app = express();
const dotenv = require("dotenv").config();
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.SECRET_KEY);

mongoose
  .connect(
    "mongodb+srv://france693:france693@cluster0.j8bhm1r.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// espress mongo sanitize
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  })
);
// helmet
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);

//Getting all contentType
app.use(express.json());

//header of the global acess of the api
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Racine de la routes d'authentification
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
module.exports = app;
