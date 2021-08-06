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
var getElementByClass = document.getElementsByClassName("playerPosition");

function checkElementIdIfClass(elementDivId, elementClassesVariable) {
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
  var infoTile = document.getElementById("testinfo");
  //infoTile.textContent = wantToMoveXY;

  if (checkElementIdIfClass(whatISThatDivClass, objectWall)) {
    infoTile.textContent = "Can not move, its a wall";

    // do nothing if its a wall
  } else if (checkElementIdIfClass(whatISThatDivClass, objectBox) || checkElementIdIfClass(whatISThatDivClass, objectBoxInGoal)) { // if its a box or goal-box infront of player, do this
    var frontOfBoxX = movGridX + moveX;
    var frontOfBoxY = movGridY + moveY;
    var formerBoxPos = wantToMoveXY;

    var whatIsInfrontBoxId = injectXYToIDs(frontOfBoxX, frontOfBoxY);
    var whatIsInfrontOfBoxDivClass = document.getElementById(whatIsInfrontBoxId).className;

    infoTile.textContent = "";

    // 1st nested IF
    if (checkElementIdIfClass(whatIsInfrontOfBoxDivClass, objectWall)) { // is it a wall infront of box?
      infoTile.textContent = "Can not move, its a wall infront of the box";

    } else if (checkElementIdIfClass(whatIsInfrontOfBoxDivClass, objectGoal)) { // is it a goal infront of box?

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

    } else if (checkElementIdIfClass(whatIsInfrontOfBoxDivClass, objectBox)) { // is it a box infront of the box? Then GAME OVER!

      infoTile.innerHTML = "GAME OVER! There is a box infront of your box.<br><button onClick='window.location.href=window.location.href'>Restart Game</button>";
      window.removeEventListener("keydown", arrowKeys); // Theese 2 removeEventListeners are not working. I did not figure out why
      window.removeEventListener("keyup", arrowKeys);


    } else if (checkElementIdIfClass(whatIsInfrontOfBoxDivClass, objectSpace)) { // is it a space infront of player and box?

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

  } else if (checkElementIdIfClass(whatISThatDivClass, objectGoal)) { // if its a box-goal, do this

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

} else if (checkElementIdIfClass(whatISThatDivClass, objectSpace)) { // if its a empty tile, move player there

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
  var infoTile = document.getElementById("testamaptile");
  var whatinfo = document.getElementById(currentPlayerPos);
  infoTile.textContent = whatinfo.textContent;
  infoTile.classList.remove("entity-player");
}



// }, 0);


/* update time every second 
setInterval(function (){
  var todayDate = new Date();
    /*var format = "YYYY-MMM-DD DDD";
    dateConvert(todayDate,format)*/
/*
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  
  var dayNameResult = weekday[todayDate.getDay()];
  
  var fulldatetime = dayNameResult + ", " + todayDate.toLocaleString();
  document.getElementById('datetimeweek').innerHTML = fulldatetime;
  }, 1000);



function checkIfLeapYear() {
  var yesNoAnswer;
  var isFirstJan;
  var userinputyear = document.getElementById("inputyear").value;
  var isItLeapYear = ((userinputyear % 4 == 0) && (userinputyear % 100 != 0)) || (userinputyear % 400 == 0);

  if (isItLeapYear == true) {
    yesNoAnswer = " IS a leapyear.";
  } else {
    yesNoAnswer = " is NOT leapyear.";
  } 

  var resultofyearcheck = "The year: " + userinputyear + yesNoAnswer;
  document.getElementById('resultofcheck').innerHTML = " " + resultofyearcheck;


  var firstJanYear = new Date(userinputyear, 0, 1);

  if ( firstJanYear.getDay() === 0 ) {
    isFirstJan = " IS a Sunday";
  } else {
    isFirstJan = " is NOT a Sunday";
  }

var isFirstjanOnSunday = "1st January of " + userinputyear + isFirstJan;
document.getElementById('resultOfFirstJanCheck').innerHTML = " " + isFirstjanOnSunday;
}


function checkGuessedNr() {

  var theRndNr = Math.floor(Math.random() * 10) + 1;
  var isGuessCorrect;

  var userinputGuess = document.getElementById("inputNrGuess").value;

  if (userinputGuess == theRndNr) {
    isGuessCorrect = " is CORRECT, Good Job! ;)";
  } else {
    isGuessCorrect = " is wrong. The number " + theRndNr +  " did not match.";
  } 

  var resultofguesscheck = "Your guess: " + userinputGuess + isGuessCorrect;
  document.getElementById('resultofguess').innerHTML = " " + resultofguesscheck;
}


function daysTilXmasNow() {

var dateNow = new Date();
var daysuntilXmas = new Date(dateNow.getFullYear(), 11, 24);

if (dateNow.getMonth()==11 && dateNow.getDate()>24) 
{
  daysuntilXmas.setFullYear(daysuntilXmas.getFullYear()+1); 
}  
var one_day=1000*60*60*24;

  daysleftxmas = (Math.ceil((daysuntilXmas.getTime()-dateNow.getTime())/(one_day))) + " days";
  document.getElementById('showdaystoxmas').innerHTML = daysleftxmas;
}



function reverseUserInput() {
  var userinputStr = document.getElementById("inputNrAndLetters").value;

  var newReversedString = "";

    for (var ind = userinputStr.length - 1; ind >= 0; ind--) {
      newReversedString += userinputStr[ind];
    }

  document.getElementById('reversedResulOfInput').innerHTML = "Heres input in reverse order: " + newReversedString;
}



function textmanipulUserInput() {
  var userinputStr = document.getElementById("inputUserText").value;

  var newReversedString = "";

    for (var ind = userinputStr.length - 1; ind >= 0; ind--) {
      newReversedString += userinputStr[ind];
    }

  document.getElementById('reversedResulOfInput').innerHTML = "Heres all combinations of the text: " + newReversedString;
}

*/