var myScore = 0;

//Hides the game elements on page load

$('document').ready(function(){
    $('#score').hide();
    $('#question').hide();
    $('#answer').hide();
});

//Displays readme

$('#details').on('click', function(){
    alert("Welcome to the Challenge of Speed!\nIn this challenge, you must answer simple arithmetical questions as quickly as possible.\nBe quick, but be accurate: a correct answer will bring you 1 point and 2 bonus seconds, but a wrong one will cost you 1 point!\n\nTIP: Don't forget order of operations. Multiplication comes first!\nTry for Gold rank!");
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
            myScore += 1;
            $('#score').text(myScore);
            timeLeft = ($('#timer').html()*1) + 2;
        }
        else{
            myScore -= 1;
            $('#score').text(myScore);
        }
        $('#myAns').val("");
        $('#myAns').focus();
        if(myScore>=5 && myScore < 10){
            $('#score').css("color","brown");
        }
        if(myScore>=10 && myScore < 15){
            $('#score').css("color","white");
        }
        if(myScore<5){
            $('#score').css("color","darkgray");
        }
        if(myScore>=15){
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

//Displays score and ranking when timer runs out

function gameOver(){
    myScore = $('#score').html();
    var myRank = "";
    if (myScore<5) {myRank = "Tin.\nDarktooth is not impressed.";}
    if (myScore>=5 && myScore<10) {myRank = "Bronze.\nDarktooth feels you have a ways to go.";}
    if (myScore>=10 && myScore<15) {myRank = "Silver.\nDarktooth is impressed by your skills.";}
    if (myScore>=15) {myRank = "GOLD!\nDarktooth is amazed by your mental speed!";}
    alert("Time is up!\nYour final score was " + myScore + ".\nYour ranking is "+ myRank);
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