// set vars for doc elements
// header elements including navigation and timer
var headerEl = document.querySelector("header");
var navEl = document.querySelector("#nav");
var timeDivEl = document.querySelector("#timeDiv");
var viewHighScoresEl = document.querySelector("#viewHighScores");
var timeEl = document.querySelector("#time");
var countEl = document.querySelector("#count");

// main content elements - where instructions and questions go
var mainEl = document.querySelector("main");
var instructionEl = document.querySelector("#instruction");
var contentEl = document.querySelector("#content");
var resultEl = document.querySelector("#result");

// set vars for game
var activeQuizTitle = "";
var activeQuestionsAry = [];
const myDate = new Date(0); //used for timer
var timerOnBln = false; //used for timer
var timePenalty = 0;
var currentQuestionIdx = 0;

// Helper functions
//default instructions when starting a new quiz
var instructionText = function(){
  return ("Try to answer the following " 
          + activeQuizTitle 
          + " questions within the time limit.  Keep in mind that incorrect answers will penalize your score-time by ten seconds!" 
  );
};

//function to clear out the main content areas, common use: between questions
var clearMain = function(){
   instructionEl.innerHTML = "";
   contentEl.innerHTML = "";
   resultEl.innerHTML = "";
};

//a function to test the layout
var testMain = function(){
   instructionEl.innerHTML = "Hi";
   contentEl.innerHTML = "There";
   resultEl.innerHTML = "xoxo";
};

//let's go and run some stuff...
testMain();

//check that questions are available, then add nav buttons
// if (Array.isArray(window.codeQuestionsAry) && window.codeQuestionsAry.length > 1){
if (window.codeQuestionsAry && (window.codeQuestionsAry.length > 0)) {
  //console.log("here");
  var quizEl = document.createElement("button");
  quizEl.textContent = "Code Quiz";
  navEl.appendChild(quizEl);
  quizEl.setAttribute("id", "codeBtn");
  quizEl.addEventListener("click", function () {
    activeQuizTitle = "Code Quiz";
    activeQuestionsAry = codeQuestionsAry;
    console.log(activeQuizTitle);
    console.log(activeQuestionsAry[0].question.toString());
    introQuiz();
  });
};
if (window.xmasQuestionsAry && (window.xmasQuestionsAry.length > 0)) {
  // console.log("here");
  var quizEl = document.createElement("button");
  quizEl.textContent = "Xmas Quiz";
  navEl.appendChild(quizEl);
  quizEl.setAttribute("id", "xmasBtn");
  quizEl.addEventListener("click", function () {
    activeQuizTitle = "Xmas Quiz";
    activeQuestionsAry = xmasQuestionsAry;
    console.log(activeQuizTitle);
    console.log(activeQuestionsAry[0].question.toString());
    introQuiz();
  });
};

// launch quiz - this runs when a user clicks the button, thus deciding which quiz to launch.
var introQuiz = function() {
  console.log("start quiz");
  clearMain();

  // populate the quiz title
  var titleEl = document.createElement("H1");
  titleEl.textContent = activeQuizTitle + " Challenge!";
  instructionEl.appendChild(titleEl);  

  // populate the quiz instructions
  var IntroEl = document.createElement("p");
  IntroEl.textContent = instructionText();
  contentEl.appendChild(IntroEl);  
  
  // add a button to start the timer and load the first question
  var startTimerEl = document.createElement("button");
  startTimerEl.textContent = "Start Timer";
  contentEl.appendChild(startTimerEl);  
  startTimerEl.addEventListener("click", function(){
    startQuiz();
  });
  
};

// start timer and load the first question
var startQuiz = function(){
  //load first question before starting the timer
  loadQuestion();
  startTimer();
};

var loadQuestion = function () {
  clearMain(); //clear out the prior content

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

    console.log('Choice: ' + activeQuestionsAry[currentQuestionIdx].answerChoices[i]);
  };

  // add event listener for question - includes logic what to do if wrong answer or right answer
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
      if (currentQuestionIdx == activeQuestionsAry.length){
        nextEl.setAttribute("nextQuestion", 0);
        timerOnBln = false;
      } else {
        nextEl.setAttribute("nextQuestion", currentQuestionIdx);
      };

      nextEl.addEventListener("click", function(){
        // need to check if last question
        if (event.target.getAttribute("nextQuestion") === "0"){
          endOfQuiz();
        } else {
        // else load the next question
          loadQuestion();
        };
      });
    } else {
      //else show WRONG!, increment wrong
      outcomeEl.textContent = "Nope!";
      timePenalty++;
      console.log ("timePenalty: " + timePenalty);
    };
    resultEl.appendChild(outcomeEl); 
  });

  currentQuestionIdx++;
};

