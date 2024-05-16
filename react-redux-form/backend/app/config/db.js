const mysql = require('mysql2');

// MySQL接続情報
const pool = mysql.createPool({
  host: 'mysql-server',
  user: 'root',
  password: 'password',
  port : 3306,
  database: 'redux_db',
  connectionLimit: 10 // 接続プールの最大接続数
});

// 接続プールの接続イベントを監視してログ出力
pool.on('connection', () => {
  console.log('Connected to MySQL database');
});

// ユーザーデータ取得関数
const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT user_id, name, email, password, token FROM users";
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

module.exports = { pool, getUsers };
