var express = require('express');
var router = express.Router();
const lineNotify = require('../src/lineNotify');

const clientId = '輸入lineNotify服務的clientId';
const clientSecret = '輸入lineNotify服務的secret';
const redirectUri = '輸入ngrok的domain網址';
const subscriptions = [];

// routes for LINE Notify
router.get('/', async function (req, res) {
  const code = req.query.code;
  const response = await lineNotify.getToken(code, redirectUri, clientId, clientSecret);
  const token = response.data.access_token;
  subscriptions.push(token);
  await lineNotify.sendNotify(token, '恭喜完成訂閱！');
  res.send('恭喜完成訂閱，請關閉此網頁！');
});

router.get('/sendMessage', async function (req, res) {
  try {
    const message = req.query.message;
    subscriptions.forEach((token) => {
      console.log('send');
      lineNotify.sendNotify(token, message);
    });
    res.send('推播訊息發送完成，請關閉此網頁！');
  } catch (error) {
    console.log('error');
  }
});

module.exports = router;