var endOfQuiz = function(){
  console.log("end of quiz");
  // clean up some stuff
  clearMain();
  currentQuestionIdx = 0;
  
  // console log time
  console.log ("time: " + myDate);
  console.log ("penalty: " + timePenalty);
  console.log ("scored time: " + (timePenalty * 10 + myDate.getSeconds()+(myDate.getMinutes()/60)));

  //tally score
  // score is time based.
  var finalTime = (timePenalty * 10 + myDate.getSeconds()+(myDate.getMinutes()*60));
  // max score is 5 for each question (you get 5 seconds to answer the question)
  var perfectScore = activeQuestionsAry.length * 5;
  // the only way to the end is to answer all questions correct, so score is always based on a perfect score minus overtime and penalties
  // this also gives bonus score for finishing fast
  var finalScore = perfectScore - (finalTime-perfectScore); 
  console.log ("finalTime: " + finalTime);
  console.log ("perfectScore: " + perfectScore);
  console.log ("finalScore: " + finalScore);
  

  // all done
   var titleEl = document.createElement("H1");
   titleEl.textContent = "You've completed the " + activeQuizTitle + " Challenge!";
   instructionEl.appendChild(titleEl);  
 
   // Display result and get name for high score
   var finalScoreEl = document.createElement("p");
   finalScoreEl.textContent = "Your final score is " + finalScore;
   contentEl.appendChild(finalScoreEl);  
  // enter initials
  var initialsPromptEl = document.createElement("p");
  initialsPromptEl.textContent = "Enter your initials: ";
  contentEl.appendChild(initialsPromptEl); 

  var initialsInputEl = document.createElement("input");
  initialsPromptEl.appendChild(initialsInputEl); 
  initialsInputEl.setAttribute("id", "initials");

  // add a submit button  
  var initialsButtonEl = document.createElement("button");
  initialsButtonEl.textContent = "Submit";
  resultEl.appendChild(initialsButtonEl); 
  initialsButtonEl.addEventListener("click", function () {
    var myInitials = initialsInputEl.value;
    //add to high scores
    var highScoresAry= [];
    if(localStorage.getItem("HighScores") !== null){
      highScoresAry = highScoresAry.concat(JSON.parse(localStorage.getItem("HighScores")));
    };
            
    highScoresAry.push(
      {
        "user": myInitials,
        "quiz": activeQuizTitle,
        "score": finalScore
    });

    // put updated scores in local storage
    localStorage.setItem("HighScores", JSON.stringify(highScoresAry));
      
        console.log("local storage set");
      // go to high scores
      highScores();
  });

};

//display high scores
var highScores = function(){
  clearMain();
  var highScoresAry= [];
  if(localStorage.getItem("HighScores") !== null){
    highScoresAry = highScoresAry.concat(JSON.parse(localStorage.getItem("HighScores")));
  };
   // populate the title
   var titleEl = document.createElement("H1");
   titleEl.textContent = "High Scores!";
   instructionEl.appendChild(titleEl);  
 
   // populate the quiz instructions
   var scoreListEl = document.createElement("ol");
   contentEl.appendChild(scoreListEl);  

   console.log("highScores length: " + Object.keys(highScoresAry).length);
   var myAryLength = Object.keys(highScoresAry).length;

  for (i=0; i<myAryLength; i++){
    var scoreItemEl = document.createElement("li");
    scoreListEl.appendChild(scoreItemEl);
    scoreItemEl.textContent = highScoresAry[i].user + " " + highScoresAry[i].quiz  + " " + highScoresAry[i].score; 
  };

  // Exit
  var myExitBtn = document.createElement("button");
  resultEl.appendChild(myExitBtn);
  myExitBtn.textContent = "Exit High Scores";
  myExitBtn.addEventListener("click", function () {
    clearMain();
  });

  // clear scores
  var myClearBtn = document.createElement("button");
  resultEl.appendChild(myClearBtn);
  myClearBtn.textContent = "Remove High Scores";

  myClearBtn.addEventListener("click", function () {
    localStorage.removeItem("HighScores");
    highScores();
  });


};

//add listener for nav to display high scores
viewHighScoresEl.addEventListener("click", function () {
  highScores();
});

//Timer function starts the clock interval displaying the clock (and checking when to end the clock)
var startTimer = function(){
  timerOnBln = true;
  timePenalty = 0;
  myDate.setTime(0);
  myDate.setHours(0);
  const myInterval = setInterval(function(){
    myDate.setSeconds(myDate.getSeconds() + 1);
   timeEl.textContent = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();

  //  if the timer was turned off, then stop the interval
 if (!timerOnBln){
  //     // console.log("IF");
      clearInterval(myInterval);
      };
  }, 1000);
};