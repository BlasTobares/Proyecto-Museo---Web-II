const express = require("express");
const translate  = require("node-google-translate-skidz");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

app.use(express.static('public'));
app.use(express.json());


app.post('/traducir', (req, res) => {

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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
