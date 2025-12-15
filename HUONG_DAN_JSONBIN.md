# 🚀 Hướng Dẫn Nhanh - Setup JSONBin.io

## Bước 1: Tạo tài khoản JSONBin.io

1. Truy cập: **https://jsonbin.io**
2. Click **"Sign Up"** hoặc **"Login"** nếu đã có tài khoản
3. Đăng ký bằng email hoặc GitHub/Google

## Bước 2: Tạo Bin mới

1. Sau khi đăng nhập, click **"Create Bin"** hoặc **"New Bin"**
2. Đặt tên cho bin (ví dụ: "Christmas Wishes")
3. Bin sẽ được tạo và hiển thị Bin ID

## Bước 3: Lấy API Key

1. Vào **Dashboard** hoặc **Account Settings**
2. Tìm phần **"API Keys"** hoặc **"Master Key"**
3. Copy **Master Key** (bắt đầu bằng `$2b$10$...`)

## Bước 4: Cấu hình trong trang web

1. Mở trang web của bạn
2. Click nút **"⚙️ Cấu Hình JSONBin"** (ở phần danh sách điều ước)
3. Điền:
   - **Bin ID**: Dán Bin ID bạn đã copy
   - **API Key**: Dán Master Key bạn đã copy
4. Click **"💾 Lưu Cấu Hình"**
5. Nếu thành công, modal sẽ tự đóng sau 2 giây

## Bước 5: Sử dụng

Sau khi cấu hình xong:
- Mỗi khi có người nhập điều ước, dữ liệu sẽ tự động lưu lên JSONBin.io
- Bạn có thể xem dữ liệu tại link được hiển thị sau khi gửi
- Hoặc truy cập: `https://jsonbin.io/v3/b/YOUR_BIN_ID`

## Xem dữ liệu

### Cách 1: Qua link trong trang web
- Sau khi gửi điều ước, click link **"🔗 Xem tất cả dữ liệu tại đây"**

### Cách 2: Qua Dashboard JSONBin.io
- Đăng nhập vào jsonbin.io
- Vào Dashboard
- Click vào bin của bạn để xem dữ liệu

### Cách 3: Qua API
- GET request: `https://api.jsonbin.io/v3/b/YOUR_BIN_ID`
- Header: `X-Master-Key: YOUR_API_KEY`

## Lưu ý

- ✅ Bin ID và API Key được lưu trong localStorage của trình duyệt
- ✅ Dữ liệu được đồng bộ giữa localStorage và JSONBin.io
- ✅ Nếu không có internet, dữ liệu vẫn được lưu vào localStorage
- ⚠️ **KHÔNG** chia sẻ API Key với người khác
- ⚠️ API Key có quyền đọc/ghi, hãy bảo mật cẩn thận

## Gỡ cấu hình

Nếu muốn xóa cấu hình:
1. Mở Console (F12)
2. Gõ:
```javascript
localStorage.removeItem('jsonbin_bin_id');
localStorage.removeItem('jsonbin_api_key');
```
3. Refresh trang

## Troubleshooting

### Lỗi "HTTP 404"
- Kiểm tra lại Bin ID có đúng không
- Đảm bảo bin đã được tạo

### Lỗi "HTTP 401" hoặc "Unauthorized"
- Kiểm tra lại API Key (Master Key) có đúng không
- Đảm bảo đang dùng Master Key, không phải Access Key

### Lỗi "HTTP 403" hoặc "Forbidden"
- Kiểm tra quyền của API Key
- Đảm bảo bin không bị khóa

### Không thể kết nối
- Kiểm tra kết nối internet
- Kiểm tra CORS (nếu host trên server khác)
- Thử tạo bin mới và cấu hình lại

