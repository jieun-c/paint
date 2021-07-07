const canvas = document.getElementById("canvas");
const name = document.getElementById("imgName");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const ctx = canvas.getContext("2d");

const CANVAS_SIZE_X = 240;
const CANVAS_SIZE_Y = 160;
const CANVAS_BG = "white";
const LINE_COLOR = "black";
const LINE_WIDTH = 2.5;

canvas.width = CANVAS_SIZE_X;
canvas.height = CANVAS_SIZE_Y;
ctx.fillStyle = CANVAS_BG;
ctx.strokeStyle = LINE_COLOR;
ctx.lineWidth = LINE_WIDTH;

let painting = false;
ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);

function stopPainting() {
  painting = false;
  ctx.beginPath();
}

function startPainting() {
  painting = true;
}

function onMoveClick(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMoveTouch(event) {
  event.preventDefault();
  const x =
    event.changedTouches[0].clientX - event.changedTouches[0].target.offsetLeft;
  const y =
    event.changedTouches[0].clientY - event.changedTouches[0].target.offsetTop;

  console.log(x, y);

  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSave() {
  const imageURL = canvas.toDataURL();
  const a = document.createElement("a");
  const imgName = document.getElementById("imgName").value;

  a.href = imageURL;
  imgName ? (a.download = imgName) : (a.download = "❌");
  a.click();
}

function handleKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
}

function handleReset() {
  ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMoveClick);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);

  canvas.addEventListener("touchmove", onMoveTouch);
  canvas.addEventListener("touchstart", startPainting);
  canvas.addEventListener("touchend", stopPainting);
}

if (name) {
  name.addEventListener("keydown", handleKey);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSave);
}

if (resetBtn) {
  resetBtn.addEventListener("click", handleReset);
}

//  터치이벤트 구현하기
