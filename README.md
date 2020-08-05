# LINENotify demo

## 說明

這是一個簡單的 LINE Notify demo 專案
透過這專案, 您將學習到如何使用  LINE 提供的 Notify 功能進行推播, 作為 LINE 官方帳號後台推播的替代方案

- 優點:

  - 官方帳號免費推播有數量限制, LINE Notify 可不受這限制進行推播
  - LINE Notify 可應用於個人帳號/群組

- 缺點:
  - 用戶必須先進行訂閱, 與 LINE Notify 連動後才能收到推播
  - 推播訊息來源不是官方帳號, 而是來自 LINE Notify
  - 沒有像官方帳號的推播一樣有各式 filter 機制 (須自己幹)
  - 要自己 maintain access token

## 環境設定

### LINENotify 服務端

1. 服務登入

   前往下列網址, 並登入一般 LINE 帳號 (官方 LINE 帳號好像不能用)

   > https://notify-bot.line.me/zh_TW/

   依序填入必要資訊後下一步即可(callback url 網址可之後再更新, 這個步驟先亂打就好)

2. 取得 API 需要的資訊

   進到剛登入的 Notify 服務(之後 callback 也是在這更新), 取得

   - Client ID
   - Client Secret

### API 端

1. API 設定修改
   clone 本專案, 並修改 /routes/server.js

   修改 5~6 行的資訊, 將稍早取得的資訊填入

   ```javascript
   const clientId = '輸入lineNotify服務的clientId';
   const clientSecret = '輸入lineNotify服務的secret';
   ```

2. API 執行與發佈
   本次是以 local 環境進行 demo

- 產生 local 對外連結
  1. 安裝 ngrok (for Mac OS)
  ```bash
    brew cask install ngrok
  ```
  2. 運行 ngrok
     其中 http 後面跟的 port 是依照您 API 使用的 port 設定, 本次 demo 使用預設 3000 port
  ```bash
    ngrok http 3000
  ```
  執行後, console 視窗會出現 Forwarding 資訊,
  複製 https 的網址, 並回到 /routes/server.js,
  修改 redirectUri 資訊, 注意不用
  ```javascript
  const redirectUri = '輸入 ngrok 的 domain 網址';
  ```
- 安裝 dependency

  ```bash
  npm install
  ```

- 執行

  輸入下列指令執行程式,程式預設使用 3000 port

  ```bash
  node bin/www
  ```

### 官方 LINE 帳號端

訂閱連結設定

1. 創立商用帳號

   進入官方 LINE 後台管理介面 (https://account.line.biz/login), 如果沒創商用帳號可以先創, 是否為認證帳號隨意

2. 圖文訊息建立 (純 demo, 也可使用其他方式)
   登入後台並切換至主頁,點選圖文訊息選項建立圖文訊息

   - 標題隨意,

   - 訊息設定:選擇一個喜歡的版型, 為了簡單化,選擇自訂即可

   - 動作設定: 選擇連結並輸入下列網址,注意網址有兩個地方需要修改, 分別為

     - client_id : 請輸入前面步驟取得的 clientId

     - redirect_uri : 請輸入前面步驟 ngrok 取得的連結

```javascript
    https://notify-bot.line.me/oauth/authorize
    ?response_type=code
    &client_id=請修改我
    &redirect_uri=請修改我
    &scope=notify
    &state=demo
```

3. 使用圖文訊息

   同樣在主頁中, 點選自動回應訊息功能, 並建立

   標題隨意, 不另外指定日期, 關鍵字可設定也可不設定, 有設定的話只有命中關鍵字的時候才會回應, 在內容的部分, 選擇上面的圖文訊息, 並選擇在第二步驟建立的圖文訊息, 儲存變更即完成

   最後回到自動回應介面, 記得將 Default 的回應關掉,確保之後官方帳號會使用我們建立的預設回應方式進行回應

## 使用方式

### 用戶端

以上步驟設定完成後, 首先加入官方帳號好友
可在官方帳號後台主頁裡面, 點選加入好友選項, 該處有提供連結以及二維碼可掃描加入好友

完成加入好友後, 只要前面的設定有正常,在聊天視窗輸入任意文字送出後, 官方帳號則會自動回應圖文訊息

點選圖文訊息, 進入與 LINE Notify 連動的頁面, 此處需選擇 1 對 1 聊天的聊天室, 確認連動後關閉該視窗

### 服務端

直接在網址列呼叫我們現在運行的 API

> https://{ngrok產生的網址}/sendMessage?message={要送的內容}

若前面設定無誤, 此時用戶的 LINE Notify 會收到我們剛送出的內容, 即完成本次的 demo
