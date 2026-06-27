# 🧩 TEAM03 - SUDOKU AI PROJECT

## 📌 Giới thiệu

Dự án xây dựng hệ thống giải bài toán Sudoku bằng thuật toán Backtracking trong lĩnh vực Trí tuệ Nhân tạo.

Chương trình cho phép người dùng nhập vào một bảng Sudoku chưa hoàn chỉnh và tự động tìm lời giải hợp lệ dựa trên phương pháp tìm kiếm quay lui (Backtracking Search).

---

## 🚀 Demo

👉 Link website: *(Cập nhật sau khi deploy)*

👉 Video demo: *(Cập nhật sau)*

👉 Source code: *(Cập nhật sau)*

---

## 🛠️ Công nghệ sử dụng

* HTML, CSS, JavaScript
* Python
* Thuật toán Backtracking
* GitHub để quản lý mã nguồn
* Firebase Hosting / Render (nếu triển khai trực tuyến)

---

## 📖 Mô tả bài toán

Sudoku là trò chơi điền số trên bảng 9x9, được chia thành 9 ô vuông nhỏ 3x3.

Mục tiêu là điền các số từ 1 đến 9 sao cho:

* Mỗi hàng chứa đủ các số từ 1 đến 9 và không lặp lại.
* Mỗi cột chứa đủ các số từ 1 đến 9 và không lặp lại.
* Mỗi vùng 3x3 chứa đủ các số từ 1 đến 9 và không lặp lại.

---

## 🧠 Thuật toán sử dụng

### Backtracking

Backtracking là thuật toán tìm kiếm theo chiều sâu (Depth First Search).

Nguyên lý hoạt động:

1. Tìm một ô trống trong bảng Sudoku.
2. Thử điền các giá trị từ 1 đến 9.
3. Kiểm tra tính hợp lệ của giá trị vừa điền.
4. Nếu hợp lệ, tiếp tục giải các ô còn lại.
5. Nếu không tìm được lời giải, quay lui (backtrack) và thử giá trị khác.
6. Lặp lại cho đến khi tìm được lời giải hoàn chỉnh.

### Ưu điểm

✅ Dễ cài đặt

✅ Tìm được lời giải chính xác

✅ Phù hợp với các bài toán ràng buộc (Constraint Satisfaction Problem)

### Nhược điểm

❌ Thời gian xử lý tăng với các bài Sudoku khó

❌ Có thể phải thử rất nhiều trạng thái trước khi tìm được lời giải

---

## 📷 Giao diện

### Trang nhập Sudoku

* Nhập dữ liệu Sudoku 9x9
* Kiểm tra dữ liệu đầu vào

### Trang kết quả

* Hiển thị lời giải Sudoku
* Thời gian thực thi thuật toán

### Minh họa thuật toán

* Hiển thị quá trình Backtracking
* Các bước thử và quay lui

---

## ⚙️ Chức năng chính

🧩 Nhập bảng Sudoku từ người dùng

🤖 Giải Sudoku bằng thuật toán Backtracking

✅ Kiểm tra tính hợp lệ của lời giải

📊 Hiển thị thời gian thực thi

📋 Hiển thị kết quả trực quan

---

## 📂 Cấu trúc dự án

```text
Sudoku-AI/
│
├── .DS.Store
├── index.html
├── logic.js
├── style.css
├── ui.js
├── images/
│
└── README.md
```

---

## 🎯 Kiến thức Trí tuệ Nhân tạo áp dụng

* State Space Search
* Constraint Satisfaction Problem (CSP)
* Depth First Search (DFS)
* Backtracking Algorithm
* Problem Solving Agent

---

## 👥 Thành viên nhóm

| Họ và tên          | MSSV              |
| ------------------ | ----------------- |
| Nguyễn Hà Tiến Đạt | 2474802010077     |
| Nguyễn Bảo Lâm     | 2474802010209     |
| Bùi Thanh Hiếu     | *(Cập nhật MSSV)* |

---

