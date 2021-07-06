const canvas = document.getElementById("canvas");
const saveBtn = document.getElementById("saveBtn");
const ctx = canvas.getContext("2d");

const CANVAS_SIZE_X = 240;
const CANVAS_SIZE_Y = 160;
const CANVAS_BG = "white";
const LINE_COLOR = "black";
const LINE_WIDTH = 2.5;

canvas.width = CANVAS_SIZE_X;
canvas.height = CANVAS_SIZE_Y;
ctx.fillStyle = CANVAS_BG;
ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
ctx.strokeStyle = LINE_COLOR;
ctx.lineWidth = LINE_WIDTH;

let painting = false;

function stopPainting() {
  painting = false;
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
    event.changedTouches[0].pageX - event.changedTouches[0].target.offsetLeft;
  const y =
    event.changedTouches[0].pageY - event.changedTouches[0].target.offsetTop;

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

function handleSaveClick() {
  const imageURL = canvas.toDataURL();
  const a = document.createElement("a");

  a.href = imageURL;
  a.download = "서명";
  a.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMoveClick);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);

  canvas.addEventListener("touchmove", onMoveTouch);
  canvas.addEventListener("touchstart", startPainting);
  canvas.addEventListener("touchend", stopPainting);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

// 1. 터치이벤트 구현하기
// 2. 스크롤막기
// 3. 이미지 저장 이름은 input 으로 받기?
