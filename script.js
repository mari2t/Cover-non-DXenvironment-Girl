const log = document.getElementById("log");
const buttonA = document.getElementById("button-a");
const inputStatement = document.getElementById("inputStatement");
const sayStatement = document.getElementById("sayStatement");
let statementPerson = "";
let statementCounter = 1;

//発言番号文字列操作関数
function textStatementCounter() {
  let text = "";
  if (statementCounter < 10) {
    text = "000" + statementCounter.toString();
  } else if (statementCounter < 100) {
    text = "00" + statementCounter.toString();
  } else if (statementCounter < 1000) {
    text = "0" + statementCounter.toString();
  } else {
    text = statementCounter.toString();
  }
  return text;
}

//発言ボタン関数
sayStatement.addEventListener("click", () => {
  if (statementPerson === "") {
    alert("発言者を選んでください。");
    return;
  }
  const timestamp = textFormattedTime();
  const numberStamp = textStatementCounter();
  const input = inputStatement.value;
  const logItem = `${numberStamp}：${timestamp}：${statementPerson}：${input}`;
  const listItem = document.createElement("ul");
  listItem.textContent = logItem;
  statementCounter++;
  log.appendChild(listItem);
  listItem.addEventListener("click", function () {
    const selectedButton = document.querySelector(".selected");
    if (selectedButton) {
      selectedButton.classList.remove("selected");
    }
    this.classList.add("selected");
    statementPerson = button.textContent;
  });
  document.getElementById("inputStatement").value = "";
  document.getElementById("inputStatement").focus();
});

//現在の時刻を23：44のように取得する関数
function textFormattedTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return formattedTime;
}

//会議開始ボタン関数
const buttons = document.querySelectorAll(".participantButton");
function startButtons() {
  //参加者ボタン作成
  const buttonContainer = document.getElementById("buttonContainer");
  let arrayOfParticipant = splitInputParticipant();
  arrayOfParticipant = [...arrayOfParticipant, "全員", "その他"];
  for (let i = 0; i < arrayOfParticipant.length; i++) {
    const button = document.createElement("button");
    button.textContent = arrayOfParticipant[i];
    button.id = button.textContent;
    button.class = "participantButton";
    button.style.marginLeft = "5px";
    button.addEventListener("click", function () {
      const selectedButton = document.querySelector(".selected");
      if (selectedButton) {
        selectedButton.classList.remove("selected");
      }
      this.classList.add("selected");
      statementPerson = button.textContent;
    });
    buttonContainer.appendChild(button);
  }
  //議事録に各設定値を入力
  document.getElementById("meetingTitle").textContent =
    document.getElementById("MeetingName").value + "会議記録";
  TodayDate();
  document.getElementById("textMeetingName").textContent =
    "会議名：" + document.getElementById("MeetingName").value;
  TodayDate();
  document.getElementById("textLocation").textContent =
    "開催場所：" + document.getElementById("Location").value;
  const listOFParticipant = splitInputParticipant();
  const participantList = listOFParticipant.join("、");
  document.getElementById("textParticipantNameList").textContent =
    "参加者：" + participantList;
  document.getElementById("textStartTime").textContent =
    "開始時刻：" + document.getElementById("StartTime").value;
  document.getElementById("textEndTime").textContent =
    "終了時刻：" + document.getElementById("EndTime").value;
  MeetingTimeCalculation();
  document.getElementById("textContentStatement").textContent =
    "発言番号 ： 発言時刻 ： 発言者 ： 発言内容";
}
//会議終了ボタン関数
function endButton() {
  document.getElementById("textEndTime").textContent =
    "終了時刻：" + document.getElementById("EndTime").value;
  MeetingTimeCalculation();
}

//開催日の日付を表示
function TodayDate() {
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  document.getElementById("textMeetingDay").textContent =
    "開催日：" + `${year}年${month}月${day}日（${dayOfWeek}）`;
}
//会議時間を計算
function MeetingTimeCalculation() {
  const starttime = document.getElementById("StartTime").value;
  const endtime = document.getElementById("EndTime").value;
  if (starttime == "" || endtime == "") {
    document.getElementById("textMeetingTime").textContent = "会議時間：";
  } else {
    // 時刻をDateオブジェクトに変換
    const start = new Date(`2000-01-01T${starttime}:00`);
    const end = new Date(`2000-01-01T${endtime}:00`);
    // 差を計算
    const diff = Math.abs(end - start);
    //会議時間を産出
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById(
      "textMeetingTime"
    ).textContent = `会議時間：${hours}時間${minutes}分`;
  }
}

//参加者を配列に格納
function splitInputParticipant() {
  const inputString = document.getElementById("inputParticipant").value;
  let returnArray = inputString.split("、");
  return returnArray;
}
//設定インプットのテキストを表示
function showText(inputid) {
  const inputBox = document.getElementById(id);
  const textMeetingName = document.createElement("textMeetingName");
  const text = inputBox.value;
  return text;
}
