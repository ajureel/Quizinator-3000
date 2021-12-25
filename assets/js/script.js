

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

function myfetch()  {fetch("../json/codeQuestions.json")
  .then(response => response.json())
  .then(json => console.log(json));
  console.log ("here");
};

myfetch();
console.log ("hello");

