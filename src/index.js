const express = require("express");
const path = require("path");
const multer = require("multer");

// modulo que pega o nome original do arquivo
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/images"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// config
const app = express();

app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "public/images"),
  }).single("image")
);

// rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", (req, res) => {
  console.log(req.file);
  res.send("uploaded");
});

// porta
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
