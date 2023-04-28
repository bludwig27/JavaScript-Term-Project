// Set up scoring system

var myScore = 0;
if(!localStorage.logicHigh){
var logicHigh = 0;
localStorage.logicHigh = 0;}
else{
    logicHigh = localStorage.logicHigh;
};
$('#game3High').html("<h3>High Score: " + logicHigh +"</h3>");
console.log(logicHigh);
console.log(localStorage.logicHigh);

// Hide game elements until player begins

document.onload = function(){
document.getElementById("logicGame").hidden = true;
document.getElementsById("logicCanvas").hidden = true;
document.getElementsById("clue").hidden = true;
};

// Display readme

document.getElementById("details").addEventListener("click", function(){
    alert("Welcome to the Challenge of Logic!\n\nIn this challenge, you must use the arrow keys to move the golden symbol to the answer that corresponds to the clue given above.\nA correct answer will earn you points, but an incorrect one will subtract points.\n\nTIP: Take your time and think about your answers. There's no time limit.\nTry for Gold rank!");
});

//Main Game code; reveals game interface when "Begin" is clicked
document.getElementById("start").addEventListener("click", function(){
    document.getElementById("logicGame").hidden=false;
    document.getElementById("logicCanvas").hidden=false;
    document.getElementById("clue").hidden=false;
    document.getElementById("start").hidden=true;
    document.getElementById("details").hidden=true;
    document.getElementById("head1").hidden=true;
    var questionNum = 0;
    var correctAnswer = "";
var canvas = document.getElementById("logicCanvas");
var ctx = canvas.getContext("2d");
// player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "media/player.png";

// Answer images
var answerReady = false;
var answerImage = new Image();
answerImage.onload = function () {
	answerReady = true;
};

var answer2Ready = false;
var answer2Image = new Image();
answer2Image.onload = function () {
    answer2Ready = true;
};

var answer3Ready = false;
var answer3Image = new Image();
answer3Image.onload = function () {
	answer3Ready = true;
};

// Game objects
var player = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};
var answer = {
	x: 0,
	y: 0
};
var answer2 = {
    x:0,
    y:0
};
var answer3 = {
	x: 0,
	y: 0
};
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game and pick a new question when the player chooses an answer
var reset = function () {
    switch (questionNum){
        case 0:
            document.getElementById("clue").innerHTML = "<h2>I grow, but am not alive.<br>I need air, but have no lungs.<br>I have no mouth, but a drink may kill me.<br>What am I?</h2>";
            answerImage.src = "media/fire.png";
            answer2Image.src="media/tree.webp";
            answer3Image.src = "media/time.png";
            correctAnswer = 1;
            break;
        case 1:
            document.getElementById("clue").innerHTML = "<h2>Sixteen times two, and then minus three;<br>Liberty is made of me.<br>What am I?</h2>";
            answerImage.src = "media/quill.png";
            answer2Image.src="media/cloud.png";
            answer3Image.src = "media/copper.png";
            correctAnswer = 3;
            break;
        case 2:
            document.getElementById("clue").innerHTML = "<h2>Nexus of mighty rivers,<br>Yet you cannot drink from me.<br>If I ever sleep,<br>Then never again shall you wake.</h2>";
            answerImage.src = "media/eye.png";
            answer2Image.src="media/heart.png";
            answer3Image.src = "media/mind.png";
            correctAnswer = 2;
            break;
        case 3:
            document.getElementById("clue").innerHTML = "<h2>I never speak, though I may whisper.<br>I drink the Sun, and eat the Earth.<br>Enemy to none, and friend to many;<br>What am I?</h2>";
            answerImage.src = "media/wind.png";
            answer2Image.src="media/tree.webp";
            answer3Image.src = "media/heart.png";
            correctAnswer = 2;
            break;
        case 4:
            document.getElementById("clue").innerHTML = "<h2>Times unnumbered have you taken me in,<br>And just as often, given me back,<br>Only to capture me again the very next moment.<br>What am I?</h2>";
            answerImage.src = "media/Air.png";
            answer2Image.src="media/wealth.png";
            answer3Image.src = "media/heart.png";
            correctAnswer = 1;
            break;
        case 5:
            document.getElementById("clue").innerHTML = "<h2>Sun and Moon may rest upon me,<br>Yet I am not burdened at all.<br>Billions spend their lives locked in my embrace,<br>Yet you may dwell in me but briefly.<br>What am I?</h2>";
            answerImage.src = "media/Air.png";
            answer2Image.src="media/mirror.png";
            answer3Image.src = "media/water.png";
            correctAnswer = 3;
            break;
        case 6:
                document.getElementById("clue").innerHTML = "<h2>I am born of Water and Wind,<br>Only myself when with my own kind.<br>Though I may feel soft beneath your paws,<br>In truth, I am hard as I ever was.<br>What am I?</h2>";
                answerImage.src = "media/gems.png";
                answer2Image.src="media/flower.png";
                answer3Image.src = "media/sand.png";
                correctAnswer = 3;
                break;
        case 7:
            document.getElementById("clue").innerHTML = "<h2>A palace made of silver hair,<br>Shining jewels suspended there,<br>But tiny thieves had best beware.<br>What am I?</h2>";
                answerImage.src = "media/dandelion.png";
                answer2Image.src="media/stars.png";
                answer3Image.src = "media/web.png";
                correctAnswer = 3;
                break;
        case 8:
            document.getElementById("clue").innerHTML = "<h2>Up above, I am green,<br>Down below, I am rusty.<br>When the cold comes, I begin to burn.<br>What am I?</h2>";
            answerImage.src = "media/crocodile.png";
            answer2Image.src="media/leaf.png";
            answer3Image.src = "media/hummingbird.png";
            correctAnswer = 2;
            break;
        case 9:
            gameOver();
            break;
        default: document.getElementById("clue").innerHTML = "Error!";
        break;

        function gameOver(){
            console.log(myScore);
            var myRank = "";
            if (myScore<25) {myRank = "Tin.\nDarktooth is not impressed.";}
            if (myScore>=25 && myScore<50) {myRank = "Bronze.\nDarktooth feels you have a ways to go.";}
            if (myScore>=50 && myScore<75) {myRank = "Silver.\nDarktooth is impressed by your skills.";}
            if (myScore>=75) {myRank = "GOLD!\nDarktooth is amazed by your mental prowess!";}
            if (myScore > Number(logicHigh)){
                logicHigh = myScore;
                localStorage.logicHigh = logicHigh;
                alert("Time is up!\nYour final score was " + myScore + ".\nYour ranking is "+ myRank + "\n\n**A new high score!**");
            }
            else{
            alert("Time is up!\nYour final score was " + myScore + ".\nYour ranking is "+ myRank);}
            location.reload(true);
        };
    }

	player.x = canvas.width / 2 - 20;
	player.y = canvas.height / 2 - 16;

	// Place the answers
	answer.x = 350;
	answer.y = 75;
    answer2.x = 100;
    answer2.y = 400;
    answer3.x = 600;
    answer3.y = 400;
};
// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		player.y -= player.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		player.y += player.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		player.x -= player.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		player.x += player.speed * modifier;
	}

	// Collision detection
	if (
		player.x<= (answer.x + 64)
		&& answer.x<= (player.x + 64)
		&& player.y<= (answer.y + 64)
		&& answer.y<= (player.y + 64)
        && correctAnswer == 1
	) {
		myScore += 10;
        ++questionNum;
		reset();
	}
    else if(		player.x <= (answer.x + 64)
    && answer.x <= (player.x + 64)
    && player.y <= (answer.y + 64)
    && answer.y <= (player.y + 64)
    && correctAnswer != 1
    ){
        myScore -= 5;
        ++questionNum;
        reset();
    }
    else if(		player.x <= (answer2.x + 64)
    && answer2.x <= (player.x + 64)
    && player.y <= (answer2.y + 64)
    && answer2.y <= (player.y + 64)
    && correctAnswer != 2
    ){
        myScore -= 5;
        ++questionNum;
        reset();
    }
    else if(		player.x <= (answer2.x + 64)
    && answer2.x <= (player.x + 64)
    && player.y <= (answer2.y + 64)
    && answer2.y <= (player.y + 64)
    && correctAnswer == 2
    ){
        myScore += 10;
        ++questionNum;
        reset();
    }
    else if(		player.x <= (answer3.x + 32)
    && answer3.x <= (player.x + 32)
    && player.y <= (answer3.y + 32)
    && answer3.y <= (player.y + 32)
    && correctAnswer == 3
    ){
        myScore += 10;
        ++questionNum;
        reset();
    }
    else if(		player.x <= (answer3.x + 32)
    && answer3.x <= (player.x + 32)
    && player.y <= (answer3.y + 32)
    && answer3.y <= (player.y + 32)
    && correctAnswer != 3
    ){
        myScore -= 5;
        ++questionNum;
        reset();
    }
};
// Draw everything
var render = function () {
	ctx.clearRect(0, 0, 800, 600);

	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y, 50, 50);
	}

	if (answerReady && answer2Ready && answer3Ready) {
		ctx.drawImage(answerImage, answer.x, answer.y, 100,100);
        ctx.drawImage(answer2Image, answer2.x, answer2.y, 100,100);
        ctx.drawImage(answer3Image, answer3.x, answer3.y, 100,100);
	}

	// myScore
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + myScore, 32, 32);
};
// Main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Begin
var then = Date.now();
reset();
main();
});
