const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/api/mobiles', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM mobiles');
    res.json(rows);
});

app.post('/api/mobiles', async (req, res) => {
    const { name, price, ram, storage } = req.body;
    await db.execute('INSERT INTO mobiles (name, price, ram, storage) VALUES (?, ?, ?, ?)', [name, price, ram, storage]);
    res.sendStatus(201);
});

app.put('/api/mobiles/:id', async (req, res) => {
    const { name, price, ram, storage } = req.body;
    await db.execute('UPDATE mobiles SET name=?, price=?, ram=?, storage=? WHERE id=?', [name, price, ram, storage, req.params.id]);
    res.sendStatus(200);
});

app.delete('/api/mobiles/:id', async (req, res) => {
    await db.execute('DELETE FROM mobiles WHERE id = ?', [req.params.id]);
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running: http://localhost:3000'));