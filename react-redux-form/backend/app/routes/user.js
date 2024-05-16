const express = require('express');
const router = express.Router();
const { pool } = require('../config/db'); // db.js から pool オブジェクトをインポート
const { v4: uuidv4 } = require('uuid');

//登録
router.post('/user', async (req, res) => {
  try {
    const { name, email, password, representative_image } = req.body;
    const userId = uuidv4(); // ランダムな user_id を生成
    const insertQuery = 'INSERT INTO users (user_id, name, email, password, representative_image) VALUES (?, ?, ?, ?, ?)';
    
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query(insertQuery, [userId, name, email, password, representative_image], (err, result) => {
        connection.release(); // プールから接続を解放する
        if (err) {
          console.error('Error inserting data into database:', err);
          res.status(500).send('Error inserting data into database');
          return;
        }
        console.log('Data inserted into database successfully');
        const userData = { userId, name, email, password, representative_image }; // ユーザーの情報全体をオブジェクトとして定義
        res.status(201).json(userData); // ユーザーの情報をレスポンスに含める
      });
    });
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ユーザー情報を取得するエンドポイント
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery = 'SELECT name, email, representative_image FROM users WHERE user_id = ?';
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query(selectQuery, [userId], (err, result) => {
        connection.release(); // プールから接続を解放する
        if (err) {
          console.error('Error retrieving user data:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        if (result.length === 0) {
          // ユーザーが見つからない場合は404を返すなどの処理を行う
          res.status(404).send('User Not Found');
          return;
        }
        const userData = result[0];
        // 画像データをBase64エンコードしてクライアントに返す
        const base64Image = Buffer.from(userData.representative_image, 'binary').toString('base64');
        const imageData = `data:image/jpeg;base64,${base64Image}`;
        userData.representative_image = imageData;
        res.json(userData);
      });
    });
  } catch (error) {
    console.error('Error handling GET request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ユーザー情報変更API
router.put('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name, email, password, representative_image } = req.body;

  try {
    pool.getConnection((err, connection) => { // getConnectionメソッドにコールバック関数を提供する
      if (err) {
        console.error('Error connecting to MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query('UPDATE users SET name = ?, email = ?, password = ?, representative_image = ? WHERE user_id = ?', [name, email, password, representative_image, userId], (err, result) => {
        connection.release(); // プールから接続を解放する
        if (err) {
          console.error('Error updating user:', err);
          res.status(500).json({ message: "Error updating user" });
          return;
        }
        const userData = { userId, name, email, password, representative_image };
        res.status(200).json(userData);
      });
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});


module.exports = router;
