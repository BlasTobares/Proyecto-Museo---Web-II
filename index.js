const express = require("express");
/*const { Translate } = require("node-google-translate-skidz");*/
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

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

/*app.get("/traducir", (req, res) => {

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

app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

