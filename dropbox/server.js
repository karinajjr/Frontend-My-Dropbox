const express = require('express');
const fileUpload = require('express-fileupload'); // Исправлено

const app = express();

app.use(fileUpload({
    createParentPath: true,
}));

app.post('/uplods', (req, res) => { // Исправлено
    if (!req.files || Object.keys(req.files).length === 0) { // Проверка на наличие файлов
        return res.status(404).json({ msg: 'No files uploaded'});
    }

    const file = req.files.file;

    if (!file) return res.json({ error: 'Incorrect input name' });

    const newFileName = encodeURI(Date.now() + '-' + file.name);

    file.mv(`${__dirname}./public/uplodes/${newFileName}`, err => {  // Исправлено путь
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      console.log('file was uploaded');
      
      res.json({
        fileName: file.name,
        filePath: `/uplodes/${newFileName}`,
      });
    }); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
