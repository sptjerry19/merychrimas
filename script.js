// ============================================
// CẤU HÌNH JSONBin.io
// ============================================
// Để sử dụng JSONBin.io:
// 1. Truy cập https://jsonbin.io và đăng ký
// 2. Tạo bin mới
// 3. Copy Bin ID và API Key
// 4. Điền vào dưới đây hoặc để trống để nhập qua form

let JSONBIN_CONFIG = {
  BIN_ID: localStorage.getItem("jsonbin_bin_id") || "69403be243b1c97be9f03720",
  API_KEY: localStorage.getItem("jsonbin_api_key") || "$2a$10$bo9OkFHFUuaFDqm/xyXFguOnmX6k/ExP3nyZXtcBcMfgdV9wJ1/Jq",
};

// Function để lưu cấu hình JSONBin
function saveJSONBinConfig(binId, apiKey) {
  JSONBIN_CONFIG.BIN_ID = binId;
  JSONBIN_CONFIG.API_KEY = apiKey;
  localStorage.setItem("jsonbin_bin_id", binId);
  localStorage.setItem("jsonbin_api_key", apiKey);
  console.log("✅ Đã lưu cấu hình JSONBin.io");
}

// Kiểm tra xem đã có cấu hình JSONBin chưa
function hasJSONBinConfig() {
  return JSONBIN_CONFIG.BIN_ID && JSONBIN_CONFIG.API_KEY;
}

// Dữ liệu các món quà
const giftsData = [
  {
    id: 1,
    name: "Quần Áo",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
    description: "Quần áo thời trang đẹp và chất lượng cao",
  },
  {
    id: 2,
    name: "Trang Sức",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    description: "Trang sức lấp lánh và sang trọng",
  },
  {
    id: 3,
    name: "Khăn Quàng Cổ",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Khăn quàng cổ ấm áp và thời trang cho mùa đông",
  },
  {
    id: 4,
    name: "Giày",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Giày thể thao và giày thời trang đẹp mắt",
  },
  {
    id: 5,
    name: "Đồ Chơi",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Đồ chơi vui nhộn và đáng yêu cho mọi lứa tuổi",
  },
];

// Tạo hiệu ứng tuyết rơi
function createSnowflakes() {
  const snowContainer = document.querySelector(".snow-container");
  const snowflakeSymbols = ["❄", "❅", "❆", "✻", "✼", "✽"];

  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent =
      snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
    snowflake.style.left = Math.random() * 100 + "%";
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
    snowflake.style.animationDelay = Math.random() * 2 + "s";
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px";

    // Tạo drift ngẫu nhiên cho tuyết
    const drift = Math.random() * 200 - 100 + "px";
    snowflake.style.setProperty("--drift", drift);

    snowContainer.appendChild(snowflake);
  }
}

// Hiển thị danh sách quà
function displayGiftsList() {
  const giftsGrid = document.getElementById("gifts-grid");
  giftsGrid.innerHTML = "";

  giftsData.forEach((gift) => {
    const giftCard = document.createElement("div");
    giftCard.className = "gift-card";
    giftCard.innerHTML = `
            <img src="${gift.image}" alt="${gift.name}" loading="lazy">
            <h3>${gift.name}</h3>
            <p>${gift.description}</p>
        `;
    giftCard.addEventListener("click", () => showGiftModal(gift));
    giftsGrid.appendChild(giftCard);
  });
}

