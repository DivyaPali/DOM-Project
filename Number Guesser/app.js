/*
Game Function
- player must guess a no between max and min
- player gets a certain amount of guesses
- notify player no of guesses remain
- notify player correct ans if loose
- let player choose play again  
*/

//GAME VALUE
let min = 1,
    max = 10,
    winNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI ELEMENT
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),    
      message = document.querySelector('.message');

//ASSIGN UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//PLAY AGAIN EVENT LISTENERS
game.addEventListener('mousedown', function (e) { 
  if(e.target.className === 'play-again') {
    window.location.reload();
  }  
});

//LISTEN FOR GUESS
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  //vALIDATES
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
  }

  //CHECK IF WON
  if (guess === winNum) {
    //GAME OVER - WON

  gameOver(true, `${winNum} is correct, YOU WIN!`);

  } else {
    //WRONG NUMBER
    guessesLeft -= 1;

    if(guessesLeft === 0){
      //GAME LOST
      gameOver(false,`Game Over, you lost. The correct number was ${winNum} `);
    } else {
      //GAME CONTINUES - ANSWER WRONG

      //CHANGE BORDER COLOR
      guessInput.style.borderColor = 'red';

      //CLEAR INNPUT
      guessInput.value ='';

      //TELL USERS ITS WRONG NO
      setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`,'red');
    }
  }
});

function gameOver (won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  //DISABLE INPUT
  guessInput.disabled = true;
  //CHANGE BORDER COLOR
  guessInput.style.borderColor = color;
  // //SET TEXT COLOR
  // msg.style.color = color;
  //SET MESSAGE
  setMessage(msg, color);
  //PLAY AGAIN ?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//GET WINNING NUMBER
function getRandomNum(min, max){
  return(Math.floor(Math.random()*(max-min+1)+min));
}

//SET MESSAGE
function setMessage (msg, color) {
  message.style.color = color;
  message.textContent = msg;
}