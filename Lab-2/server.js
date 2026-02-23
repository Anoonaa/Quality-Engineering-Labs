require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// --- SWAGGER CONFIGURATION ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Buggy Bank Fintech API',
            version: '1.0.0',
            description: 'A sandbox API for QA testing. Warning: Intentionally contains data integrity flaws.'
        },
        servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }]
    },
    apis: ['./server.js'], // This tells Swagger to look in this file for @swagger comments
};
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// --- ROOT ROUTE (redirect to Swagger docs) ---
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// --- DB CONFIG ---
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: { encrypt: false, trustServerCertificate: true }
};

/**
 * @swagger
 * /api/wallets:
 *   get:
 *     summary: Get all wallets
 *     description: Returns a list of all wallets with their balances.
 *     responses:
 *       200:
 *         description: List of wallets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   WalletID:
 *                     type: integer
 *                     example: 1
 *                   OwnerName:
 *                     type: string
 *                     example: "Alice"
 *                   Balance:
 *                     type: number
 *                     example: 5000.00
 *       500:
 *         description: Internal Server Error
 */
app.get('/api/wallets', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Wallets');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/wallets/{id}:
 *   get:
 *     summary: Get wallet by ID
 *     description: Returns a single wallet by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The wallet ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Wallet details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 WalletID:
 *                   type: integer
 *                   example: 1
 *                 OwnerName:
 *                   type: string
 *                   example: "Alice"
 *                 Balance:
 *                   type: number
 *                   example: 5000.00
 *       404:
 *         description: Wallet not found
 *       500:
 *         description: Internal Server Error
 */
app.get('/api/wallets/:id', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('WalletID', sql.Int, parseInt(req.params.id))
            .query('SELECT * FROM Wallets WHERE WalletID = @WalletID');

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "Wallet not found" });
        }
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get transaction history
 *     description: Returns a list of all fund transfer transactions.
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TransactionID:
 *                     type: integer
 *                     example: 1
 *                   FromWalletID:
 *                     type: integer
 *                     example: 1
 *                   ToWalletID:
 *                     type: integer
 *                     example: 2
 *                   Amount:
 *                     type: number
 *                     example: 100.50
 *                   TransactionDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-02-23T10:30:00.000Z"
 *       500:
 *         description: Internal Server Error
 */
app.get('/api/transactions', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Transactions ORDER BY TransactionDate DESC');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/transfer:
 *   post:
 *     summary: Perform a fund transfer
 *     description: Executes the buggy stored procedure to move funds.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromWalletId:
 *                 type: integer
 *                 example: 1
 *               toWalletId:
 *                 type: integer
 *                 example: 2
 *               amount:
 *                 type: number
 *                 example: 100.50
 *     responses:
 *       200:
 *         description: Transfer processed
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
app.post('/api/transfer', async (req, res) => {
    const { fromWalletId, toWalletId, amount } = req.body;
    if (!fromWalletId || !toWalletId || amount === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('FromID', sql.Int, fromWalletId)
            .input('ToID', sql.Int, toWalletId)
            .input('Amount', sql.Float, amount)
            .execute('usp_PerformTransfer');

        res.status(200).json({ status: "Processed", amount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ API: http://localhost:${PORT}`);
    console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
});