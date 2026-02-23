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
 * /api/transfer:
 * post:
 * summary: Perform a fund transfer between two wallets
 * description: Executes the internal stored procedure to move funds.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * fromWalletId:
 * type: integer
 * toWalletId:
 * type: integer
 * amount:
 * type: number
 * format: float
 * responses:
 * 200:
 * description: Transfer request received (Does not guarantee DB success)
 * 500:
 * description: Database connection error
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