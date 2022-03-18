const express = require('express')
const cors = require('cors');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



const app = express()
const port = 3500

app.use(express.static('public'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/nftUpload', upload.single('avatar'), function (req, res, next) {
  console.log(req.files)
  console.log(req.body)
  res.send('done')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
