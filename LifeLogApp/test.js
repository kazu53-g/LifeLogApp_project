// データ取得
let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = null;

// DOM取得（不要なメニュー用の取得を削除しました）
const saveBtn = document.getElementById("save-btn");
const recordList = document.getElementById("record-list");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const memoInput = document.getElementById("memo");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");

// 編集UI更新
function updateEditStateUI() {
    if (editIndex !== null) {
        saveBtn.textContent = "上書き保存";
        document.getElementById("status").textContent = "編集中";
    } else {
        saveBtn.textContent = "新規保存";
        document.getElementById("status").textContent = "";
    }
}

// 記録表示
function renderRecords() {
    recordList.innerHTML = "";

    if (records.length === 0) {
        recordList.innerHTML = `<p id="empty-message">まだ記録はありません</p>`;
        return;
    }

    records.forEach((r, index) => {
        recordList.innerHTML += `
            <div class="record-card" style="border-bottom: 1px solid #edf2f7; padding: 20px 0; margin-bottom: 16px;">
                <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px; color: #1a202c;">
                    タイトル：${r.title}
                </div>
                <div style="font-size: 13px; color: #718096; margin-bottom: 6px;">
                    カテゴリ：${r.category} ｜ 日付：${r.date}
                </div>
                <div style="font-size: 14px; background-color: #f7fafc; padding: 12px; border-radius: 6px; margin-bottom: 12px; white-space: pre-wrap; color: #4a5568; border: 1px solid #edf2f7;">
                    ${r.memo}
                </div>
                <div style="font-size: 14px; color: #4a5568; margin-bottom: 12px; font-weight: 500;">
                    作業時間：${r.hour}時間${r.minute}分
                </div>
                
                <div class="action-buttons" style="display: flex; gap: 8px;">
                    <button class="edit-btn" onclick="editRecord(${index})">編集</button>
                    <button class="delete-btn" onclick="deleteRecord(${index})">削除</button>
                </div>
            </div>
        `;
    });
}

// 削除
function deleteRecord(index) {
    if (!confirm("この記録を削除してもよろしいですか？")) return;

    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    renderRecords();
}

// 編集
function editRecord(index) {
    titleInput.value = records[index].title;
    categoryInput.value = records[index].category;
    dateInput.value = records[index].date;
    memoInput.value = records[index].memo;
    hourInput.value = records[index].hour;
    minuteInput.value = records[index].minute;

    editIndex = index;
    updateEditStateUI();

    // 画面の一番上へスムーズに移動
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 初期表示
renderRecords();

// 保存
saveBtn.addEventListener("click", function () {

    const record = {
        title: titleInput.value,
        category: categoryInput.value,
        date: dateInput.value,
        memo: memoInput.value,
        hour: Number(hourInput.value),
        minute: Number(minuteInput.value)
    };

    if (record.title === "") return;

    if (editIndex !== null) {
        records[editIndex] = record;
        editIndex = null;
    } else {
        records.push(record);
    }

    localStorage.setItem("records", JSON.stringify(records));

    updateEditStateUI();
    renderRecords();

    titleInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";
    memoInput.value = "";
    hourInput.value = "0";
    minuteInput.value = "0";
});