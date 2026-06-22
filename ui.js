document.getElementById('btn-start').addEventListener('click', () => {
    document.getElementById('welcome-screen').classList.add('hidden');
});

document.getElementById('btn-toggle-history').addEventListener('click', () => {
    document.getElementById('left-sidebar').classList.toggle('hidden');
});

document.getElementById('btn-toggle-tools').addEventListener('click', () => {
    const toolsSidebar = document.getElementById('right-sidebar');
    toolsSidebar.classList.toggle('show-sidebar');
    toolsSidebar.classList.toggle('hidden');
    document.body.classList.toggle('tools-open');
});

const pencilBtn = document.getElementById('btn-pencil');
const pencilStatus = document.getElementById('pencil-status');
pencilBtn.addEventListener('click', function() {
    this.classList.toggle('pencil-off');
    this.classList.toggle('pencil-on');
    pencilStatus.innerText = this.classList.contains('pencil-on') ? "Bật" : "Tắt";
});

// BIẾN TOÀN CỤC
let selectedRow = -1;
let selectedCol = -1;
let timerInterval = null;
let secondsElapsed = 0;
let mistakes = 0;
let isGameOver = false; 
let historyStack = []; 
let currentRecordId = null; 

//  TỦ GIẤU ĐÁP ÁN CHUẨN CỦA GHOST SOLVER
let masterSolution = null; 

let solvedTracking = { rows: new Array(9).fill(false), cols: new Array(9).fill(false), boxes: new Array(9).fill(false) };

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    secondsElapsed = 0;
    updateTimerUI();
    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerUI();
    }, 1000);
}

function updateTimerUI() {
    let m = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    let s = (secondsElapsed % 60).toString().padStart(2, '0');
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.innerText = `${m}:${s}`;
}

function addMistake() {
    mistakes++;
    const mistakesDisplay = document.getElementById('mistakes-display');
    if (mistakesDisplay) mistakesDisplay.innerText = mistakes;
    if (mistakes >= 5) { 
        isGameOver = true; 
        setTimeout(() => alert("Bạn đã sai 5 lần! Game kết thúc và sẽ không được lưu vào lịch sử."), 100);
    }
}

function resetGameStats() {
    mistakes = 0;
    isGameOver = false; 
    historyStack = []; 
    const mistakesDisplay = document.getElementById('mistakes-display');
    if (mistakesDisplay) mistakesDisplay.innerText = mistakes;
    
    solvedTracking = { rows: new Array(9).fill(false), cols: new Array(9).fill(false), boxes: new Array(9).fill(false) };
    startTimer();
}

async function fetchSudokuFromAPI(difficulty) {
    const btnNewGame = document.getElementById('btn-new-game');
    const originalText = btnNewGame ? btnNewGame.innerText : "GAME MỚI";

    try {
        if (btnNewGame) { btnNewGame.innerText = "⏳ Đang tải..."; btnNewGame.disabled = true; }
        
        let apiDiff = difficulty === "1" ? "easy" : (difficulty === "2" ? "easy" : (difficulty === "3" ? "medium" : "hard"));
        const response = await fetch(`https://sugoku.onrender.com/board?difficulty=${apiDiff}`);
        if (!response.ok) throw new Error("loi ket noi");
        const data = await response.json();
        
        if (btnNewGame) { btnNewGame.innerText = originalText; btnNewGame.disabled = false; }
        return data.board; 
    } catch (error) {
        if (btnNewGame) { btnNewGame.innerText = originalText; btnNewGame.disabled = false; }
        alert("Hiện tại máy chủ API đang bận. Bạn hãy chọn mức 'Tự Nhập' nhé!");
        return null;
    }
}

function importBoardToUI(matrix) {
    if (!matrix) return;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const inputElement = document.getElementById(`cell-${r}-${c}`);
            if (!inputElement) continue;
            
            inputElement.className = ''; 
            inputElement.parentElement.classList.remove('highlight-line', 'flash-success');
            inputElement.parentElement.removeAttribute('data-notes');
            
            const num = matrix[r][c];
            if (num !== 0) {
                inputElement.value = num;
                inputElement.classList.add('api-fixed-cell'); 
                inputElement.dataset.isApi = "true";          
            } else {
                inputElement.value = '';
                inputElement.classList.remove('api-fixed-cell');
                inputElement.dataset.isApi = "false";
            }
        }
    }
}

