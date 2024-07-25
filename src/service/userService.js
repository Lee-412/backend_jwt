import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'website_jwt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const hashUserPassWord = (userPassWord) => {
    const hashPassWord = bcrypt.hashSync(userPassWord, salt);
    return hashPassWord;
}

const createNewUser = async (email, password, username) => {
    const connection = await pool.getConnection();

    let hashpass = hashUserPassWord(password);

    try {
        const [results] = await connection.query(
            `INSERT INTO users(email, password, username) VALUES (?, ?, ?)`,
            [email, hashpass, username]
        );
        console.log(results);
    } catch (err) {
        console.error('Error creating user:', err);
    }
    finally {
        connection.release();
    }
}

const getUserList = async () => {
    const connection = await pool.getConnection();
    let users = []
    try {
        const [results] = await connection.query(`SELECT * FROM users`);
        users = results;
        return users;
    } catch (err) {
        console.error('Error fetching user list:', err);
        return users;
    } finally {
        connection.release();
    }
}

export default {
    createNewUser,
    getUserList
}
