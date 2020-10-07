
const express = require('express');
const path = require('path');
const multer = require('multer');
const { createBrotliCompress } = require('zlib');

const app = express();
app.use(express.static('public'));



//1) Permite a exibição de arquivos estáticos.
app.get('/image.jpg', (req, res) => {
  res.sendFile(`${__dirname}/public/image.jpg`);
});

app.get('/index.html', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

//2) Permite a realização de upload de arquivo enviado através do comando POST.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

app.post('/file_upload', upload.single('file'), (req, res) => {
  res.send('<h2>Upload realizado com sucesso!</h2>');
});

//3) Processa dados de um formulário enviados via comando GET.
app.get('/process_get', (req, res) => {
  const { first_name, last_name } = req.query;
  response = { first_name, last_name };
  
  res.send(JSON.stringify(response));
});

// 4) Suporta uma aplicação AJAX, que ao click de mouse em um botão, acessa um conjunto de
// dados em JSON e os exibe no lugar de um parágrafo em uma página HTML.
app.get('/ajax_get', (req, res) => {
  const jsonData = {
    "test": "deu certo", 
    "status": "200 ok", 
  };

  res.send(JSON.stringify(jsonData));
});

app.listen(8081, () => {
  console.log("Server running at http://localhost:8081");
});