function clearBoardUI() {
    masterSolution = null; // Xóa luôn đáp án giấu khi xóa bảng
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const inputElement = document.getElementById(`cell-${r}-${c}`);
            if (inputElement) {
                inputElement.value = '';
                inputElement.className = '';
                inputElement.dataset.isApi = "false";
                inputElement.parentElement.classList.remove('highlight-line', 'flash-success');
                inputElement.parentElement.removeAttribute('data-notes');
            }
        }
    }
    document.getElementById('stat-time').innerText = '0.000';
    document.getElementById('stat-backtracks').innerText = '0';
    resetGameStats();
}

async function handleLevelSelection(levelValue) {
    if (levelValue === "1") { 
        clearBoardUI(); 
        return; 
    }
    const diffValue = levelValue === "5" ? ["2", "3", "4"][Math.floor(Math.random() * 3)] : levelValue;
    const apiMatrix = await fetchSudokuFromAPI(diffValue);
    
    if (apiMatrix) {
        document.getElementById('difficulty-select').value = diffValue;
        importBoardToUI(apiMatrix);

        // [MỚI] GỌI GHOST SOLVER LẤY ĐÁP ÁN CHUẨN CẤT VÀO TỦ
        if (typeof getGhostSolution === 'function') {
            masterSolution = getGhostSolution(apiMatrix);
        }
    }
    resetGameStats();
}

document.getElementById('difficulty-select').addEventListener('change', async (e) => await handleLevelSelection(e.target.value));
document.getElementById('btn-new-game').addEventListener('click', async () => await handleLevelSelection(document.getElementById('difficulty-select').value));
document.getElementById('btn-clear').addEventListener('click', clearBoardUI);


// ================== HỆ THỐNG LỊCH SỬ ==================
document.addEventListener('DOMContentLoaded', loadHistoryFromStorage);

function saveToHistory(type, timeStr, diffValue, finalBoard) {
    let historyStr = localStorage.getItem('sudokuAppHistory');
    let historyArr = historyStr ? JSON.parse(historyStr) : [];
    
    let diffLabel = "Tự nhập";
    if(diffValue === "2") diffLabel = "Dễ";
    else if(diffValue === "3") diffLabel = "Trung bình";
    else if(diffValue === "4") diffLabel = "Khó";

    let newRecord = {
        id: Date.now(),
        title: `Bản ghi ${String(historyArr.length + 1).padStart(2, '0')} - ${type === 'AI' ? 'AI' : 'Giải tay'}`,
        type: type, 
        time: timeStr,
        difficultyLabel: diffLabel,
        difficultyValue: diffValue, 
        board: finalBoard, 
        originalApi: getOriginalApiMask()
    };

    historyArr.unshift(newRecord);
    localStorage.setItem('sudokuAppHistory', JSON.stringify(historyArr));
    loadHistoryFromStorage();
}

function getOriginalApiMask() {
    let mask = [];
    for(let r=0; r<9; r++){
        let row = [];
        for(let c=0; c<9; c++){
            let inp = document.getElementById(`cell-${r}-${c}`);
            row.push(inp && inp.dataset.isApi === "true" ? 1 : 0);
        }
        mask.push(row);
    }
    return mask;
}

function loadHistoryFromStorage() {
    const listContainer = document.getElementById('history-list');
    listContainer.innerHTML = ''; 
    
    let historyStr = localStorage.getItem('sudokuAppHistory');
    let historyArr = historyStr ? JSON.parse(historyStr) : [];

    if (historyArr.length === 0) {
        listContainer.innerHTML = '<p style="color: #94a3b8; text-align:center; font-size: 13px;">Chưa có bản ghi nào.</p>';
        return;
    }

    historyArr.forEach(record => {
        let isAI = record.type === 'AI';
        
        let barClass = "diff-medium"; 
        let width = "0%";
        if (record.difficultyValue === "2") { width = "33%"; barClass = "diff-easy"; }
        else if (record.difficultyValue === "3") { width = "66%"; barClass = "diff-medium"; }
        else if (record.difficultyValue === "4") { width = "100%"; barClass = "diff-hard"; }
        else if (record.difficultyValue === "1") { width = "10%"; barClass = "diff-easy"; } 

        let diffHtml = `
            <p>⎋ Độ khó: ${record.difficultyLabel}</p>
            <div class="progress-bar"><div class="progress-fill ${barClass}" style="width: ${width}"></div></div>
        `;

        let miniBoardHtml = `<div class="mini-board">`;
        for(let r=0; r<9; r++){
            for(let c=0; c<9; c++){
                let val = record.board[r][c];
                let isOriginal = record.originalApi[r][c] === 1;
                let cssClass = isOriginal ? "api-original" : (val !== 0 ? (isAI ? "ai-solved" : "manual-solved") : "");
                miniBoardHtml += `<div class="mini-cell ${cssClass}">${val !== 0 ? val : ''}</div>`;
            }
        }
        miniBoardHtml += `</div>`;

        let itemDiv = document.createElement('div');
        itemDiv.className = 'history-item';
        itemDiv.innerHTML = `
            <div class="history-title">${record.title}</div>
            ${miniBoardHtml}
            <div class="history-info">
                <p>⏱ ${isAI ? 'Tốc độ AI' : 'Thời gian'}: <span>${record.time}${isAI ? 's' : ''}</span></p>
                ${diffHtml}
            </div>
        `;

        itemDiv.addEventListener('click', () => openModal(record, miniBoardHtml));
        listContainer.appendChild(itemDiv);
    });
}

