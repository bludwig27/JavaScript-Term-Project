//Create scoring system

var myScore = 0;
if(!localStorage.speedHigh){
var speedHigh = 0;
localStorage.speedHigh = 0;}
else{
    speedHigh = localStorage.speedHigh;
};
$('#game1High').html("<h3>High Score: " + speedHigh +"</h3>");
console.log(speedHigh);
console.log(localStorage.speedHigh);

//Hides the game elements on page load

$('document').ready(function(){
    $('#score').hide();
    $('#question').hide();
    $('#answer').hide();
});

//Displays readme

$('#details').on('click', function(){
    alert("Welcome to the Challenge of Speed!\nIn this challenge, you must answer simple arithmetical questions as quickly as possible.\nBe quick, but be accurate: a correct answer will bring you 5 points and 2 bonus seconds, but a wrong one will cost you 3 points!\n\nTIP: Don't forget order of operations. Multiplication comes first!\nTry for Gold rank!");
});

//Main game code; reveals game interface when "Begin" is clicked

$('#start').click(function(){
    myScore = 0;
    $('#score').toggle();
    $('#question').toggle();
    $('#score').text(myScore);
    $('#details').hide();
    $('#start').hide();
    $('#answer').toggle();
    $('#myAns').focus();
    ans=getQuestion();    //calls getQuestion function
    startTimer();           //begins timer

//Handles answer submission and adjusts score and time

    $('#submit').on('click', function(){
        myAns = $("#myAns").val();
        console.log(myAns);
        if (myAns == ans){
            myScore += 5;
            $('#score').text(myScore);
            timeLeft = ($('#timer').html()*1) + 2;
        }
        else{
            myScore -= 3;
            $('#score').text(myScore);
        }
        $('#myAns').val("");
        $('#myAns').focus();
        if(myScore>=25 && myScore < 50){
            $('#score').css("color","brown");
        }
        if(myScore>=50 && myScore < 75){
            $('#score').css("color","white");
        }
        if(myScore<25){
            $('#score').css("color","darkgray");
        }
        if(myScore>=75){
            $('#score').css("color","gold");
        }
        ans=getQuestion();
    });

});

//Timer function displays remaining time and ticks down once per second

function startTimer(){
    $('#timer').text(30);
    timeLeft = $('#timer').html();
    var timetick = setInterval(function (){
    if(timeLeft >= 1){
        timeLeft -= 1;
        $('#timer').html(timeLeft);
        }
    else{
        clearInterval(timetick);
        gameOver();
    }
    },1000);
};

//Displays score and ranking when timer runs out; updates high score in storage if applicable

function gameOver(){
    myScore = $('#score').html();
    var myRank = "";
    if (myScore<25) {myRank = "Tin.\nDarktooth is not impressed.";}
    if (myScore>=25 && myScore<50) {myRank = "Bronze.\nDarktooth feels you have a ways to go.";}
    if (myScore>=50 && myScore<75) {myRank = "Silver.\nDarktooth is impressed by your skills.";}
    if (myScore>=75) {myRank = "GOLD!\nDarktooth is amazed by your mental speed!";}
    if (myScore > Number(speedHigh)){
        speedHigh = myScore;
        localStorage.speedHigh = speedHigh;
        alert("Time is up!\nYour final score was " + myScore + ".\nYour ranking is "+ myRank + "\n\n**A new high score!**");
    }
    else{
    alert("Time is up!\nYour final score was " + myScore + ".\nYour ranking is "+ myRank);}
    location.reload(true);
};

//Creates 3 random numbers and 2 random operators and makes a random math question out of them

function getQuestion(){
    var op1 = Math.ceil(Math.random()*10);
    var op2 = Math.ceil(Math.random()*10);
    var op3 = Math.ceil(Math.random()*10);
    var init = Math.ceil(Math.random()*3);
    var init2 = Math.ceil(Math.random()*3);
    var sign1 = "";
    var sign2 = "";
    var ans;
    if (init == 1 && init2 == 1){
        sign1 = "+";
        sign2 = "+";
        ans = op1 + op2 + op3;
    }
    if (init == 1 && init2 == 2){
        sign1 = "+";
        sign2 = "-";
        ans = op1 + op2 - op3;
    }
    if (init == 1 && init2 == 3){
        sign1 = "+";
        sign2 = "*";
        ans = op1 + op2 * op3;
    }
    if (init == 2 && init2 == 1){
        sign1 = "-";
        sign2 = "+";
        ans = op1 - op2 + op3;
    }
    if (init == 2 && init2 == 2){
        sign1 = "-";
        sign2 = "-";
        ans = op1 - op2 - op3;
    }
    if (init == 2 && init2 == 3){
        sign1 = "-";
        sign2 = "*";
        ans = op1 - op2 * op3;
    }
    if (init == 3 && init2 == 1){
        sign1 = "*";
        sign2 = "+";
        ans = op1 * op2 + op3;
    }
    if (init == 3 && init2 == 2){
        sign1 = "*";
        sign2 = "-";
        ans = op1 * op2 - op3;
    }
    if (init == 3 && init2 == 3){
        sign1 = "*";
        sign2 = "*";
        ans = op1 * op2 * op3;
    }
    console.log(op1,sign1,op2,sign2,op3,ans); //prints question and answer to console for checking
    $("#question").text(op1 + " " + sign1 + " " + op2 + " " + sign2 + " " + op3 + " =");
    return ans;
};