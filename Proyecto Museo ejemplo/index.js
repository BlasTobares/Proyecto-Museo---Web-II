const express = require('express');
/*const { Translate } = require("node-google-translate-skidz");*/
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

/*
app.get("/traducir", (req, res) => {

    const titulo = req.body.titulo;
    const cultura = req.body.cultura;
    const dinastia = req.body.dinastia;

    translate({
        text: req.params.texto,
        source: 'en',
        target: 'es'
    }, function(result) {
    res.json({ textoTraducido : result.translation });
});
});
*/

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

