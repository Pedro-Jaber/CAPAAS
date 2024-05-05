//* Dependencies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");

const { connectDB } = require("./model/dataBase");

//* Routers Imports
const capybaraAPI = require("./routers/routers_capybara_api");

//* Dotenv
dotenv.config();

//* App
const app = express();
const PORT = 5505; //TODO make as env variable

//* Connect to DB
connectDB();

//* Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Public
app.use(express.static("public"));

//* View Engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

//* Routes
app.get(["/", "/home"], (req, res) => {
  res
    .status(200)
    .send("Home <a href='/capybara/post-capybara'>/capybara/post-capybara</a>");
});

app.use("/capybara", capybaraAPI);

//TODO error 404

//* App Listen
//TODO connect to database before start
app.listen(PORT, () => {
  console.log("Server:\x1b[92m Online \x1b[0m");
  console.log("Port: " + PORT);
  console.log(`link: http://localhost:${PORT}`);
  console.log("->");
});
