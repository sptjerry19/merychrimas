# 🔧 Hướng Dẫn Cấu Hình API Để Lưu Dữ Liệu Thực

Hiện tại code đang sử dụng `httpbin.org` để test. Để lưu dữ liệu thực sự trên server, bạn có thể sử dụng các API miễn phí sau:

## 1. JSONBin.io (Đơn giản nhất - Khuyến nghị)

### Cách setup:

1. Truy cập https://jsonbin.io
2. Đăng ký tài khoản miễn phí
3. Tạo một bin mới
4. Copy Bin ID và API Key

### Cập nhật code:

Trong file `script.js`, tìm function `submitWish` và thay thế phần fetch bằng:

```javascript
const BIN_ID = "YOUR_BIN_ID"; // Thay bằng Bin ID của bạn
const API_KEY = "YOUR_API_KEY"; // Thay bằng API Key của bạn

const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "X-Master-Key": API_KEY, // Hoặc "X-Access-Key" cho public bin
  },
  body: JSON.stringify({
    wishes: currentWishes,
  }),
});
```

### Xem dữ liệu:

- Truy cập: `https://jsonbin.io/v3/b/YOUR_BIN_ID`
- Hoặc qua dashboard tại jsonbin.io

---

## 2. MockAPI.io (Dễ setup)

### Cách setup:

1. Truy cập https://mockapi.io
2. Đăng ký tài khoản miễn phí
3. Tạo một project mới
4. Tạo resource mới (ví dụ: "wishes")
5. Copy API endpoint

### Cập nhật code:

```javascript
const response = await fetch("https://YOUR_PROJECT_ID.mockapi.io/wishes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: name,
    wish: wish,
    timestamp: new Date().toISOString(),
  }),
});
```

### Xem dữ liệu:

- GET request: `https://YOUR_PROJECT_ID.mockapi.io/wishes`
- Hoặc qua dashboard tại mockapi.io

---

## 3. Firebase Realtime Database (Mạnh mẽ nhất)

### Cách setup:

1. Truy cập https://firebase.google.com
2. Tạo project mới
3. Bật Realtime Database
4. Copy database URL và config

### Cập nhật code:

Cần thêm Firebase SDK vào HTML:

```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"></script>
```

Sau đó trong JavaScript:

```javascript
// Khởi tạo Firebase
const firebaseConfig = {
  // Config của bạn
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Lưu dữ liệu
database.ref("wishes").push({
  name: name,
  wish: wish,
  timestamp: new Date().toISOString(),
});
```

---

## 4. Supabase (PostgreSQL miễn phí)

### Cách setup:

1. Truy cập https://supabase.com
2. Tạo project mới
3. Tạo table "wishes" với columns: id, name, wish, created_at
4. Copy API URL và anon key

### Cập nhật code:

```javascript
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

const response = await fetch(`${SUPABASE_URL}/rest/v1/wishes`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
  body: JSON.stringify({
    name: name,
    wish: wish,
    created_at: new Date().toISOString(),
  }),
});
```

---

## 5. Google Sheets API (Đơn giản, dễ xem)

### Cách setup:

1. Tạo Google Sheet mới
2. Chia sẻ sheet với quyền "Anyone with the link can edit"
3. Copy Sheet ID từ URL
4. Sử dụng Google Apps Script để tạo API endpoint

---

## So sánh các API:

| API           | Miễn phí | Dễ setup   | Lưu thực sự | Xem dữ liệu |
| ------------- | -------- | ---------- | ----------- | ----------- |
| JSONBin.io    | ✅       | ⭐⭐⭐⭐⭐ | ✅          | Dashboard   |
| MockAPI.io    | ✅       | ⭐⭐⭐⭐   | ✅          | Dashboard   |
| Firebase      | ✅       | ⭐⭐⭐     | ✅          | Console     |
| Supabase      | ✅       | ⭐⭐⭐     | ✅          | Dashboard   |
| Google Sheets | ✅       | ⭐⭐       | ✅          | Sheet       |

---

## Lưu ý bảo mật:

⚠️ **KHÔNG** commit API keys vào Git!

- Sử dụng biến môi trường
- Hoặc lưu keys trong file riêng và thêm vào .gitignore

---

## Ví dụ code hoàn chỉnh với JSONBin.io:

```javascript
async function submitWish(wish, name) {
  const currentWishes = getWishesFromLocalStorage();
  const newWish = {
    id: Date.now(),
    name: name,
    wish: wish,
    timestamp: new Date().toISOString(),
  };
  currentWishes.push(newWish);

  try {
    const BIN_ID = "YOUR_BIN_ID";
    const API_KEY = "YOUR_API_KEY";

    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({
        wishes: currentWishes,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const viewUrl = `https://jsonbin.io/v3/b/${BIN_ID}`;
      // Hiển thị link để xem dữ liệu
      console.log("Xem dữ liệu tại:", viewUrl);
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
}
```
