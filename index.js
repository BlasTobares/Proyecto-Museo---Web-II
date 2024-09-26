const express = require("express");
const translate  = require("node-google-translate-skidz");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

/*app.post("/traducir", (req, res) => {
    const { titulo, cultura, dinastia } = req.body;
    const textos = [titulo, cultura, dinastia].filter(texto => texto.trim() !== '');

    Promise.all(textos.map(texto => 
        new Promise((resolve, reject) => {
            translate({
                text: texto,
                source: 'en',
                target: 'es'
            }, (result) => {
                if (result.error) {
                    reject(result.error);
                } else {
                    resolve(result.translation);
                }
            });
        })
    ))
    .then(traducciones => {
        res.json({
            titulosTraducidos: {
                titulo: traducciones[0] || "",
                cultura: traducciones[1] || "",
                dinastia: traducciones[2] || ""
            }
        });
    })
    .catch(error => {
        res.status(500).json({ error: "Error en la traducción: " + error });
    });
});
*/

/*app.post('/traducir', (req, res) => {

    const { titulo, cultura, dinastia } = req.body;
    const textos = [titulo, cultura, dinastia].filter(texto => texto.trim() !== '')

    Promise.all(textos.map(texto => 
        new Promise((resolve, reject) => {
            translate({
                text: texto,
                source: 'en',
                target: 'es'
            }, (result) => {
                if (result.error) {
                    reject(result.error);
                } else {
                resolve(result.translation);
            }
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
app.post("/translate", (req, res) => {
    const { text } = req.body;

    translate({ text: text, target: 'es' }, (result) => {
        res.json({ translatedText: result.translatedText });
    });
});


app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






/*app.post("/traducir", (req, res) => {
    const { titulo, cultura, dinastia } = req.body;  
    const textos = [titulo, cultura, dinastia].filter(texto => texto.trim() !== '');

    Promise.all(textos.map(texto =>
        new Promise((resolve, reject) => {
            translate({
                text: texto,
                source: 'en',
                target: 'es'
            }, (err, result) => {
                if (err) {
                    reject(err);  // Manejo de error en la promesa
                } else {
                    resolve(result.translation);  // Retornar la traducción
                }
            });
        })
    ))
    .then(traducciones => {
        res.json({
            titulosTraducidos: traducciones  // Enviar las traducciones al frontend
        });
    })
    .catch(err => {
        console.error("Error en la traducción:", err);  // Log del error
        res.status(500).json({ error: 'Error al traducir', detalles: err });  // Respuesta en caso de error
    });
});
*/
// Iniciar el servidor
/*app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
*/
/*app.post("/traducir", (req, res) => {
    const { titulo, cultura, dinastia } = req.body;  
    const textos = [titulo, cultura, dinastia].filter(texto => texto.trim() !== '');

    Promise.all(textos.map(texto =>
        new Promise((resolve, reject) => {
            translate({
                text: texto,
                source: 'en',
                target: 'es'
            }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.translation);
                }
            });
        })
    ))
    .then(traducciones => {
        res.json({
            titulosTraducidos: traducciones
        });
    })
    .catch(err => {
        res.status(500).json({ error: 'Error al traducir', detalles: err });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
*/
/*await traduccion(objetos);

/*app.post("/traducir", (req, res) => {

    const { titulo, cultura, dinastia } = req.body;
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

/*app.post('/translate', (req, res) => {
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
*/

