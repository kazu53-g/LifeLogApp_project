// ① ローカルストレージからデータ取得
let records = JSON.parse(localStorage.getItem("records")) || [];

// ② DOM取得
const saveBtn = document.getElementById("save-btn");
const recordList = document.getElementById("record-list");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const memoInput = document.getElementById("memo");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");

// ③ 表示関数
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

    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));

    renderRecords();

    titleInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";
    memoInput.value = "";
    hourInput.value = "";
    minuteInput.value = "";
});