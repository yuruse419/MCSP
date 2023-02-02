const express = require('express');
const morgan = require('morgan');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'orion419',
    database: 'pets',
    password: '7265',
    port: 5433
})

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

const port = process.env.PORT || 3000;


// const fs = require('fs');
// const pets = require('./pets.json');



// get all
app.get('/pets', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM pets');

            res.send(result.rows);
        }
        catch(err) {
            res.status(500).json({error: err});
        }
});

app.get('/pets/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pets WHERE id=$1', [req.params.id]);

        if(result.rows.length === 0) {
            res.status(500).send({error: 'Non-existent ID'});
        }
        else {
            res.send(result.rows);
        }
    }
    catch(err) {
        res.status(500).json({error: err});
    }
});

app.post('/pets', async (req, res) => {
    try {
        const {age, kind, name} = req.body;

        await pool.query('INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3)', [age, kind, name]);

        res.send({age, kind, name});
    }
    catch(err) {
        res.status(500).json({error: err});
    }
});

app.patch('/pets/:id', async (req, res) => {
    try {
        const {age, kind, name} = req.body;

        /* 
        if all age, kind, and name do not exist:
            error

        if age exists:
            if typeof(age) !== 'number':
                error

        if kind exists:
            if typeof(kind) !== 'string':
                error

        if name exists:
            if typeof(name) !== 'string':
                error
        */
        
        if((!age && !kind && !name) || (age && typeof(age) !== 'number') || (kind && typeof(kind) !== 'string') || (name && typeof(name) !== 'string')) {
            res.status(500);
        } 
        else {
            let resp = '{';

            if(age) {
                await pool.query('UPDATE pets SET age = $1 WHERE id =$2', [age, req.params.id]);

                resp += age;
            }

            if(kind) {
                await pool.query('UPDATE pets SET kind = $1 WHERE id = $2', [kind, req.params.id]);

                if(resp.length > 1) {
                    resp += ', ';
                }

                resp += kind;
            }

            if(name) {
                await pool.query('UPDATE pets SET name = $1 WHERE id = $2', [name, req.params.id]);

                if(resp.length > 1) {
                    resp += ', ';
                }

                resp += name;
            }

            resp += '}';

            res.json(resp);
        }
    }
    catch(err) {
        res.status(500).json({error: err});
    }
});

app.delete('/pets/:id', async (req, res) => {
    try {
        const resp = await pool.query('SELECT * FROM pets WHERE id = $1', [req.params.id]);
        await pool.query('DELETE FROM pets WHERE id = $1', [req.params.id]);

        res.send(resp.rows);
    }
    catch(err) {
        res.json({error: err});
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});