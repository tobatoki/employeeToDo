const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345',
    port: 5433, // Replace with your PostgreSQL port
});

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Example API route to fetch data
app.all('/employees', async (req, res) => {
    try{
        if (req.method === 'GET') {
            const result = await pool.query('SELECT employeeID AS "employeeID", employeeName AS "employeeName" from employee');
            return res.json(result.rows);
        } 
        
        else if (req.method === 'POST') {
            const { employeeName } = req.body;
            const result = await pool.query('INSERT INTO Employee (employeeName) VALUES ($1) RETURNING *', [employeeName]);
            res.status(201).json(result.rows[0]);
        } 

        else if (req.method === 'DELETE') {
            const { employeeID } = req.body;
            const result = await pool.query('DELETE FROM Employee WHERE employeeID = $1 RETURNING *', [employeeID]);

            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.status(200).json(result.rows[0]);
        }
        
        else {
            return res.status(405).send('Method Not Allowed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.all('/:employeeID/list', async (req, res ) => {
    const employeeid  = req.params.employeeID;
    try {
        if (req.method === 'GET') {
            const result = await pool.query('SELECT * FROM list where employeeID = $1', [employeeid]);
            return res.json(result.rows);
        }

        else if (req.method === 'POST') {
            const { listname } = req.body;
            const result = await pool.query('INSERT INTO List (listname, employeeid) VALUES ($1, $2) RETURNING *', [listname, employeeid]);
            res.status(201).json(result.rows[0]);
        } 
        
        else if (req.method === 'DELETE') {
            const { listid } = req.body;
            const result = await pool.query(
                'DELETE FROM list WHERE listid = $1 AND employeeid = $2 RETURNING *',
                [listid, employeeid]
            );
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'List not found or not owned by employee' });
            } else {
                res.json(result.rows[0]);
            }
        } 
        
        else {
            res.status(405).json({ error: 'Method not allowed' });
        }
        
    } catch {
        console.error(err);
        res.status(500).send('Server Error');
    }
    
})
// app.all('/:employeeID/lists')

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
