const express = require('express');
const multer = require('multer');
const app = express();

const PORT = process.env.PORT || 1337;

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.listen(PORT, () => {
    console.log(`Running server on PORT ${PORT}...`);
});

let image = '';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/images/`);
    },
    filename: function (req, file, cb) {
        image = `${Date.now()}-${file.originalname}`;
        cb(null, image);
    },
});

const upload = multer({ storage: storage });

const uploadSingleFile = upload.single('file');

const uploadFile = (req, res) => {
    res.json({
        fileName: `/images/${image}`,
    });
};

app.post('/upload', uploadSingleFile, uploadFile, (req, res) => {
    res.send('upload success');
});
