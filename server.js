const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
});

app.listen(port, (error) => {
  if(error) {
    throw error;
  }
  console.log(`Server running on port ${port}`)
});