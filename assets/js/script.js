
// set vars for doc elements
var headerEl = document.querySelector("header");
var mainEl = document.querySelector("main");
var navEl = document.querySelector("#nav");
var timeDivEl = document.querySelector("#timeDiv");
var instructionEl = document.querySelector("#instruction");
var contentEl = document.querySelector("#content");
var resultEl = document.querySelector("#result");



var viewHighscoresEl = document.querySelector("#viewHighscores");
var timeEl = document.querySelector("#time");
var countEl = document.querySelector("#count");

// set vars for game
var activeQuizTitle = "";
var activeQuestionsAry = [];
const myDate = new Date(0);
var currentQuestionIdx = 0;


var instructionText = function(){
  return ("Try to answer the following " 
          + activeQuizTitle 
          + " questions within the time limit.  Keep in mind that incorrect answers will penalize your score-time by ten seconds!" 
  );
};


var clearMain = function(){
   instructionEl.innerHTML = "";
   contentEl.innerHTML = "";
   resultEl.innerHTML = "";
};

var testMain = function(){
   instructionEl.innerHTML = "Hi";
   contentEl.innerHTML = "There";
   resultEl.innerHTML = "xoxo";
};

testMain();
// set up nav
//check that questions are available, then add nav buttons
// if (Array.isArray(window.codeQuestionsAry) && window.codeQuestionsAry.length > 1){
if (window.codeQuestionsAry && (window.codeQuestionsAry.length > 0)){
  //console.log("here");
  var quizEl = document.createElement("button");
  quizEl.textContent = "Code Quiz";
  navEl.appendChild(quizEl);  
  quizEl.setAttribute("id", "codeBtn");
  quizEl.addEventListener("click", function(){
    activeQuizTitle = "Code Quiz";
    activeQuestionsAry = codeQuestionsAry;
    console.log(activeQuizTitle);
    console.log(activeQuestionsAry[0].question.toString());
    introQuiz();
  });
};
if (window.xmasQuestionsAry && (window.xmasQuestionsAry.length > 0)){
 // console.log("here");
  var quizEl = document.createElement("button");
  quizEl.textContent = "Xmas Quiz";
  navEl.appendChild(quizEl);  
  quizEl.setAttribute("id", "xmasBtn");
  quizEl.addEventListener("click", function(){
    activeQuizTitle = "Xmas Quiz";
    activeQuestionsAry = xmasQuestionsAry;
    console.log(activeQuizTitle);
    console.log(activeQuestionsAry[0].question.toString());
    introQuiz();
  });
};





// for (var i = 0; i < window.codeQuestionsAry.length; i++) {
//   // This statement will run each time the loop is executed
//   console.log('Question: ' + window.codeQuestionsAry[i].question);
// }

// console.log("here2" + window.codeQuestionsAry + window.codeQuestionsAry.length);
// var myObj = window.codeQuestionsAry[0];
// var myQuestion = myObj.question.toString();
// // console.log(window.questionsAry[1].question.toString());
// console.log(myQuestion);
// console.log(myObj.question.toString());


// launch quiz
var introQuiz = function() {
  console.log("start quiz");
  clearMain();
  // instructionEl.innerHTML = "";
  // contentEl.innerHTML = "";
  // resultEl.innerHTML = "";
  var titleEl = document.createElement("H1");
  titleEl.textContent = activeQuizTitle + " Challenge!";
  instructionEl.appendChild(titleEl);  

  var IntroEl = document.createElement("p");
  IntroEl.textContent = instructionText();
  contentEl.appendChild(IntroEl);  
  
  var startTimerEl = document.createElement("button");
  startTimerEl.textContent = "Start Timer";
  contentEl.appendChild(startTimerEl);  
  startTimerEl.addEventListener("click", function(){
    startQuiz();
  });
  
};

