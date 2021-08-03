/*!
  * Eric R javascrip looks
*/
var myContent = document.getElementById("wrapper");
myContent.style.backgroundColor = "darkblue";


/* update time every second */
setInterval(function (){
  var todayDate = new Date();
    /*var format = "YYYY-MMM-DD DDD";
    dateConvert(todayDate,format)*/
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













