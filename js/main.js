/*!
 * Eric R javascrip looks
 */


var idCounter = 0;
var myWrapper = document.getElementById("wrapper").style.backgroundColor = "green";

var myMapWrapper = document.getElementById("mapWrap");

var playerPosX = 0;
var playerPosY = 0;
var moveToPosX = 0;
var moveToPosY = 0;

var currentPlayerPos = "";
var formerPlayerPos = "";

var objectBox = "block tile-space entity-block";
var objectBoxInGoal = "block tile-goal entity-block-goal";
var objectPlayer = "block tile-space entity-player";
var objectWall = "block tile-wall";
var objectGoal = "block tile-goal";
var objectSpace = "block tile-space";

var ShowplayerPosition = document.getElementById("playerPosition");
var infoTile = "";
var getElementByClass = document.getElementsByClassName("playerPosition");

function checkElementClass(elementDivId, elementClassesVariable) {
  if (elementDivId == elementClassesVariable) {
    return true;
  } else {
    return false;
  }
} // function endtag

function injectXYToIDs(theX, theY) {
  return "x" + theX + "y" + theY;
}

function drawUpMap() {
  reset() // make sure stopwatch is reset
  start() // startign stopwatch

  var indexX = 0;
  var indexY = 0;
  var indexYReverse = tileMap01.height - 1;
  for (indexY = 0; indexY < tileMap01.height; indexY++) { // external loop
    for (indexX = 0; indexX < tileMap01.width; indexX++) { // internal loop
      getMapFromJs(indexX, indexYReverse, tileMap01.mapGrid[indexY][indexX][0]);
    } // inner
    indexYReverse--
  } // external
} // drawUpMap end tag


function getMapFromJs(xAxis, yAxis, mapGrindInfo) {
  let newBlock = document.createElement("div");
  newBlock.classList.add("block");
  var xyGrid = injectXYToIDs(xAxis, yAxis);
  newBlock.id = xyGrid;

  switch (mapGrindInfo) {
    case "W":
      newBlock.classList.add("tile-wall");
      //newBlock.textContent = mapGrindInfo;

      break;
    case " ":
      newBlock.classList.add("tile-space");
      //newBlock.textContent = " ";

      break;
    case "G":
      newBlock.classList.add("tile-goal");
      //newBlock.textContent = mapGrindInfo;

      break;
    case "B":
      newBlock.classList.add("tile-space");
      newBlock.classList.add("entity-block");
      //newBlock.textContent = mapGrindInfo;

      break;
    case "P":
      newBlock.classList.add("tile-space");
      newBlock.classList.add("entity-player");
      //newBlock.textContent = mapGrindInfo;

      playerPosX = xAxis;
      playerPosY = yAxis;

      currentPlayerPos = xyGrid;
      ShowplayerPosition.textContent = currentPlayerPos;

      break;
  } // switch end tag
  myMapWrapper.appendChild(newBlock);
} // getMapFromJs end tag


var keys = {};
window.addEventListener("keydown",
  function (arrowKeysdown) {
    keys[arrowKeysdown.code] = true;
    switch (arrowKeysdown.code) {
      case "ArrowUp":
        arrowKeysdown.preventDefault();
        isMoveOk(moveToPosX = 0, moveToPosY + 1);
        break;
      case "ArrowDown":
        arrowKeysdown.preventDefault();
        isMoveOk(moveToPosX = 0, moveToPosY - 1);
        break;
      case "ArrowLeft":
        arrowKeysdown.preventDefault();
        isMoveOk(moveToPosX - 1, moveToPosY = 0);
        break;
      case "ArrowRight":
        arrowKeysdown.preventDefault();
        isMoveOk(moveToPosX + 1, moveToPosY = 0);
        break;
      default:
        break; // do not block any other keys
    }
  },
  false);
window.addEventListener("keyup",
  function (arrowKeysup) {
    keys[arrowKeysup.code] = false;
  },
  false);


