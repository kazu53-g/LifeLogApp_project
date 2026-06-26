const saveBtn = document.getElementById("save-btn");
const recordList = document.getElementById("record-list");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const memoInput = document.getElementById("memo");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");

saveBtn.addEventListener("click", function () {
    const title = titleInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;
    const memo = memoInput.value;
    const hour = hourInput.value;
    const minute = minuteInput.value;

    if (title === "") {
        return;
    }

    const record = {
        title: title,
        category: category,
        date: date,
        memo: memo,
        hour: hour,
        minute: minute
    };

    const emptyMessage = document.getElementById("empty-message");
    if (emptyMessage) {
        emptyMessage.remove();
    }

    recordList.innerHTML += `
        <div>
        <p>タイトル：${record.title}</p>
        <p>カテゴリ：${record.category}</p>
        <p>日付：${record.date}</p>
        <p>メモ：${record.memo}</p>
        <p>作業時間：${record.hour}時間${record.minute}分</p>
        <hr>
    </div>
    `;

    titleInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";
    memoInput.value = "";
    hourInput.value = "";
    minuteInput.value = "";
});