const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));// Указываем Express использовать папку public

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});