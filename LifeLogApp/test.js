// ① ローカルストレージからデータ取得
let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = null;
// ② DOM取得
const saveBtn = document.getElementById("save-btn");
const recordList = document.getElementById("record-list");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const memoInput = document.getElementById("memo");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");

// 編集画面
function updateEditStateUI() {
    if (editIndex !== null) {
        saveBtn.textContent = "上書き保存";
        document.getElementById("status").textContent = "編集中";
    } else {
        saveBtn.textContent = "新規保存";
        document.getElementById("status").textContent = "";
    }
}

// ③ 記録一覧表示
function renderRecords() {
    recordList.innerHTML = "";

    if (records.length === 0) {
        recordList.innerHTML = `<p id="empty-message">まだ記録はありません</p>`;
        return;
    }

    records.forEach((r, index) => {
        recordList.innerHTML += `
            <div>
                <p>タイトル：${r.title}</p>
                <p>カテゴリ：${r.category}</p>
                <p>日付：${r.date}</p>
                <p>メモ：${r.memo}</p>
                <p>作業時間：${r.hour}時間${r.minute}分</p>
                <button onclick="deleteRecord(${index})">削除</button>
                <button onclick="editRecord(${index})">編集</button>
                <hr>
            </div>
        `;
    });
}

// ④ 削除機能
function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    renderRecords();
}

//編集機能
function editRecord(index) {
    titleInput.value = records[index].title;
    categoryInput.value = records[index].category;
    dateInput.value = records[index].date;
    memoInput.value = records[index].memo;
    hourInput.value = records[index].hour;
    minuteInput.value = records[index].minute;
    editIndex = index;
    updateEditStateUI();
}

// ⑤ 初期表示
renderRecords();

// ⑥ 保存処理
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
        records[editIndex].title = titleInput.value;
        records[editIndex].category = categoryInput.value;
        records[editIndex].date = dateInput.value;
        records[editIndex].memo = memoInput.value;
        records[editIndex].hour = Number(hourInput.value);
        records[editIndex].minute = Number(minuteInput.value);
        localStorage.setItem("records", JSON.stringify(records));
        editIndex = null;
    } else {
        records.push(record);
        localStorage.setItem("records", JSON.stringify(records));
    }

    updateEditStateUI();
    renderRecords();

    titleInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";
    memoInput.value = "";
    hourInput.value = "";
    minuteInput.value = "";

});