// Hiển thị modal thông tin quà
function showGiftModal(gift) {
  const modal = document.getElementById("gift-modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
        <div class="gift-detail">
            <h3>${gift.name}</h3>
            <img src="${gift.image}" alt="${gift.name}">
            <p style="font-size: 1.2rem; margin-top: 20px;">${gift.description}</p>
            <p style="margin-top: 15px; color: #FFD700; font-size: 1.5rem;">🎁 Chúc bạn nhận được món quà này! 🎁</p>
        </div>
    `;

  modal.classList.add("show");
}

// Đóng modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("show");
}

// Xử lý click vào hộp quà trên cây
function setupGiftClicks() {
  document.querySelectorAll(".gift").forEach((giftElement) => {
    giftElement.addEventListener("click", (e) => {
      const giftId = parseInt(giftElement.getAttribute("data-gift"));
      const gift = giftsData.find((g) => g.id === giftId);
      if (gift) {
        showGiftModal(gift);
      }
    });
  });
}

// Xử lý click vào cái tất
function setupSockClick() {
  const sock = document.getElementById("special-sock");
  sock.addEventListener("click", () => {
    const modal = document.getElementById("wish-modal");
    modal.classList.add("show");

    // Reset form
    document.getElementById("wish-form").reset();
    document
      .getElementById("wish-result")
      .classList.remove("show", "success", "error");
  });
}

// Lưu điều ước vào localStorage
function saveWishToLocalStorage(wish, name, apiResponse) {
  const wishes = getWishesFromLocalStorage();
  const newWish = {
    id: Date.now(),
    name: name,
    wish: wish,
    timestamp: new Date().toLocaleString("vi-VN"),
    apiResponse: apiResponse,
  };
  wishes.push(newWish);
  localStorage.setItem("christmasWishes", JSON.stringify(wishes));
  return newWish;
}

// Lấy danh sách điều ước từ localStorage
function getWishesFromLocalStorage() {
  const wishes = localStorage.getItem("christmasWishes");
  return wishes ? JSON.parse(wishes) : [];
}

// Xóa tất cả điều ước
function clearAllWishes() {
  if (confirm("Bạn có chắc chắn muốn xóa tất cả điều ước?")) {
    localStorage.removeItem("christmasWishes");
    displayWishesList();
    alert("Đã xóa tất cả điều ước!");
  }
}

// Hiển thị danh sách điều ước
function displayWishesList() {
  const wishesGrid = document.getElementById("wishes-grid");
  const wishes = getWishesFromLocalStorage();

  if (wishes.length === 0) {
    wishesGrid.innerHTML = `
            <div class="no-wishes">
                <p>📭 Chưa có điều ước nào được lưu</p>
                <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 10px;">Hãy click vào cái tất 🧦 để nhập điều ước của bạn!</p>
            </div>
        `;
    return;
  }

  wishesGrid.innerHTML = "";
  wishes.reverse().forEach((wish) => {
    const wishCard = document.createElement("div");
    wishCard.className = "wish-card";
    wishCard.innerHTML = `
            <div class="wish-card-header">
                <h3>🎁 ${wish.wish}</h3>
                <button class="delete-wish-btn" data-id="${
                  wish.id
                }" title="Xóa">🗑️</button>
            </div>
            <div class="wish-card-body">
                <p><strong>👤 Tên:</strong> ${wish.name}</p>
                <p><strong>⏰ Thời gian:</strong> ${wish.timestamp}</p>
                ${
                  wish.apiResponse
                    ? `<p><strong>🆔 API ID:</strong> #${wish.apiResponse.id} <a href="https://jsonplaceholder.typicode.com/posts/${wish.apiResponse.id}" target="_blank" style="color: #4ECDC4; text-decoration: none; margin-left: 5px;">🔗</a></p>`
                    : ""
                }
            </div>
        `;
    wishesGrid.appendChild(wishCard);
  });

  // Thêm event listener cho nút xóa từng điều ước
  document.querySelectorAll(".delete-wish-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const wishId = parseInt(
        e.target.closest(".delete-wish-btn").getAttribute("data-id")
      );
      deleteWish(wishId);
    });
  });
}

// Xóa một điều ước
function deleteWish(wishId) {
  const wishes = getWishesFromLocalStorage();
  const filteredWishes = wishes.filter((w) => w.id !== wishId);
  localStorage.setItem("christmasWishes", JSON.stringify(filteredWishes));
  displayWishesList();
}

// Gửi điều ước đến API JSONBin.io (API thực sự lưu dữ liệu)
async function submitWish(wish, name) {
  const resultDiv = document.getElementById("wish-result");
  resultDiv.classList.remove("show", "success", "error");

  // Kiểm tra xem đã có cấu hình JSONBin chưa
  if (!hasJSONBinConfig()) {
    // Hiển thị form để nhập cấu hình
    showJSONBinConfigModal();
    resultDiv.innerHTML = `
      <h3 style="color: #FFA500; margin-bottom: 10px;">⚠️ Chưa cấu hình JSONBin.io</h3>
      <p>Vui lòng nhập Bin ID và API Key từ JSONBin.io</p>
      <p style="margin-top: 10px; font-size: 0.9rem;">💡 <a href="https://jsonbin.io" target="_blank" style="color: #4ECDC4;">Tạo tài khoản tại đây</a></p>
    `;
    resultDiv.classList.add("show", "error");
    return;
  }

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
      `https://api.jsonbin.io/v3/b/${JSONBIN_CONFIG.BIN_ID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": JSONBIN_CONFIG.API_KEY,
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

      const viewUrl = `https://jsonbin.io/v3/b/${JSONBIN_CONFIG.BIN_ID}`;
      resultDiv.innerHTML = `
                <h3 style="color: #4CAF50; margin-bottom: 10px;">✅ Gửi thành công!</h3>
                <p>🎅 Ông già Noel đã nhận được điều ước của bạn!</p>
                <p><strong>${name}</strong> muốn nhận: <strong>${wish}</strong></p>
                <p style="margin-top: 15px; font-size: 0.9rem; color: #FFD700;">💾 Đã lưu vào bộ nhớ trình duyệt (localStorage)</p>
                <p style="margin-top: 10px; font-size: 0.9rem; color: #4CAF50;">☁️ Đã lưu lên server JSONBin.io</p>
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
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

// Hiển thị modal cấu hình JSONBin
function showJSONBinConfigModal() {
  const modal = document.getElementById("jsonbin-config-modal");
  if (modal) {
    modal.classList.add("show");
    // Điền giá trị hiện tại nếu có
    document.getElementById("jsonbin-bin-id").value = JSONBIN_CONFIG.BIN_ID;
    document.getElementById("jsonbin-api-key").value = JSONBIN_CONFIG.API_KEY;
  }
}

// Load dữ liệu từ JSONBin khi trang load
async function loadWishesFromJSONBin() {
  if (!hasJSONBinConfig()) {
    return;
  }

  try {
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${JSONBIN_CONFIG.BIN_ID}`,
      {
        headers: {
          "X-Master-Key": JSONBIN_CONFIG.API_KEY,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const wishes = data.record?.wishes || [];

      if (wishes.length > 0) {
        // Cập nhật localStorage với dữ liệu từ server
        localStorage.setItem("christmasWishes", JSON.stringify(wishes));
        displayWishesList();
        console.log("✅ Đã tải dữ liệu từ JSONBin.io:", wishes);
      }
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu từ JSONBin:", error);
  }
}

// Xử lý form điều ước
function setupWishForm() {
  const form = document.getElementById("wish-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const wish = document.getElementById("wish-input").value.trim();
    const name = document.getElementById("name-input").value.trim();

    if (wish && name) {
      await submitWish(wish, name);
    }
  });
}

