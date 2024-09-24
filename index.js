const express = require("express");
const { Translate } = require("node-google-translate-skidz");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());



/*app.post("/traducir", (req, res) => {

    const {titulo, cultura, dinastia} = req.body.titulo;
    const textos = [titulo, cultura, dinastia].filter(texto => texto.trim() !== '')

    Promise.all(textos.map(texto => 
        new Promise((resolve, reject) => {
            translate({
                text: texto,
                source: 'en',
                target: 'es'
            }, (result) => {
                resolve(result.translation);
            });
        })
    ))
    .then(traducciones => {
        res.json({
            titulosTraducidos: traducciones
        });
    })
});
*/
app.get("/traducir/:texto", (req, res) => {
    
translate({
    text: req.params.texto,
    source: 'es',
    target: 'en'
  }, function(result) {
    res.json({traduccion: result.translation});
  });

});

app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

