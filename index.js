//* Dependencies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
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
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  })
);

//* Public
app.use(express.static("public"));

//* View Engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

//* Routes
const Capybara = require("./model/model_capybara");
app.get(["/", "/home"], async (req, res) => {
  const data = await Capybara.aggregate([{ $sample: { size: 4 } }]).exec();
  const capcount = await Capybara.countDocuments();
  // console.log(data);
  // console.log(capcount);

  res.status(200).render("home", { data, capcount });
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