// Setup nút xem điều ước
function setupWishesView() {
  const viewBtn = document.getElementById("view-wishes-btn");
  const wishesContent = document.getElementById("wishes-content");
  const clearBtn = document.getElementById("clear-wishes-btn");

  viewBtn.addEventListener("click", () => {
    const isHidden = wishesContent.style.display === "none";
    wishesContent.style.display = isHidden ? "block" : "none";
    viewBtn.textContent = isHidden ? "👁️ Ẩn Điều Ước" : "👁️ Xem Điều Ước";

    if (isHidden) {
      displayWishesList();
    }
  });

  clearBtn.addEventListener("click", clearAllWishes);
}

// Setup form cấu hình JSONBin
function setupJSONBinConfig() {
  const form = document.getElementById("jsonbin-config-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const binId = document.getElementById("jsonbin-bin-id").value.trim();
    const apiKey = document.getElementById("jsonbin-api-key").value.trim();
    const resultDiv = document.getElementById("jsonbin-config-result");

    if (!binId || !apiKey) {
      resultDiv.innerHTML = `
        <h3 style="color: #f44336; margin-bottom: 10px;">❌ Vui lòng điền đầy đủ thông tin</h3>
      `;
      resultDiv.classList.add("show", "error");
      return;
    }

    // Test kết nối
    try {
      const testResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        headers: {
          "X-Master-Key": apiKey,
        },
      });

      if (testResponse.ok || testResponse.status === 404) {
        // 404 là OK vì bin có thể chưa tồn tại
        saveJSONBinConfig(binId, apiKey);
        resultDiv.innerHTML = `
          <h3 style="color: #4CAF50; margin-bottom: 10px;">✅ Cấu hình thành công!</h3>
          <p>Đã lưu cấu hình JSONBin.io</p>
        `;
        resultDiv.classList.add("show", "success");

        // Đóng modal sau 2 giây
        setTimeout(() => {
          closeModal("jsonbin-config-modal");
          // Tải dữ liệu từ server nếu có
          loadWishesFromJSONBin();
        }, 2000);
      } else {
        const errorData = await testResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${testResponse.status}: ${testResponse.statusText}`
        );
      }
    } catch (error) {
      resultDiv.innerHTML = `
        <h3 style="color: #f44336; margin-bottom: 10px;">❌ Lỗi kết nối</h3>
        <p>Không thể kết nối đến JSONBin.io với thông tin này.</p>
        <p style="margin-top: 10px; font-size: 0.9rem; opacity: 0.8;">Lỗi: ${error.message}</p>
        <p style="margin-top: 10px; font-size: 0.9rem;">Vui lòng kiểm tra lại Bin ID và API Key</p>
      `;
      resultDiv.classList.add("show", "error");
    }
  });
}

// Khởi tạo khi trang load
document.addEventListener("DOMContentLoaded", () => {
  // Tạo tuyết rơi
  createSnowflakes();

  // Hiển thị danh sách quà
  displayGiftsList();

  // Hiển thị danh sách điều ước
  displayWishesList();

  // Tải dữ liệu từ JSONBin nếu đã cấu hình
  if (hasJSONBinConfig()) {
    loadWishesFromJSONBin();
  }

  // Setup các event listeners
  setupGiftClicks();
  setupSockClick();
  setupWishForm();
  setupWishesView();
  setupJSONBinConfig();

  // Nút mở modal cấu hình JSONBin
  const jsonbinConfigBtn = document.getElementById("jsonbin-config-btn");
  if (jsonbinConfigBtn) {
    jsonbinConfigBtn.addEventListener("click", () => {
      showJSONBinConfigModal();
    });
  }

  // Đóng modal khi click vào nút X
  document.getElementById("close-modal").addEventListener("click", () => {
    closeModal("gift-modal");
  });

  document.getElementById("close-wish-modal").addEventListener("click", () => {
    closeModal("wish-modal");
  });

  const closeJSONBinModal = document.getElementById("close-jsonbin-modal");
  if (closeJSONBinModal) {
    closeJSONBinModal.addEventListener("click", () => {
      closeModal("jsonbin-config-modal");
    });
  }

  // Đóng modal khi click ra ngoài
  document.getElementById("gift-modal").addEventListener("click", (e) => {
    if (e.target.id === "gift-modal") {
      closeModal("gift-modal");
    }
  });

  document.getElementById("wish-modal").addEventListener("click", (e) => {
    if (e.target.id === "wish-modal") {
      closeModal("wish-modal");
    }
  });

  const jsonbinModal = document.getElementById("jsonbin-config-modal");
  if (jsonbinModal) {
    jsonbinModal.addEventListener("click", (e) => {
      if (e.target.id === "jsonbin-config-modal") {
        closeModal("jsonbin-config-modal");
      }
    });
  }

  // Đóng modal bằng phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal("gift-modal");
      closeModal("wish-modal");
      closeModal("jsonbin-config-modal");
    }
  });

  console.log("🎄 Trang web Giáng Sinh đã sẵn sàng! 🎄");
  console.log(
    '💾 Dữ liệu được lưu trong localStorage với key: "christmasWishes"'
  );
  console.log(
    '📝 Để xem dữ liệu trong console, gõ: localStorage.getItem("christmasWishes")'
  );
  console.log(
    '📋 Hoặc xem dạng JSON đẹp: JSON.parse(localStorage.getItem("christmasWishes"))'
  );
  console.log(
    "⚠️ Lưu ý: JSONPlaceholder là API mock, không lưu dữ liệu thực sự. Dữ liệu thực được lưu trong localStorage của trình duyệt."
  );
});
