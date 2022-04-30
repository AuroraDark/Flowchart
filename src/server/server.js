
const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs");
 
const app = express();
 
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.post("/upload", (req, res) => {
    // console.log("req:",req.body);

    fs.readFile('../data/c.json', function(err, data) {
        if(err){
            console.log('Error Read file:', err);
            res.status(500).send({ message: "File upload failed", code: 200 });
        } else {

          let c_loadData = JSON.parse(data.toString());

          c_loadData.map((data) => {
              if(data.id == req.body.id){
                  data.display = req.body.display;
              }
          });

          fs.writeFile('../data/c.json', JSON.stringify(c_loadData), (err) => {
              if (err) {
                  console.log('Error writing file:', err);
                  res.status(500).send({ message: "File upload failed", code: 200 });
              }else{
                  res.status(200).send({ message: "File Uploaded", code: 200 });
              }
          })
        }       
    });
});
 
app.listen(3001, () => {
  console.log("Server running successfully on 3001"); // npm start --port 3001
});
