const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
var passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
var session = require("express-session");
var Auth0Strategy = require("passport-auth0");
var dotenv = require("dotenv");
const { clientOrigins } = require("./config/env.dev");

const app = express();

// Routes
require("./routes/api/user");
require("./routes/api/cart");
require("./routes/api/auth");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("Database connected...✅"))
  .catch((err) => console.error(err));

// app.use(helmet());
app.use(cors());
// app.use(express.json({ extended: false }));

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//  Use Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/auth", require("./routes/api/auth"));

//Set static folder
app.use(express.static(path.join("client/build")));

//Serve static assets if in productions
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...🚀`));
