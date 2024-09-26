const express = require("express");
const translate  = require("node-google-translate-skidz");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
