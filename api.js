const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Open the database
let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database
    let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            return console.error(err.message);
        }

        if (row) {
            // If the user is found, send a success response
            res.json({ status: 'success', message: 'Logged in successfully' });
        } else {
            // If the user is not found, send an error response
            res.status(401).json({ status: 'error', message: 'Incorrect email or password' });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port http://127.0.0.1:${port}`));