const express = require('express');
const router = express.Router();
const { pool } = require('../config/db'); // db.js から pool オブジェクトをインポート
const jwt = require('jsonwebtoken');

// ログイン処理
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const selectQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query(selectQuery, [email, password], (err, result) => {
        connection.release(); // プールから接続を解放する
        if (err) {
          console.error('Error retrieving user data:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        if (result.length === 0) {
          // 該当するユーザーが見つからない場合
          res.status(404).send('User Not Found');
          return;
        }
        // ユーザーが見つかった場合
        const user = result[0].name;
        const token = jwt.sign({ userId: user.user_id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token, user });
        console.log(token);
      });
    });
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// トークンの有効性を確認するエンドポイント
router.get('/checkToken', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // リクエストヘッダーからトークンを取得
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        res.status(200).json({ valid: true });
      }
    });
  } catch (error) {
    console.error('Error handling GET request:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
