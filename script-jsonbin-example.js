// VÍ DỤ CODE SỬ DỤNG JSONBin.io
// Copy phần này vào script.js và thay thế function submitWish

// ============================================
// BƯỚC 1: Lấy Bin ID và API Key từ jsonbin.io
// ============================================
// 1. Truy cập: https://jsonbin.io
// 2. Đăng ký/Đăng nhập
// 3. Tạo bin mới
// 4. Copy Bin ID và API Key
// 5. Điền vào dưới đây:

const JSONBIN_BIN_ID = "69403be243b1c97be9f03720"; // Thay bằng Bin ID của bạn
const JSONBIN_API_KEY =
  "$2a$10$bo9OkFHFUuaFDqm/xyXFguOnmX6k/ExP3nyZXtcBcMfgdV9wJ1/Jq"; // Thay bằng API Key của bạn

// ============================================
// BƯỚC 2: Function submitWish với JSONBin.io
// ============================================

async function submitWish(wish, name) {
  const resultDiv = document.getElementById("wish-result");
  resultDiv.classList.remove("show", "success", "error");

  // Lấy danh sách điều ước hiện tại
  const currentWishes = getWishesFromLocalStorage();
  const newWish = {
    id: Date.now(),
    name: name,
    wish: wish,
    timestamp: new Date().toLocaleString("vi-VN"),
    date: new Date().toISOString(),
  };
  currentWishes.push(newWish);

  try {
    // Gửi đến JSONBin.io
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": JSONBIN_API_KEY, // Hoặc "X-Access-Key" nếu là public bin
        },
        body: JSON.stringify({
          wishes: currentWishes,
          lastUpdated: new Date().toISOString(),
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      // Lưu vào localStorage
      saveWishToLocalStorage(wish, name, {
        jsonbinId: data.metadata?.id,
        version: data.metadata?.version,
      });

      // Cập nhật danh sách hiển thị
      displayWishesList();

      const viewUrl = `https://jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
      resultDiv.innerHTML = `
                <h3 style="color: #4CAF50; margin-bottom: 10px;">✅ Gửi thành công!</h3>
                <p>🎅 Ông già Noel đã nhận được điều ước của bạn!</p>
                <p><strong>${name}</strong> muốn nhận: <strong>${wish}</strong></p>
                <p style="margin-top: 15px; font-size: 0.9rem; color: #FFD700;">💾 Đã lưu vào bộ nhớ trình duyệt (localStorage)</p>
                <p style="margin-top: 10px; font-size: 0.9rem; color: #4CAF50;">☁️ Đã lưu lên server (JSONBin.io)</p>
                <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                    <p style="font-size: 0.85rem; margin-bottom: 8px; color: #FFD700;"><strong>📋 Cách xem dữ liệu:</strong></p>
                    <p style="font-size: 0.8rem; margin: 5px 0;">1. <strong>Trên trang web:</strong> Click "👁️ Xem Điều Ước" ở phía dưới</p>
                    <p style="font-size: 0.8rem; margin: 5px 0;">2. <strong>Xem trên server:</strong> <a href="${viewUrl}" target="_blank" style="color: #4ECDC4; text-decoration: underline; font-weight: bold;">🔗 Xem tất cả dữ liệu tại đây</a></p>
                    <p style="font-size: 0.8rem; margin: 5px 0;">3. <strong>Trong Console:</strong> Mở F12 → Console → Gõ: <code style="background: rgba(0,0,0,0.3); padding: 2px 5px; border-radius: 3px;">localStorage.getItem('christmasWishes')</code></p>
                </div>
            `;
      resultDiv.classList.add("show", "success");

      console.log("✅ Điều ước đã được lưu:", {
        name: name,
        wish: wish,
        jsonbinResponse: data,
        viewUrl: viewUrl,
        allWishes: currentWishes,
      });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lưu lên server");
    }
  } catch (error) {
    console.error("Lỗi khi gửi điều ước:", error);

    // Vẫn lưu vào localStorage ngay cả khi API lỗi
    saveWishToLocalStorage(wish, name, null);
    displayWishesList();

    resultDiv.innerHTML = `
              <h3 style="color: #FFA500; margin-bottom: 10px;">⚠️ Lưu cục bộ thành công</h3>
              <p>Không thể kết nối đến server, nhưng điều ước đã được lưu vào bộ nhớ trình duyệt.</p>
              <p><strong>${name}</strong> muốn nhận: <strong>${wish}</strong></p>
              <p style="margin-top: 10px; font-size: 0.9rem; opacity: 0.8;">Lỗi API: ${error.message}</p>
              <p style="margin-top: 10px; font-size: 0.9rem; color: #FFD700;">💾 Đã lưu vào bộ nhớ trình duyệt (localStorage)</p>
              <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                  <p style="font-size: 0.85rem; margin-bottom: 8px; color: #FFD700;"><strong>📋 Cách xem dữ liệu:</strong></p>
                  <p style="font-size: 0.8rem; margin: 5px 0;">1. <strong>Trên trang web:</strong> Click "👁️ Xem Điều Ước" ở phía dưới</p>
                  <p style="font-size: 0.8rem; margin: 5px 0;">2. <strong>Trong Console:</strong> Mở F12 → Console → Gõ: <code style="background: rgba(0,0,0,0.3); padding: 2px 5px; border-radius: 3px;">localStorage.getItem('christmasWishes')</code></p>
              </div>
          `;
    resultDiv.classList.add("show", "success");
  }
}

// ============================================
// BƯỚC 3: Function để đọc dữ liệu từ JSONBin
// ============================================

async function loadWishesFromJSONBin() {
  try {
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`,
      {
        headers: {
          "X-Master-Key": JSONBIN_API_KEY,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const wishes = data.record?.wishes || [];

      // Cập nhật localStorage
      localStorage.setItem("christmasWishes", JSON.stringify(wishes));

      // Hiển thị lại danh sách
      displayWishesList();

      console.log("✅ Đã tải dữ liệu từ JSONBin.io:", wishes);
      return wishes;
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu từ JSONBin:", error);
  }
}

// Gọi function này khi trang load để đồng bộ dữ liệu
// document.addEventListener('DOMContentLoaded', () => {
//   loadWishesFromJSONBin();
// });
