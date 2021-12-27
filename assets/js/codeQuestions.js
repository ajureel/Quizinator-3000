// create an array of code questions for the quiz
// each question is an object comprised of 
// 1. question Text
// 2. array of answer choices 
// 3. correct answer index value 

var codeQuestionsAry = [
   {
      "question": ["Commonly used data types DO NOT include:"],
      "answerChoices": ["Strings","Booleans","Alerts","Numbers"], 
      "correctAnswerIndex": 2
      },
      {
         "question": ["The condition in an if/else statement is enclosed within"],
         "answerChoices": ["Quotes","Curly brackets","Parentheses","Square brackets"],
         "correctAnswerIndex": 2
      },
     {
        "question": ["Arrays in JavaScript can be used to store:"],
        "answerChoices": ["Numbers and strings","Other arrays","Booleans","All of the above"],
        "correctAnswerIndex": 3
     },
     {
        "question": ["The best practice is to use textContent or innerHTML?"],
        "answerChoices": ["textContent","innerHTML"],
        "correctAnswerIndex": 0
     },
     {
        "question": ["String values must be enclosed within ___ when being assigned to variables."],
        "answerChoices": ["Commas","Curly brackets","Quotes","Parentheses"],
        "correctAnswerIndex": 2
     },
     {
        "question": ["A very useful tool used during development and debugging for printing content to the debugger is:"],
        "answerChoices": ["JavaScript","Terminal/bash","For loops","Console.log"],
        "correctAnswerIndex": 3
     }
   
];

console.log ("array length" + codeQuestionsAry.length);