const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');


router.post('/articles', async (req, res) => {
  try {
    const { title, content, name } = req.body;
    // MySQLに記事を挿入するクエリを定義
    const query = 'INSERT INTO articles (title, content, name) VALUES (?, ?, ?)';
    
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query(query, [title, content, name], (err, result) => {
        connection.release(); // プールから接続を解放する
        if (err) {
          console.error('Error inserting data into database:', err);
          res.status(500).send('Error inserting data into database');
          return;
        }
        console.log('Article inserted successfully');
        const insertedId = result.insertId; // 挿入された記事のarticle_idを取得
        console.log('result:', result);
        const postData = { article_id: insertedId, title, content, name }; // レスポンスにuserNameを含める
        res.status(201).json(postData);
      });
    });
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).send('Internal Server Error');
  }
});


// 投稿一覧を取得するエンドポイント
router.get('/articles', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 5; // 1ページあたりの表示数
    const offset = (page - 1) * perPage;

    // MySQLから記事を取得するクエリを定義
    const query = `SELECT * FROM articles LIMIT ${perPage} OFFSET ${offset}`;

    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query(query, (err, results) => {
        connection.release(); // プールから接続を解放する
        if (err) {
          console.error('Error fetching articles:', err);
          res.status(500).send('Error fetching articles');
          return;
        }
        // 総ページ数を計算するために、全件数を取得するクエリを実行
        connection.query('SELECT COUNT(*) AS total FROM articles', (err, countResult) => {
          if (err) {
            console.error('Error fetching total article count:', err);
            res.status(500).send('Error fetching articles');
            return;
          }
          const totalArticles = countResult[0].total;
          const totalPages = Math.ceil(totalArticles / perPage);
          res.status(200).json({ data: results, total_pages: totalPages });
        });
      });
    });
  } catch (error) {
    console.error('Error handling GET request:', error);
    res.status(500).send('Internal Server Error');
  }
});


// 特定の記事を取得するエンドポイント
router.get('/articles/:article_id', async (req, res) => {
  try {
    const { article_id } = req.params;
    // MySQLから特定の記事を取得するクエリを定義
    const query = 'SELECT * FROM articles WHERE article_id = ?';
    
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      connection.query(query, [article_id], (err, results) => {
        connection.release(); // プールから接続を解放する
        if (err) {
          console.error('Error fetching article:', err);
          res.status(500).send('Error fetching article');
          return;
        }
        if (results.length === 0) {
          res.status(404).send('Article not found');
          return;
        }
        res.status(200).json(results[0]);
      });
    });
  } catch (error) {
    console.error('Error handling GET request:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
