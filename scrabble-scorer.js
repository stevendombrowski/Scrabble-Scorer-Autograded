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
   return score;
};

let vowelBonusScorer = function(word){
   let score = 0;
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++){
      if (word[i] == 'A' || word[i] == 'E' || word[i] == 'I' || word[i] == 'O' || word[i] == 'U'){
         score += 3;
      }
      else {score += 1}
   }
   return score;
};

let scrabbleScorer = function(word){
   word = word.toUpperCase();
	let score = 0;
	for (let i = 0; i < word.length; i++) {
 
	  for (let value in oldPointStructure) {
 
		 if (oldPointStructure[value].includes(word[i])) {
			score = Number(value) + score
		 }
 
	  }
	}
	return score;
  
};

const scoringAlgorithms = [
   {name: 'Simple Score',   description: 'Each letter is worth 1 point.',           scorerFunction : simpleScorer },
   {name: 'Bonus Vowels',  description: 'Vowels are 3 pts, consonants are 1 pt.',   scorerFunction : vowelBonusScorer },
   {name: 'Scrabble',       description: 'The traditional scoring algorithm.',      scorerFunction : scrabbleScorer},
]
let scorePrompt;
function scorerPrompt() {

   let scorePrompt = input.question('Which scoring algorithm would you like to use? \n\n 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points \n 2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ')
   return scoringAlgorithms[scorePrompt].scorerFunction(scrabbleQuestion)
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let value in oldPointStructure){
      for (let i = 0; i < oldPointStructure[value].length; i++){
         let keys = oldPointStructure[value][i].toLowerCase();
         newPointStructure[keys] = Number(value);
      }
   }
   return newPointStructure
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   let score = scorerPrompt(scorePrompt);
   
   
   console.log(`${scrabbleQuestion} is worth ${score} points!`)
   
   
   
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
