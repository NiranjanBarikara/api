const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();


app.get('/get_meta_data/:module_name/:screen_name', (req, res) => {
    const { module_name, screen_name } = req.params;
    const basePath = path.join(__dirname, 'src', 'ui-config', 'specification');
    const filePath = path.join(basePath, module_name, `${screen_name}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: 'Metadata not found for the given input.' });
        }

        const metadata = JSON.parse(data);
        res.json(metadata);
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
