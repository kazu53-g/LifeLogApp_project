// データ取得
let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = null;

// DOM取得
const saveBtn = document.getElementById("save-btn");
const recordList = document.getElementById("record-list");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const memoInput = document.getElementById("memo");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");

const menuToggle = document.querySelector(".menu-toggle");
const logSection = document.querySelector(".log-section");
const nav = document.querySelector("nav");

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
        recordList.innerHTML = `<p>まだ記録はありません</p>`;
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

// 削除
function deleteRecord(index) {
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

    logSection.classList.remove("on");
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
    hourInput.value = "";
    minuteInput.value = "";
});

// ハンバーガー開閉
menuToggle.addEventListener("click", function () {
    this.classList.toggle("on");
    logSection.classList.toggle("on");
    nav.classList.toggle("hidden");
});