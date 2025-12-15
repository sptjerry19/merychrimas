# 🎄 Trang Web Giáng Sinh Noel

Trang web Giáng Sinh đẹp mắt với cây thông Noel, hộp quà tặng, và hiệu ứng tuyết rơi.

## ✨ Tính năng

- 🌲 **Cây thông Noel** với animation đẹp mắt
- 🎁 **Hộp quà tặng** trên cây - click để xem chi tiết
- 🧦 **Cái tất đặc biệt** - click để nhập điều ước
- ❄️ **Hiệu ứng tuyết rơi** tạo không khí Giáng Sinh
- 📋 **Danh sách quà tặng** với hình ảnh và mô tả
- 🔔 **Modal thông tin** hiển thị chi tiết món quà
- 🌐 **Tích hợp API** để lưu điều ước (sử dụng JSONPlaceholder)

## 🚀 Cách sử dụng

1. Mở file `index.html` trong trình duyệt web
2. Click vào các hộp quà trên cây hoặc trong danh sách để xem chi tiết
3. Click vào cái tất 🧦 để nhập điều ước của bạn
4. Điền thông tin và gửi điều ước - dữ liệu sẽ được gửi đến API

## 📁 Cấu trúc dự án

```
noel/
├── index.html      # File HTML chính
├── styles.css      # File CSS cho styling
├── script.js       # File JavaScript cho tương tác
└── README.md       # File hướng dẫn
```

## 🎨 Tính năng chi tiết

### Hộp quà

- 5 hộp quà với màu sắc khác nhau
- Click vào hộp quà để xem tên và hình ảnh
- Hover effect với animation

### Cái tất đặc biệt

- Click vào cái tất để mở modal nhập điều ước
- Nhập tên và món quà yêu thích
- Dữ liệu được gửi đến API JSONPlaceholder

### API Integration

- Sử dụng JSONPlaceholder API (miễn phí)
- Endpoint: `https://jsonplaceholder.typicode.com/posts`
- Method: POST
- Dữ liệu gửi: tên người dùng và món quà yêu thích

## 🛠️ Tùy chỉnh

### Thêm món quà mới

Chỉnh sửa mảng `giftsData` trong file `script.js`:

```javascript
const giftsData = [
  {
    id: 6,
    name: "Tên món quà",
    image: "URL hình ảnh",
    description: "Mô tả món quà",
  },
  // ...
];
```

### Thay đổi API

Chỉnh sửa function `submitWish` trong file `script.js` để sử dụng API khác.

## 📱 Responsive

Trang web được thiết kế responsive, hoạt động tốt trên cả desktop và mobile.

## 🎉 Chúc bạn Giáng Sinh vui vẻ!
