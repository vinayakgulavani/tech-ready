//add a row into table test of mysql database nodedb with express and bootstarp
function main() {
  let express = require("express");
  let app = express();
  let morgan = require("morgan");
  let db_con = require("./config/db.js");
  const cors = require("cors");
  const path = require('path');
  const mongoose = require("mongoose");

  //all routes
  let authRoutes = require('./routes/authRoute.js')
  let languageRoutes = require('./routes/languageRoute.js')
  let languageNotesRoutes = require('./routes/languageNotesRoute.js')
  let technologyRoutes = require('./routes/technologyRoute.js')
  let courseRoutes = require('./routes/coursesRoute.js')
  let courseNotesRoutes = require('./routes/courseNotesRoute.js')
  let courseVideoRoutes = require('./routes/courseVideoRoute.js')
  let courseMockTestRoutes = require('./routes/courseMockTestRoute.js')
  let languageMockTestRoute = require('./routes/languageMockTestRoute.js')
  let purchaseCourseRoute = require('./routes/purchaseCourseRoute.js')


  //database connection
  db_con();

  //dotenv 
  let dotenv = require("dotenv");
  dotenv.config();

  let port = process.env.PORT || 3000;

  //provide middle wares
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use("/upload", express.static(path.join(__dirname, "upload")));  // Correct Static Path
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // Correct Static Path
  app.use("/uploadVideos", express.static(path.join(__dirname, "uploadVideos")));  // Correct Static Path

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  app.get("/", (req, res) =>
    res.send(`Welcome to TECHREADY`)
  );

  //routes
  app.use('/auth', authRoutes);
  app.use('/language', languageRoutes);
  app.use('/language-notes', languageNotesRoutes);
  app.use('/technology', technologyRoutes);
  app.use('/course', courseRoutes);
  app.use('/course-notes', courseNotesRoutes);
  app.use('/course-video', courseVideoRoutes);
  app.use('/course-mocktest', courseMockTestRoutes);
  app.use('/language-mocktest', languageMockTestRoute);
  app.use('/purchase', purchaseCourseRoute);


  app.get("*", (req, res) =>
    res.send("Erorr : 404")
  );


  app.listen(port, function () {
    console.log(
      "Server is ready, please open your browser at http://localhost:%s",
      port
    );
  });
}

main();
