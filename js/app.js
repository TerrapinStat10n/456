var wager, playerMoney, playerRoll, pcRoll, playerScore, pcScore, gameReady;

playerMoney = 500;
playerRoll = [0,0,0];
pcRoll = [0,0,0];
playerScore = 0;
pcScore = 0;
gameReady = false;

updateMoney();

// Clear animation classes
document.getElementById('btn-roll').addEventListener('mousedown', clearAnimations);
// Player submits a wager and 3 dice are rolled for player and computer.
document.getElementById('btn-roll').addEventListener('click', function() {
    wager = Number(document.getElementById('wager').value);
    
    

    // Bet MUST be placed in order to play
    // Player cannot bet more money that they have.
    // IF player runs out of money GAMEOVER and a new game must start.
    if (Number(document.getElementById('wager').value == '')) {
        alert('A Bet must be placed');
        gameReady = false;
        return;
    } else if (Number(document.getElementById('wager').value > playerMoney)) {
        alert('You do not have enough money');
        gameReady = false;
        return;
    } else {
        gameReady = true;
    }
    
    if (document.getElementById('btn-roll').textContent = "Play") {
        document.getElementById('btn-roll').textContent = "Roll Dice";
    }

    if (gameReady) {

        diceRoll();

        playerRoll.sort(function(a,b){return a - b});
        pcRoll.sort(function(a,b){return a - b});

        // Change dice on roll for player
        document.getElementById('player-dice-1').src="img/dice-" + playerRoll[0] + ".png";
        document.getElementById('player-dice-2').src="img/dice-" + playerRoll[1] + ".png";
        document.getElementById('player-dice-3').src="img/dice-" + playerRoll[2] + ".png";

        // Change dice on roll for pc
        document.getElementById('pc-dice-1').src="img/dice-" + pcRoll[0] + ".png";
        document.getElementById('pc-dice-2').src="img/dice-" + pcRoll[1] + ".png";
        document.getElementById('pc-dice-3').src="img/dice-" + pcRoll[2] + ".png";

        console.log(playerRoll);
        console.log(pcRoll);

        // Goal is to have 2 dice roll the same number, the remainder dice is considered the scored which is compared to computer score.
        playerScore = calculateScore(playerRoll, playerScore);
        pcScore = calculateScore(pcRoll, pcScore);

        // If player rolls the same number from 2-6 3 times, they automatically win and their wager is tripled.
        // If player rolls three 1's they lose, and must forfeit 3 times their wager.
        // If player rolls 4-5-6 they automatically win and wager is doubled. If player rolls 1-2-3 they automatically lose and double their wager is lost.
        if (playerRoll[0] == playerRoll[1] && playerRoll[0] == playerRoll[2] && playerRoll[0] != 1) {
            playerMoney += wager * 3;
            addMoney();
            updateMoney();
            document.getElementById('round-result').textContent = "YOU WIN TRIPLE NUMBERS (STORM)";
        } else if (playerRoll[0] == playerRoll[1] && playerRoll[0] == playerRoll[2] && playerRoll[0] == 1) {
            playerMoney -= wager * 3;
            subtractMoney();
            updateMoney();
            document.getElementById('round-result').textContent = "YOU LOSE, TRIPLE 1's";
        } else if (playerRoll[0] == 4 && playerRoll[1] == 5 && playerRoll[2] == 6) {
            playerMoney += wager * 2;
            addMoney();
            updateMoney();
            document.getElementById('round-result').textContent = "YOU WIN, 4, 5, 6";
        } else if (playerRoll[0] == 1 && playerRoll[1] == 2 && playerRoll[2] == 3) {
            playerMoney -= wager * 2;
            subtractMoney();
            updateMoney();
            document.getElementById('round-result').textContent = "YOU LOSE, 1, 2, 3";
        } else if (playerScore > pcScore) {
            playerMoney += wager;
            addMoney();
            updateMoney();
            document.getElementById('round-result').textContent = "YOU WIN";
        } else if (playerScore < pcScore) {
            playerMoney -= wager;
            subtractMoney();
            updateMoney();
            document.getElementById('round-result').textContent = "YOU LOSE";
        } else {
            document.getElementById('round-result').textContent = "DRAW";
        }
    }
  });

//Create set of wagers to populate input field.
document.getElementById('wager-25').addEventListener('click', function() {
    document.getElementById('wager').value = 25;
});

document.getElementById("wager-50").addEventListener('click', function() {
    document.getElementById('wager').value = 50;
});

document.getElementById("wager-100").addEventListener('click', function() {
    document.getElementById('wager').value = 100;
});

document.getElementById("wager-max").addEventListener('mousedown', function() {
    document.getElementById('add-money').classList.remove('animate-money');
})

document.getElementById("wager-max").addEventListener('click', function() {
    document.getElementById('wager').value = playerMoney;
});

//New Game Buttom
document.getElementById('new-game').addEventListener('click', function() {
    init();
    document.getElementById('wager').value = "";
    document.getElementById('round-result').textContent = "";
});

// Generate dice roll
function diceRoll() {
    //player dice roll
    playerRoll[0] = Math.floor(Math.random() * 6) + 1;
    playerRoll[1] = Math.floor(Math.random() * 6) + 1;
    playerRoll[2] = Math.floor(Math.random() * 6) + 1;

    //pc dice roll
    pcRoll[0] = Math.floor(Math.random() * 6) + 1;
    pcRoll[1] = Math.floor(Math.random() * 6) + 1;
    pcRoll[2] = Math.floor(Math.random() * 6) + 1;

}

function calculateScore(roll, score) {
if (roll[0] == roll[1] && roll[0] !== roll[2]) {
    score = roll[2];
} else if (roll[0] == roll[2] && roll[0] !== roll[1]) {
    score = roll[1];
} else if (roll[1] == roll[2] && roll[1] !== roll[0]) {
    score = roll[0];
} else {
    score = 0;
}
return score;
}

function addMoney() {
    document.getElementById('player-money').classList.add('add-money-color');
    document.getElementById('add-money').classList.add('animate-add-money');
}

function subtractMoney() {
    document.getElementById('player-money').classList.add('subtract-money-color');
    document.getElementById('subtract-money').classList.add('animate-sub-money');
}

function updateMoney() {
    document.getElementById('player-money').textContent = "$" + playerMoney;
}

function init() {

playerMoney = 500;
playerRoll = [0,0,0];
pcRoll = [0,0,0];
playerScore = 0;
pcScore = 0;
gameReady = false;

document.getElementById('player-money').textContent = "$" + playerMoney;
    
document.getElementById('btn-roll').textContent = "Play"

}

function clearAnimations() {
    document.getElementById('add-money').classList.remove('animate-add-money');
    document.getElementById('subtract-money').classList.remove('animate-sub-money');
    document.getElementById('player-money').classList.remove('add-money-color');
    document.getElementById('player-money').classList.remove('subtract-money-color');
}


