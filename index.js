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

async function traduccion(objetos) {
    for (const element of objetos) {
      const promises = [];
  
      if (element.title) {
        let texto = element.title;
        promises.push(
          translate({
            text: texto,
            source: "en",
            target: "es",
          }).then((result) => {
            element.title = result.translation;
          })
        );
      }
  
      if (element.dynasty) {
        let texto = element.dynasty;
        promises.push(
          translate({
            text: texto,
            source: "en",
            target: "es",
          }).then((result) => {
            element.dynasty = result.translation;
          })
        );
      }
  
      if (element.culture) {
        let texto = element.culture;
        promises.push(
          translate({
            text: texto,
            source: "en",
            target: "es",
          }).then((result) => {
            element.culture = result.translation;
          })
        );
      }
  
      // todas las promesas de forma asincronica
      await Promise.all(promises);
    }
  }

app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

