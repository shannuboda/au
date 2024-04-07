const express = require("express");
const multer = require("multer");
const cors = require("cors");

var app = express();
app.use(cors()); // Allows incoming requests from any IP
// Generated with CLI

// Start by creating some disk storage options:
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  // Sets file(s) to be saved in uploads folder in same directory
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
  // Sets saved filename(s) to be original filename(s)
});

// Set saved storage options:
const upload = multer({ storage: storage });

app.post("/api", upload.array("files"), (req, res) => {
  // Sets multer to intercept files named "files" on uploaded form data
  let data = {ApplicationID:'12345699',}
//   console.log(req.body);
for (const [key, value] of Object.entries(req.body)) {
    data[key]=value;
  }
data['ReceiptPath'] = req.files[0].originalname;
  const options = {
    method: 'POST',
    headers: {Authorization: 'Bearer xau_ucuJHLz9N54FKlJIPlV1eGuaSXrJYPWC0', 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  };
  
  fetch('https://shannuboda-s-workspace-s7j279.us-east-1.xata.sh/db/augusta:main/tables/admission/data?columns=id', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));




console.log(data);
  console.log(req.files[0].originalname); // Logs any files
  res.json({ message: "File(s) uploaded successfully" });
});


app.listen(5000, function () {
  console.log("Server running on port 5000");
});