document.getElementById('btn-clear-history').addEventListener('click', () => {
    if(confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử không?")){
        localStorage.removeItem('sudokuAppHistory');
        loadHistoryFromStorage();
    }
});

const modal = document.getElementById('board-modal');
const closeModalBtn = document.getElementById('close-modal');

function openModal(record, miniBoardHtml) {
    currentRecordId = record.id; 
    document.getElementById('modal-title').innerText = record.title;
    let bigBoard = miniBoardHtml.replace('class="mini-board"', 'class="mini-board" style="width: 300px; height: 300px;"');
    bigBoard = bigBoard.replace(/class="mini-cell/g, 'class="mini-cell" style="font-size: 24px;"');
    document.getElementById('modal-board-container').innerHTML = bigBoard;
    modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.add('hidden'); });

document.getElementById('btn-delete-single').onclick = function() {
    if (currentRecordId) {
        if(confirm("Xóa bản ghi này?")) {
            let historyStr = localStorage.getItem('sudokuAppHistory');
            let historyArr = historyStr ? JSON.parse(historyStr) : [];
            historyArr = historyArr.filter(r => r.id !== currentRecordId);
            localStorage.setItem('sudokuAppHistory', JSON.stringify(historyArr));
            loadHistoryFromStorage(); 
            modal.classList.add('hidden'); 
        }
    }
};


// ================== LOGIC KIỂM TRA & NHUỘM XANH ==================
function getCurrentBoard() {
    let board = [];
    for (let r = 0; r < 9; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
            let val = document.getElementById(`cell-${r}-${c}`).value;
            row.push(val ? parseInt(val) : 0);
        }
        board.push(row);
    }
    return board;
}

function isValidMove(board, row, col, num) {
    for (let i = 0; i < 9; i++) if (board[row][i] === num) return false;
    for (let i = 0; i < 9; i++) if (board[i][col] === num) return false;
    let startR = Math.floor(row / 3) * 3, startC = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startR + i][startC + j] === num) return false;
        }
    }
    return true;
}

function isGroupCompleteAndValid(arr) {
    if (arr.includes(0)) return false; 
    return new Set(arr).size === 9; 
}

function triggerFlash(cellsArray) {
    cellsArray.forEach(td => {
        td.classList.remove('flash-success');
        void td.offsetWidth; 
        td.classList.add('flash-success');
        setTimeout(() => td.classList.remove('flash-success'), 1500);
    });
}

