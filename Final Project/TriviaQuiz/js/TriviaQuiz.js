$('document').ready(function(){
    // $('#score').hide();
    $('#question').hide();
    $('#option1').hide();
    $('#option2').hide();
    $('#option3').hide();
    $('#option4').hide();
});

$('#details').on('click', function(){
    alert("Welcome to the Challenge of Knowledge!\nIn this challenge, you must answer trivia questions to test your general knowledge.\nBe quick, but be accurate: a correct answer will bring you 1 point and 2 bonus seconds, but a wrong one will cost you 1 point!\n\nTry for Gold rank!");
});

$('#start').click(function(){
    $('#details').hide();
    $('#start').hide();
    $('#question').toggle();
    $('#option1').toggle();
    $('#option2').toggle();
    $('#option3').toggle();
    $('#option4').toggle();
    $.getJSON("https://opentdb.com/api.php?amount=10&category=9",function(response){
        console.log(response);
        var question=response.results[0].question;
        var option1=response.results[0].incorrect_answers[0];
        var option2=response.results[0].incorrect_answers[1];
        var option3=response.results[0].correct_answer;
        var option4=response.results[0].incorrect_answers[2];
        $('#question').html(question);
        $('#option1').html(option1);
        $('#option2').html(option2);
        $('#option3').html(option3);
        $('#option4').html(option4);
    })
});