// start timer
var startQuiz = function(){
  //load first question before starting the timer
  loadQuestion();
  startTimer();
 
 
  // if (myDate.getSeconds().toString() == "2"){
  //    console.log("TWO");
  //   };

  // if (myDate.getSeconds() == "3"){
  //   for (var i = 0; i < activeQuestionsAry.length; i++) {
  //     console.log('Question: ' + activeQuestionsAry[i].question);
  //   }; 
  // };
 

  // var msgInterval = setInterval(function () {
  //   // If there are no more words left in the message
  //   if (words[wordCount] === undefined) {
  //     // Use `clearInterval()` to stop the timer
  //     clearInterval(msgInterval);
  //   } else {
  //     // Display one word of the message
  //     mainEl.textContent = words[wordCount];
  //     wordCount++;
  //   }
  // }, 1000);

};

var loadQuestion = function () {
  clearMain();

  var questionEl = document.createElement("H2");
  questionEl.textContent = activeQuestionsAry[currentQuestionIdx].question;
  instructionEl.appendChild(questionEl);

  console.log("");
  console.log('Question: ' + activeQuestionsAry[currentQuestionIdx].question);

  var answersEl = document.createElement("div");
  contentEl.appendChild(answersEl);
  answersEl.setAttribute("id", "answers");
  for (var i = 0; i < activeQuestionsAry[currentQuestionIdx].answerChoices.length; i++) {
    var optionEl = document.createElement("button");
    optionEl.textContent = activeQuestionsAry[currentQuestionIdx].answerChoices[i];
    answersEl.appendChild(optionEl);

    if (activeQuestionsAry[currentQuestionIdx].correctAnswerIndex == i) {
      optionEl.setAttribute("isCorrect", "true");
    } else {
      optionEl.setAttribute("isCorrect", "false");
    }
    var brEl = document.createElement("br");
    answersEl.appendChild(brEl);

    console.log('Question: ' + activeQuestionsAry[currentQuestionIdx].answerChoices[i]);
  };

  answersEl.addEventListener("click", function () {
    resultEl.innerHTML = "";
    var outcomeEl = document.createElement("div")
    //console.log(event.target.getAttribute("isCorrect").value);
    console.log("answer is correct?: " + event.target.getAttribute("isCorrect"));
    
    if (event.target.getAttribute("isCorrect") == "true") {
      //if this isCorrect add next button
      outcomeEl.textContent = "Correct"
      var nextEl = document.createElement("button");
      nextEl.textContent = "Next!";
      outcomeEl.appendChild(nextEl);
      resultEl.addEventListener("click", function(){
        loadQuestion();
      });
    } else {
      //else show WRONG!, increment wrong
      outcomeEl.textContent = "Nope!"
    };
    resultEl.appendChild(outcomeEl); 
  });
  // contentEl.appendChild(startTimerEl);  
  // startTimerEl.addEventListener("click", function(){
  //   startQuiz();


  resultEl.innerHTML = "xoxo";

  currentQuestionIdx++;
};

var startTimer = function(){
  myDate.setTime(0);
  myDate.setHours(0);
  const myInterval = setInterval(function(){
    myDate.setSeconds(myDate.getSeconds() + 1);
   timeEl.textContent = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
   console.log(myDate.getSeconds());
  //  if (myDate.getSeconds().toString() === "5"){
  if (myDate.getSeconds().toString() == activeQuestionsAry.length){
      // console.log("IF");
      clearInterval(myInterval);
      };
  }, 1000);
};



// function myTimer() {
//   myDate.setSeconds(myDate.getSeconds() + 1);
//   timeEl.textContent = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
//   console.log(myDate.getSeconds());
//   // if (myDate.getSeconds().toString == "5"){
//   //   clearInterval(myInterval);
//   // };
// };

// iterate through questions
// score 
// get name for scoreboard/high scores






// change to just include another script file that loads the questions into an object vs trying to read in the json file.

// function myfetch()  {fetch("../json/codeQuestions.json")
//   .then(response => response.json())
//   .then(json => console.log(json));
//   console.log ("here");
// };

// myfetch();
// console.log ("hello");


// fr = new FileReader();
//       fr.onload = receivedText;
//       fr.readAsText(file);
    

//     function receivedText(e) {
//       let lines = e.target.result;
//       var newArr = JSON.parse(lines); 
//     }
  


