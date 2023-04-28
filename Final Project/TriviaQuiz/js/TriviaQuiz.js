// Set up scoring system

var myScore=0;
var rightAns="";
if(!localStorage.knowHigh){
    var knowHigh = 0;
    localStorage.knowHigh = 0;}
    else{
        knowHigh = localStorage.knowHigh;
    };
    $('#game2High').html("<h3>High Score: " + knowHigh +"</h3>");
    console.log(knowHigh);
    console.log(localStorage.knowHigh);

// Hide game elements until ready to begin

$('document').ready(function(){
    $('#question').hide();
    $('#option1').hide();
    $('#option2').hide();
    $('#option3').hide();
    $('#option4').hide();
    $('#score').hide();
});

// Display instructions

$('#details').on('click', function(){
    alert("Welcome to the Challenge of Knowledge!\nIn this challenge, you must answer trivia questions to test your general knowledge.\nBe quick, but be accurate: a correct answer will bring you 5 points and 3 bonus seconds, but a wrong one will cost you 2 points!\n\nTry for Gold rank!");
});

// Main game function; display game elements, start timer display data

$('#start').click(function(){
    myScore=0;
    $('#details').hide();
    $('#start').hide();
    $('#question').toggle();
    $('#option1').toggle();
    $('#option2').toggle();
    $('#option3').toggle();
    $('#option4').toggle();
    $('#score').toggle();
    $('#score').text(myScore);
    startTimer();
    nextQuestion();

// Evaluate chosen answer and reward or subtract points

    $('button').on('click',function(){
        console.log(rightAns);
        console.log($(this).text());
        if ($(this).text() == rightAns){
            myScore += 5;
            $('#score').text(myScore);
            timeLeft = ($('#timer').html()*1) + 3;       }
        else{
            myScore -= 2;
            $('#score').text(myScore);
        }

// Change color of score to reflect rank status

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
nextQuestion();
        })});

// Communicate with API, retrieve question and answers, randomize answers and display them

function nextQuestion(){
    $.getJSON("https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple",function(response){
        console.log(response);
        rightAns = response.results[0].correct_answer;
        console.log(rightAns);
        var arr=[response.results[0].incorrect_answers[0],response.results[0].incorrect_answers[1],response.results[0].incorrect_answers[2],response.results[0].correct_answer];
        shuffle(arr);
        var question=response.results[0].question;
        var option1=arr[0];
        var option2=arr[1];
        var option3=arr[2];
        var option4=arr[3];

        $('#question').html(question);
        $('#option1').html(option1);
        $('#option2').html(option2);
        $('#option3').html(option3);
        $('#option4').html(option4);

        function shuffle(array){
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }
    })};

// Timer code

function startTimer(){
    $('#timer').text(60);
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

// Game Over screen

function gameOver(){
    myScore = $('#score').html();
    var myRank = "";
    if (myScore<25) {myRank = "Tin.\nDarktooth is not impressed.";}
    if (myScore>=25 && myScore<50) {myRank = "Bronze.\nDarktooth feels you have a ways to go.";}
    if (myScore>=50 && myScore<75) {myRank = "Silver.\nDarktooth is impressed by your skills.";}
    if (myScore>=75) {myRank = "GOLD!\nDarktooth is amazed by your mental speed!";}
    if (myScore > Number(knowHigh)){
        knowHigh = myScore;
        localStorage.knowHigh = knowHigh;
        alert("Time is up!\nYour final score was " + myScore + ".\nYour ranking is "+ myRank + "\n\n**A new high score!**");
    }
    else{
    alert("Time is up!\nYour final score was " + myScore + ".\nYour ranking is "+ myRank);}
    location.reload(true);
};