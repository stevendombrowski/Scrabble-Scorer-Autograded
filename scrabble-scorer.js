// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let scrabbleQuestion;
function initialPrompt() {
   scrabbleQuestion = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   return scrabbleQuestion
   
};

let simpleScorer = function(word){
   word = word.toUpperCase()
   let score = 0
   for(let i = 0; i < word.length; i++){
      if (word.charCodeAt(i) >= 65){
         
         score++
         
      }
   }
   return `Score for ${word}: ${score}`;
};

let vowelBonusScorer = function(word){
   let vowelScore = 0;
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++){
      if (word[i] == 'A' || word[i] == 'E' || word[i] == 'I' || word[i] == 'O' || word[i] == 'U'){
         vowelScore += 3;
      }
      else {vowelScore += 1}
   }
   return `Score for ${word}: ${vowelScore}`;
};

let scrabbleScorer = function(word){
   word = word.toUpperCase();
	let score = 0;
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			score = Number(pointValue) + score
		 }
 
	  }
	}
	return `Score for ${word}: ${score}`;
  
};

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

function scorerPrompt() {
   let scorePrompt = input.question('Which scoring algorithm would you like to use? \n\n 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points \n 2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ')
   console.log(scoringAlgorithms[scorePrompt](scrabbleQuestion))
}

function transform() {};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
