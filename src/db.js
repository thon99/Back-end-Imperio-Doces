const mysql = require('mysql2/promise');

const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1111',
        database: 'imperiodoces'
    });
};

module.exports = createConnection;
