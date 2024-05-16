// app.js

const express = require('express');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const articleRouter = require('./routes/article');
const app = express();

// ユーザールーターの設定
app.use(express.json()); // JSONリクエストボディをパースするためのミドルウェア
app.use('/api', userRouter); // /userエンドポイントに対するリクエストをuserRouterで処理
app.use('/api', loginRouter);
app.use('/api', articleRouter);

// その他の設定やミドルウェアの追加

app.listen(3001, () => {
  console.log('Express server listening on port 3001');
});
