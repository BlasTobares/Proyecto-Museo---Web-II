const express = require("express");
const translate  = require("node-google-translate-skidz");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

await traduccion(objetos);

/*app.post("/traducir", (req, res) => {

    const {titulo, cultura, dinastia} = req.body;
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

/*app.get("/traducir/:texto", (req, res) => {
    
translate({
    text: req.params.texto,
    source: 'es',
    target: 'en'
  }, function(result) {
    res.json({traduccion: result.translation});
  });

});
*/

app.post('/translate', (req, res) => {
    const { text, targetLang } = req.body;

    translate({
        text: text,
        source: 'en', // Idioma de origen (Inglés)
        target: targetLang, // Idioma de destino (Español)
    }, (result) => {
        if (result && result.translation) {
            res.json({ translatedText: result.translation });
        } else {
            res.status(500).json({ error: 'Error al traducir el texto' });
        }
    });
});

app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

