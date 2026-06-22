
let aiSpeed = 30; //độ trễ mô phỏng duyệt
let aiBacktracks = 0; // lưu số quay lui
let isAIPlaying = false; // Khóa nút bấm khi AI 
// kiểm tra các ràng buộc hàng và cột
function isSafeGfG(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false; 
        if (board[x][col] === num) return false; 
    }
    // Kiểm tra ràng buộc Vùng ô 3x3
    let startRow = row - (row % 3), startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) return false;
        }
    }
    return true;
}
// Hàm  HEURISTIC MRV (MINIMUM REMAINING VALUES)- tìm ô để duyệt
function findUnassignedLocation(board) {
    let minOptions = 10;
    let bestSpot = null;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) { 
                let possibleValues = 0;
                for (let num = 1; num <= 9; num++) {
                    if (isSafeGfG(board, r, c, num)) possibleValues++;
                }
                if (possibleValues === 0) return [r, c]; 

                if (possibleValues < minOptions) {
                    minOptions = possibleValues;
                    bestSpot = [r, c];
                }
            }
        }
    }
    return bestSpot;
}
// HÀM 3: GHOST SOLVER (GT DFS chạy ngầm để lấy trước Đáp Án Chuẩn để đối chiếu với ngừoi chơi giải tay
function solveSudokuFast(board) {
    let emptySpot = findUnassignedLocation(board);
    if (!emptySpot) return true;
    let row = emptySpot[0], col = emptySpot[1];

    for (let num = 1; num <= 9; num++) {
        if (isSafeGfG(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudokuFast(board)) return true;
            board[row][col] = 0;
        }
    }
    return false;
}

function getGhostSolution(board) {
    let ghostBoard = board.map(row => [...row]); // Deep copy để không làm hỏng dữ liệu thật
    if (solveSudokuFast(ghostBoard)) {
        return ghostBoard; 
    }
    return null;
}


// THUẬT TOÁN ĐỆ QUY BACKTRACKING 
async function solveSudokuVisualized(board) {
    let emptySpot = findUnassignedLocation(board);
    if (!emptySpot) return true; 

    let row = emptySpot[0], col = emptySpot[1];
    let cellInput = document.getElementById(`cell-${row}-${col}`);

    for (let num = 1; num <= 9; num++) {
        if (isSafeGfG(board, row, col, num)) {
            
            board[row][col] = num; 
            cellInput.value = num;
            cellInput.classList.remove('backtracking');
            cellInput.classList.add('trying'); 
            
            await new Promise(r => setTimeout(r, aiSpeed)); 
            // Đệ quy sâu
            if (await solveSudokuVisualized(board)) return true; 

            // QUAY LUI (BACKTRACK)
            board[row][col] = 0; 
            cellInput.value = '';
            cellInput.classList.remove('trying');
            cellInput.classList.add('backtracking'); 
            
            aiBacktracks++; // Tăng biến đếm số lần quay lui
            document.getElementById('stat-backtracks').innerText = aiBacktracks;
            
            await new Promise(r => setTimeout(r, aiSpeed)); 
        }
    }
    cellInput.classList.remove('trying', 'backtracking');
    return false; 
}
// ĐỌC DỮ LIỆU BÀN CỜ (CÓ TIẾP QUẢN TRẠNG THÁI CỦA NGƯỜI CHƠI)
function getBoardForAI() {
    let board = [];
    for (let r = 0; r < 9; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
            let cellInput = document.getElementById(`cell-${r}-${c}`);
            
            if (cellInput.value !== '') {
                if (cellInput.classList.contains('error-cell')) {
                    cellInput.value = '';
                    cellInput.classList.remove('error-cell');
                    row.push(0); 
                } else {
                    row.push(parseInt(cellInput.value));
                }
            } else {
                row.push(0); 
            }
        }
        board.push(row);
    }
    return board;
}


// KHỞI ĐỘNG TIẾN TRÌNH AI
async function startAI() {
    if (isAIPlaying) return; // Chặn spam click
    
    // Khởi tạo mảng dữ liệu (đã kết hợp dữ liệu do người dùng giải trước đó)
    let board = getBoardForAI(); 

    isAIPlaying = true;
    aiBacktracks = 0;
    document.getElementById('stat-backtracks').innerText = aiBacktracks;
    
    document.querySelectorAll('#sudoku-board td').forEach(td => {
        td.classList.remove('highlight-line', 'flash-success');
        td.removeAttribute('data-notes'); 
    });
    document.querySelectorAll('#sudoku-board input').forEach(inp => {
        inp.classList.remove('trying', 'backtracking', 'solved', 'selected-cell'); 
    });

    let startTime = Date.now();
    let aiTimer = setInterval(() => {
        let elapsed = (Date.now() - startTime) / 1000;
        document.getElementById('stat-time').innerText = elapsed.toFixed(3);
    }, 50); 

    let isSolved = await solveSudokuVisualized(board);

    clearInterval(aiTimer); 
    isAIPlaying = false;

    let finalTime = ((Date.now() - startTime) / 1000).toFixed(3);
    document.getElementById('stat-time').innerText = finalTime;
    document.getElementById('stat-backtracks').innerText = aiBacktracks; 

    if (isSolved) {
        document.querySelectorAll('#sudoku-board input').forEach(inp => {
            if (inp.value !== '' && inp.dataset.isApi !== "true") {
                inp.classList.remove('trying', 'backtracking');
                inp.classList.add('solved'); 
            }
        });
        
        if(typeof saveToHistory === 'function') {
            let diffValue = document.getElementById('difficulty-select').value;
            saveToHistory('AI', finalTime, diffValue, board);
        }
    } else {
        alert("Thuật toán bế tắc! Đề bài này vô nghiệm.");
    }
}