function checkCompletedGroups() {
    let board = getCurrentBoard();
    let isFull = true;

    for (let r = 0; r < 9; r++) {
        let isValid = isGroupCompleteAndValid(board[r]);
        if (isValid && !solvedTracking.rows[r]) {
            solvedTracking.rows[r] = true;
            let cells = [];
            for (let c = 0; c < 9; c++) cells.push(document.getElementById(`cell-${r}-${c}`).parentElement);
            triggerFlash(cells);
        } else if (!isValid) solvedTracking.rows[r] = false;
    }
    for (let c = 0; c < 9; c++) {
        let colArray = [];
        for (let r = 0; r < 9; r++) colArray.push(board[r][c]);
        let isValid = isGroupCompleteAndValid(colArray);
        if (isValid && !solvedTracking.cols[c]) {
            solvedTracking.cols[c] = true;
            let cells = [];
            for (let r = 0; r < 9; r++) cells.push(document.getElementById(`cell-${r}-${c}`).parentElement);
            triggerFlash(cells);
        } else if (!isValid) solvedTracking.cols[c] = false;
    }
    for (let br = 0; br < 3; br++) {
        for (let bc = 0; bc < 3; bc++) {
            let boxIndex = br * 3 + bc;
            let boxArr = [], sr = br * 3, sc = bc * 3;
            for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) boxArr.push(board[sr + i][sc + j]);
            let isValid = isGroupCompleteAndValid(boxArr);
            if (isValid && !solvedTracking.boxes[boxIndex]) {
                solvedTracking.boxes[boxIndex] = true;
                let cells = [];
                for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) cells.push(document.getElementById(`cell-${sr + i}-${sc + j}`).parentElement);
                triggerFlash(cells);
            } else if (!isValid) solvedTracking.boxes[boxIndex] = false;
        }
    }

    for(let r=0; r<9; r++) {
        for(let c=0; c<9; c++) {
            if(board[r][c] === 0) isFull = false;
        }
    }
    
    if(isFull && !isGameOver) {
        let valid = true;
        for(let r=0; r<9; r++) if(!isGroupCompleteAndValid(board[r])) valid = false;
        if(valid){
            let diffValue = document.getElementById('difficulty-select').value;
            saveToHistory('MANUAL', document.getElementById('timer-display').innerText, diffValue, board);
            isGameOver = true; 
            alert("Chúc mừng! Bạn đã giải thành công.");
        }
    }
}

function updateHighlightEffects(activeRow, activeCol, activeValue) {
    document.querySelectorAll('#sudoku-board td').forEach(td => td.classList.remove('highlight-line'));
    document.querySelectorAll('#sudoku-board input').forEach(inp => inp.classList.remove('selected-cell', 'highlight-same-num'));

    const activeInput = document.getElementById(`cell-${activeRow}-${activeCol}`);
    if (activeInput) activeInput.classList.add('selected-cell');

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cellInput = document.getElementById(`cell-${r}-${c}`);
            if (r === activeRow || c === activeCol) cellInput.parentElement.classList.add('highlight-line');
            if (activeValue !== '' && cellInput.value === activeValue) cellInput.classList.add('highlight-same-num');
        }
    }
    checkCompletedGroups();
}

document.addEventListener('DOMContentLoaded', () => {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cellInput = document.getElementById(`cell-${r}-${c}`);
            if (cellInput) {
                cellInput.readOnly = true; 
                cellInput.addEventListener('click', () => {
                    selectedRow = r; selectedCol = c;
                    updateHighlightEffects(r, c, cellInput.value);
                });
            }
        }
    }
});

function handleInput(key) {
    if (selectedRow === -1 || selectedCol === -1) return; 
    if (isGameOver) return; 
    
    const cellInput = document.getElementById(`cell-${selectedRow}-${selectedCol}`);
    const cellTd = cellInput.parentElement;
    
    if (cellInput.dataset.isApi === "true") return;

    const isNoteMode = document.getElementById('btn-pencil').classList.contains('pencil-on');
    const previousState = {
        row: selectedRow, col: selectedCol,
        value: cellInput.value, notes: cellTd.getAttribute('data-notes'),
        isError: cellInput.classList.contains('error-cell')
    };

    let hasChanged = false;

    if (key === 'Backspace' || key === 'Delete' || key === 'Erase') {
        if (isNoteMode) {
            if (cellTd.hasAttribute('data-notes')) { cellTd.removeAttribute('data-notes'); hasChanged = true; }
        } else {
            if (cellInput.value !== '') { cellInput.value = ''; cellInput.classList.remove('error-cell'); hasChanged = true; }
        }
    } else if (/^[1-9]$/.test(key)) {
        hasChanged = true;
        if (isNoteMode) {
            cellInput.value = ''; cellInput.classList.remove('error-cell');
            let notes = (cellTd.getAttribute('data-notes') || '').split('').filter(n => n.trim() !== '');
            if (notes.includes(key)) notes = notes.filter(n => n !== key);
            else notes.push(key);
            notes.sort();
            if (notes.length > 0) cellTd.setAttribute('data-notes', notes.join(' '));
            else cellTd.removeAttribute('data-notes');
        } else {
            cellTd.removeAttribute('data-notes'); 
            
            // Lấy số người dùng nhập
            let inputNum = parseInt(key);
            let isValid = false;

            // NẾU CÓ ĐÁP ÁN CHUẨN TỪ API -> SO THẲNG VỚI ĐÁP ÁN
            if (masterSolution) {
                isValid = (inputNum === masterSolution[selectedRow][selectedCol]);
            } else {
                // NẾU CHẾ ĐỘ "TỰ NHẬP" -> Dùng luật check dọc/ngang cơ bản
                let board = getCurrentBoard();
                board[selectedRow][selectedCol] = 0; 
                isValid = isValidMove(board, selectedRow, selectedCol, inputNum);
            }
            
            cellInput.value = key;
            
            // Xử lý báo lỗi
            if (!isValid) { 
                cellInput.classList.add('error-cell'); 
                addMistake(); 
            } else { 
                cellInput.classList.remove('error-cell'); 
            }
        }
    }

    if (hasChanged) historyStack.push(previousState);
    updateHighlightEffects(selectedRow, selectedCol, cellInput.value);
}

