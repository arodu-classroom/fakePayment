const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        transaction_id TEXT PRIMARY KEY,
        amount FLOAT,
        currency TEXT,
        description TEXT,
        reference TEXT,
        date DATETIME
    )`);
});

const insert = (transaction) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO transactions(transaction_id, amount, currency, description, reference, date) VALUES(?,?,?,?,?,?)`,
            [transaction.transaction_id, transaction.amount, transaction.currency, transaction.description, transaction.reference, transaction.date],
            (err) => {
                if (err) {
                    return reject(err);
                }
                console.log(`A row has been inserted with transaction_id: ${transaction.transaction_id}`);
                resolve();
            })
    });
}

const select = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM transactions WHERE transaction_id = ?`, [id], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        })
    });
}

const selectAll = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM transactions ORDER BY date DESC`, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    });
}

module.exports = {
    insert,
    select,
    selectAll,
};
