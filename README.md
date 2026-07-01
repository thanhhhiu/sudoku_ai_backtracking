<div align="center">

# 🧩 TEAM04 - SUDOKU AI SOLVER

<div align="center">

# 🤖 SUDOKU AI

### Ứng dụng Trí tuệ Nhân tạo giải Sudoku bằng Backtracking & MRV

![AI](https://img.shields.io/badge/Artificial-Intelligence-blue)
![Algorithm](https://img.shields.io/badge/Algorithm-Backtracking-green)
![Heuristic](https://img.shields.io/badge/Heuristic-MRV-orange)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow)

### 🎓 Đồ án môn Nhập môn Trí tuệ Nhân tạo

</div>

---

## 🚀 Demo

🌐 Website Demo

https://lv-soduku.netlify.app/

💻 Chạy trực tiếp trên trình duyệt, không cần cài đặt phần mềm.

---

## 📖 Giới thiệu

Sudoku AI là dự án ứng dụng các kỹ thuật tìm kiếm trong Trí tuệ Nhân tạo để giải bài toán Sudoku 9x9.

Hệ thống cho phép người dùng nhập hoặc tạo bảng Sudoku và quan sát quá trình AI tìm lời giải theo từng bước.

Dự án tập trung vào việc áp dụng các thuật toán tìm kiếm và heuristic thường gặp trong lĩnh vực Trí tuệ Nhân tạo nhằm giải quyết bài toán ràng buộc (Constraint Satisfaction Problem - CSP).

---

## 🎯 Mục tiêu đề tài

* Tìm hiểu bài toán Sudoku dưới góc nhìn Trí tuệ Nhân tạo.
* Xây dựng chương trình giải Sudoku tự động.
* Áp dụng thuật toán Backtracking để tìm lời giải.
* Tối ưu hiệu năng bằng heuristic MRV.
* Trực quan hóa quá trình suy luận của AI.
* Giúp người học hiểu rõ cách hoạt động của các thuật toán tìm kiếm.

---

## 🧠 Kiến thức AI áp dụng

| Nội dung                              | Mô tả                                |
| ------------------------------------- | ------------------------------------ |
| State Space Search                    | Tìm kiếm trong không gian trạng thái |
| Constraint Satisfaction Problem (CSP) | Bài toán thỏa mãn ràng buộc          |
| Depth First Search (DFS)              | Tìm kiếm theo chiều sâu              |
| Backtracking                          | Thuật toán quay lui                  |
| Heuristic Search                      | Tìm kiếm có hướng dẫn                |
| Minimum Remaining Values (MRV)        | Chọn biến có ít giá trị khả thi nhất |

---

## ⚙️ Thuật toán sử dụng

### 🔍 Backtracking

Backtracking là phương pháp tìm kiếm theo chiều sâu được sử dụng để giải Sudoku.

Nguyên lý hoạt động:

1. Tìm ô trống trong bảng Sudoku.
2. Thử các giá trị từ 1 đến 9.
3. Kiểm tra tính hợp lệ.
4. Nếu hợp lệ thì tiếp tục giải các ô còn lại.
5. Nếu không tìm được lời giải thì quay lui.
6. Thử giá trị khác cho đến khi hoàn thành bảng Sudoku.

---

### ⚡ Minimum Remaining Values (MRV)

MRV là heuristic được sử dụng để lựa chọn ô tiếp theo một cách thông minh.

Thay vì chọn ngẫu nhiên:

* Chọn ô có ít giá trị khả thi nhất.
* Giảm số lượng nhánh tìm kiếm.
* Giảm số lần Backtracking.
* Tăng tốc độ tìm lời giải.

---

## ✨ Chức năng chính

### 🧩 Quản lý Sudoku

* Nhập dữ liệu Sudoku thủ công.
* Khởi tạo bảng Sudoku mới.
* Làm mới bảng chơi.
* Kiểm tra dữ liệu đầu vào.

### 🤖 AI Solver

* Giải Sudoku tự động.
* Hiển thị từng bước giải.
* Mô phỏng quá trình suy luận của AI.
* Quan sát các bước Backtracking.

### 📊 Thống kê

* Thời gian giải.
* Số bước thực hiện.
* Số lần quay lui.
* Hiển thị tiến trình giải bài toán.

### 🎮 Hỗ trợ người dùng

* Tự giải Sudoku.
* Kiểm tra đáp án.
* Xem lời giải hoàn chỉnh.
* Lưu lịch sử các lần giải.

---

## 🏗️ Kiến trúc hệ thống

```text
Người dùng
      │
      ▼
Giao diện Web
(HTML/CSS/JS)
      │
      ▼
Sudoku Engine
      │
 ┌────┴────┐
 ▼         ▼
MRV   Backtracking
      │
      ▼
Lời giải Sudoku
```

---

## 📂 Cấu trúc dự án

```text
DoAn_TriTueNhanTao
│
├── index.html
├── style.css
├── logic.js
├── ui.js
│
├── images
│   ├── bg.jpg
│   ├── bien.jpeg
│   ├── nuituyet.jpeg
│   └── Rungsuong.jpeg
│
└── README.md
```

---

## 🚀 Hướng dẫn sử dụng

### 1. Truy cập website

Mở trình duyệt và truy cập:

https://lv-soduku.netlify.app/

### 2. Nhập dữ liệu Sudoku

* Điền các số đã cho vào bảng Sudoku.
* Để trống các ô chưa có giá trị.

### 3. Chọn chức năng

* Giải Sudoku bằng AI.
* Theo dõi từng bước giải.
* Kiểm tra đáp án.
* Xem lời giải hoàn chỉnh.

---

## 📷 Giao diện chương trình

### 🏠 Trang chính

* Hiển thị bảng Sudoku 9x9.
* Nhập dữ liệu ban đầu.
* Điều khiển các chức năng của hệ thống.

### 🤖 AI Simulation

* Theo dõi quá trình AI suy luận.
* Hiển thị từng bước giải Sudoku.
* Quan sát quá trình quay lui.

### 📊 Kết quả

* Bảng Sudoku hoàn chỉnh.
* Thời gian thực thi.
* Số lần Backtracking.

---

## 📈 Kết quả đạt được

✅ Xây dựng thành công hệ thống giải Sudoku tự động.

✅ Áp dụng thuật toán Backtracking vào bài toán CSP.

✅ Tích hợp heuristic MRV để tối ưu hiệu năng.

✅ Mô phỏng trực quan quá trình suy luận của AI.

✅ Hỗ trợ người dùng học và tìm hiểu thuật toán.

---

## 👥 Thành viên nhóm

| Họ và tên          | MSSV          |
| ------------------ | ------------- |
| Nguyễn Hà Tiến Đạt | 2474802010077 |
| Nguyễn Bảo Lâm     | 2474802010209 |
| Bùi Thanh Hiếu     | ...           |

---

## 🎓 Môn học

**Nhập môn Trí tuệ Nhân tạo**

Khoa Công nghệ Thông tin

---

## 📄 Giấy phép

Dự án được thực hiện với mục đích học tập, nghiên cứu và báo cáo môn học.

---

<div align="center">

### 🌟 TEAM04 - SUDOKU AI SOLVER 🌟

*"Applying Artificial Intelligence to Solve Sudoku Efficiently"*

</div>