function isMoveOk(moveX, moveY) {
  var movGridX = playerPosX + moveX;
  var movGridY = playerPosY + moveY;

  var wantToMoveXY = injectXYToIDs(movGridX, movGridY);
  var whatISThatDivClass = document.getElementById(wantToMoveXY).className;
  infoTile = document.getElementById("testinfo");
  //infoTile.textContent = wantToMoveXY;

  if (checkElementClass(whatISThatDivClass, objectWall)) {
    infoTile.textContent = "Can not move, its a wall";

    // do nothing if its a wall
  } else if (checkElementClass(whatISThatDivClass, objectBox) || checkElementClass(whatISThatDivClass, objectBoxInGoal)) { // if its a box or goal-box infront of player, do this
    var frontOfBoxX = movGridX + moveX;
    var frontOfBoxY = movGridY + moveY;
    var formerBoxPos = wantToMoveXY;

    var whatIsInfrontBoxId = injectXYToIDs(frontOfBoxX, frontOfBoxY);
    var whatIsInfrontOfBoxDivClass = document.getElementById(whatIsInfrontBoxId).className;

    infoTile.textContent = "";

    // 1st nested IF
    if (checkElementClass(whatIsInfrontOfBoxDivClass, objectWall)) { // is it a wall infront of box?
      infoTile.textContent = "Can not move, its a wall infront of the box";

    } else if (checkElementClass(whatIsInfrontOfBoxDivClass, objectGoal)) { // is it a goal infront of box?

      infoTile.textContent = "";

      var moveBoxTo = document.getElementById(whatIsInfrontBoxId)
      moveBoxTo.classList.add("entity-block-goal");

      var removeBox = document.getElementById(formerBoxPos)
      removeBox.classList.remove("entity-block");
      removeBox.classList.remove("entity-block-goal");

      formerPlayerPos = currentPlayerPos;

      var pFormerPosition = document.getElementById(formerPlayerPos)
      pFormerPosition.classList.remove("entity-player");

      var pMoveToObj = document.getElementById(wantToMoveXY)
      pMoveToObj.classList.add("entity-player");

      currentPlayerPos = wantToMoveXY;
      ShowplayerPosition.innerHTML = wantToMoveXY;
      playerPosX = movGridX;
      playerPosY = movGridY;

    } else if (checkElementClass(whatIsInfrontOfBoxDivClass, objectBox)) { // is it a box infront of the box? Then GAME OVER!

      infoTile.innerHTML = "GAME OVER! There is a box infront of your box.<br><button onClick='window.location.href=window.location.href'>Restart Game</button>";
      window.removeEventListener("keydown", arrowKeys); // Theese 2 removeEventListeners are not working. I did not figure out why
      window.removeEventListener("keyup", arrowKeys);


    } else if (checkElementClass(whatIsInfrontOfBoxDivClass, objectSpace)) { // is it a space infront of player and box?

      infoTile.textContent = "";


      var moveBoxTo = document.getElementById(whatIsInfrontBoxId)
      moveBoxTo.classList.add("entity-block");

      var moveBoxTo = document.getElementById(formerBoxPos)
      moveBoxTo.classList.remove("entity-block");


      formerPlayerPos = currentPlayerPos;

      var pFormerPosition = document.getElementById(formerPlayerPos)
      pFormerPosition.classList.remove("entity-player");

      var pMoveToObj = document.getElementById(wantToMoveXY)
      pMoveToObj.classList.add("entity-player");

      currentPlayerPos = wantToMoveXY;
      ShowplayerPosition.innerHTML = wantToMoveXY;
      playerPosX = movGridX;
      playerPosY = movGridY;

    } // 1st nested if Endteg

  } else if (checkElementClass(whatISThatDivClass, objectGoal)) { // if its a box-goal, do this

  infoTile.textContent = "";

  formerPlayerPos = currentPlayerPos;

  var pFormerPosition = document.getElementById(formerPlayerPos)
  pFormerPosition.classList.remove("entity-player");

  var pMoveToObj = document.getElementById(wantToMoveXY)
  pMoveToObj.classList.add("entity-player");

  currentPlayerPos = wantToMoveXY;
  ShowplayerPosition.innerHTML = currentPlayerPos;
  playerPosX = movGridX;
  playerPosY = movGridY;

} else if (checkElementClass(whatISThatDivClass, objectSpace)) { // if its a empty tile, move player there

  infoTile.textContent = "";

  formerPlayerPos = currentPlayerPos;

  var pFormerPosition = document.getElementById(formerPlayerPos)
  pFormerPosition.classList.remove("entity-player");

  var pMoveToObj = document.getElementById(wantToMoveXY)
  pMoveToObj.classList.add("entity-player");

  currentPlayerPos = wantToMoveXY;
  ShowplayerPosition.innerHTML = currentPlayerPos;
  playerPosX = movGridX;
  playerPosY = movGridY;

} else {

}

}





function testalite() {
  var infoTile = document.getElementById("testinfo");
  var whatinfo = document.getElementById(currentPlayerPos);
  infoTile.textContent = whatinfo.textContent;
  infoTile.classList.remove("entity-player");
}


var   offset,
      clock,
      interval;

var counterWatch = 1;

 // checkes every second for a win
setInterval(function () {
  //document.getElementById("elapsedTime").innerHTML = counterWatch++ + " sekund(er)";


if (checkDivIDClassIfMmatch("x17y5", objectBoxInGoal) && checkDivIDClassIfMmatch("x16y5", objectBoxInGoal) && checkDivIDClassIfMmatch("x16y4", objectBoxInGoal) && checkDivIDClassIfMmatch("x17y6", objectBoxInGoal) && checkDivIDClassIfMmatch("x17y5", objectBoxInGoal) && checkDivIDClassIfMmatch("x17y4", objectBoxInGoal)) {
  infoTile.innerHTML = "Congratulations! Your got 6 boxes to the goal-storage! ;) <br><button onClick='window.location.href=window.location.href'>Play Again?</button>";
  changeGoalBoxesColor("x16y6", "blue");
  changeGoalBoxesColor("x16y5", "blue");
  changeGoalBoxesColor("x16y4", "blue");
  changeGoalBoxesColor("x17y6", "blue");
  changeGoalBoxesColor("x17y5", "blue");
  changeGoalBoxesColor("x17y4", "blue");

  stop();

}
  }, 1000);

  function checkDivIDClassIfMmatch(divID, divClass) {
    var checkWhat = document.getElementById(divID).className;
    if (checkWhat == divClass) {
    return true;
  } else {
    return false;
  }
} // function endtag

  function changeGoalBoxesColor(boxId, boxColor) {
    document.getElementById(boxId).style.backgroundColor = boxColor;
  }


  function update() {
    clock += delta();
    render();
  }

  function render() {
    document.getElementById("elapsedTime").innerHTML = clock/1000 + " sekund(er)";  //counterWatch++ + " sekunder";//clock; ///1000; 
  }

  function delta() {
    var now = Date.now(),
        d = now - offset;

    offset = now;
    return d;
  }

  function start() {
    if (!interval) {
      offset = Date.now();
      interval = setInterval(update, 1000);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }
