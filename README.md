# 🧩 TEAM04 - SUDOKU AI SOLVER

<div align="center">

# 🤖 SUDOKU AI

### Ứng dụng Trí tuệ Nhân tạo giải Sudoku bằng Backtracking & MRV

![AI](https://img.shields.io/badge/Artificial-Intelligence-blue)
![Algorithm](https://img.shields.io/badge/Algorithm-Backtracking-green)
![Heuristic](https://img.shields.io/badge/Heuristic-MRV-orange)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow)

*Môn học: Nhập môn Trí tuệ Nhân tạo*

</div>

---

## 📖 Giới thiệu

Sudoku AI là dự án ứng dụng các kỹ thuật tìm kiếm trong Trí tuệ Nhân tạo để giải bài toán Sudoku 9x9.

Hệ thống cho phép người dùng:

* 🧩 Tự nhập đề Sudoku
* 🤖 Quan sát AI giải bài toán
* ⚡ Theo dõi quá trình suy luận từng bước
* 📊 Thống kê số lần quay lui (Backtracking)
* 📝 Lưu lịch sử giải bài

Mục tiêu của dự án là minh họa cách một AI Agent sử dụng thuật toán tìm kiếm để giải quyết bài toán ràng buộc (Constraint Satisfaction Problem).

---

## 🎯 Mục tiêu đề tài

* Nghiên cứu bài toán Sudoku dưới góc nhìn AI.
* Áp dụng thuật toán Backtracking.
* Tối ưu tìm kiếm bằng heuristic MRV.
* Trực quan hóa quá trình suy luận của AI.
* Đánh giá hiệu quả của các kỹ thuật tìm kiếm.

---

## 🧠 Kiến thức Trí tuệ Nhân tạo áp dụng

| Nội dung                              | Mô tả                                |
| ------------------------------------- | ------------------------------------ |
| State Space Search                    | Tìm kiếm trong không gian trạng thái |
| Constraint Satisfaction Problem (CSP) | Bài toán thỏa mãn ràng buộc          |
| Depth First Search (DFS)              | Tìm kiếm theo chiều sâu              |
| Backtracking                          | Quay lui để tìm lời giải             |
| Heuristic Search                      | Tìm kiếm có hướng dẫn                |
| MRV                                   | Chọn biến có ít giá trị khả thi nhất |

---

## ⚙️ Thuật toán sử dụng

### 🔍 Backtracking

Backtracking là kỹ thuật tìm kiếm theo chiều sâu.

Quy trình:

1. Tìm một ô trống.
2. Thử giá trị từ 1 → 9.
3. Kiểm tra tính hợp lệ.
4. Nếu hợp lệ tiếp tục giải.
5. Nếu thất bại quay lui.
6. Thử giá trị khác cho đến khi tìm được lời giải.

---

### ⚡ MRV (Minimum Remaining Values)

MRV là heuristic giúp AI chọn ô tiếp theo thông minh hơn.

Thay vì chọn ngẫu nhiên:

✅ Chọn ô có ít khả năng nhất

✅ Giảm số nhánh tìm kiếm

✅ Giảm số lần Backtracking

✅ Tăng tốc độ giải Sudoku

---

## ✨ Chức năng nổi bật

### 👤 Người dùng

* Nhập bảng Sudoku 9x9
* Tự giải Sudoku
* Kiểm tra nước đi
* Xem đáp án

### 🤖 AI Solver

* Giải Sudoku tự động
* Hiển thị từng bước suy luận
* Mô phỏng quá trình tìm kiếm
* Điều chỉnh tốc độ AI

### 📊 Thống kê

* Số bước thực hiện
* Số lần Backtracking
* Thời gian xử lý
* Lịch sử các lần giải

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
Kết quả Sudoku
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

## 🚀 Hướng dẫn chạy chương trình

### 1. Clone repository

```bash
git clone <repository-link>
```

### 2. Mở dự án

```bash
cd DoAn_TriTueNhanTao
```

### 3. Chạy chương trình

Mở file:

```text
index.html
```

bằng trình duyệt bất kỳ:

* Google Chrome
* Microsoft Edge
* Firefox

---

## 📷 Giao diện chương trình

### 🏠 Trang chính

* Nhập dữ liệu Sudoku
* Chọn chế độ giải

### 🤖 AI Simulation

* Hiển thị từng bước AI suy luận
* Quan sát quá trình Backtracking

### 📊 Kết quả

* Bảng Sudoku hoàn chỉnh
* Thống kê hiệu năng thuật toán

---

## 📈 Kết quả đạt được

✅ Xây dựng thành công hệ thống giải Sudoku

✅ Áp dụng Backtracking vào bài toán CSP

✅ Tích hợp heuristic MRV

✅ Trực quan hóa quá trình suy luận của AI

✅ Hỗ trợ người dùng theo dõi hoạt động của thuật toán

---

## 👥 Thành viên nhóm

| Họ và tên          | MSSV          |
| ------------------ | ------------- |
| Nguyễn Hà Tiến Đạt | 2474802010077 |
| Nguyễn Bảo Lâm     | 2474802010209 |
| Bùi Thanh Hiếu     | 2474802010111 |

---

## 🎓 Môn học

**Nhập môn Trí tuệ Nhân tạo**

Khoa Công nghệ Thông tin

---

<div align="center">

### 🌟 TEAM04 - SUDOKU AI SOLVER 🌟

*"Applying Artificial Intelligence to Solve Sudoku Efficiently"*

</div>