document.getElementById('btn-undo').addEventListener('click', () => {
    if (historyStack.length === 0) return; 
    const lastState = historyStack.pop();
    const cellInput = document.getElementById(`cell-${lastState.row}-${lastState.col}`);
    const cellTd = cellInput.parentElement;

    cellInput.value = lastState.value;
    if (lastState.isError) cellInput.classList.add('error-cell');
    else cellInput.classList.remove('error-cell');

    if (lastState.notes !== null && lastState.notes !== '') cellTd.setAttribute('data-notes', lastState.notes);
    else cellTd.removeAttribute('data-notes');

    selectedRow = lastState.row; selectedCol = lastState.col;
    updateHighlightEffects(selectedRow, selectedCol, cellInput.value);
});

document.addEventListener('keydown', (e) => {
    if (/^[1-9]$/.test(e.key) || e.key === 'Backspace' || e.key === 'Delete') handleInput(e.key);
});
document.querySelectorAll('.num-btn').forEach(btn => {
    btn.addEventListener('click', () => handleInput(btn.innerText));
});
document.getElementById('btn-erase').addEventListener('click', () => handleInput('Erase'));

// Ping API ngầm
document.addEventListener('DOMContentLoaded', () => {
    fetch(`https://sugoku.onrender.com/board?difficulty=easy`).catch(e => console.log("wakeup..."));
});

const btnDarkMode = document.getElementById('btn-dark-mode');
if (btnDarkMode) {
    btnDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            btnDarkMode.innerHTML = '<i class="fa-solid fa-sun"></i> Chế độ Sáng';
        } else {
            btnDarkMode.innerHTML = '<i class="fa-solid fa-moon"></i> Chế độ Tối';
        }
    });
}

const bgSelector = document.getElementById('bg-selector');
if (bgSelector) {
    bgSelector.addEventListener('change', (e) => {
        if (e.target.value === "bg.jpg") document.body.style.backgroundImage = "url('bg.jpg')";
        else document.body.style.backgroundImage = `url('${e.target.value}')`;
    });
}

function adjustLayoutForMobile() {
    const topBar = document.querySelector('.top-bar');
    const bottomBar = document.querySelector('.bottom-bar');
    const centerContent = document.getElementById('center-content');
    const rightSidebar = document.getElementById('right-sidebar');
    const gameInfoSidebar = document.querySelector('.game-info-sidebar');

    if (window.innerWidth <= 768) {
        if (gameInfoSidebar && gameInfoSidebar.parentElement !== centerContent) {
            centerContent.insertBefore(gameInfoSidebar, centerContent.firstChild);
        }
        if (topBar && topBar.parentElement === centerContent) rightSidebar.appendChild(topBar);
        if (bottomBar && bottomBar.parentElement === centerContent) rightSidebar.appendChild(bottomBar);
    } else {
        if (topBar && topBar.parentElement === rightSidebar) {
            centerContent.insertBefore(topBar, document.querySelector('.sudoku-container'));
        }
        if (bottomBar && bottomBar.parentElement === rightSidebar) {
            centerContent.appendChild(bottomBar);
        }
        if (gameInfoSidebar && gameInfoSidebar.parentElement === centerContent) {
            rightSidebar.insertBefore(gameInfoSidebar, rightSidebar.firstChild);
        }
    }
}
window.addEventListener('resize', adjustLayoutForMobile);
document.addEventListener('DOMContentLoaded', adjustLayoutForMobile);

// Kết nối  NÚT GIẢI AI VÀ LOGIC.JS
document.getElementById('btn-solve').addEventListener('click', () => {
    if(typeof startAI === 'function') startAI(); 
});