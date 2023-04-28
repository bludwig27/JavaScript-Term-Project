if(!localStorage.speedHigh){
    var speedHigh=0;
}
else{
    var speedHigh=localStorage.speedHigh
}
if(!localStorage.knowHigh){
    var knowHigh=0;
}
else{
    var knowHigh=localStorage.knowHigh
}
if(!localStorage.logicHigh){
    var logicHigh=0;
}
else{
    var logicHigh=localStorage.logicHigh
}
console.log(speedHigh,knowHigh,logicHigh);
var grandTotal = Number(speedHigh) + Number(knowHigh) + Number(logicHigh);
console.log(grandTotal);
document.getElementById("points").innerHTML = "<p>Total Treasure Points: " + grandTotal +"</p>";
if(grandTotal < 75){
    document.getElementById("rank").innerHTML = "<p style='color:gray;''>Your overall rank is Tin.</p>"
}
else if(grandTotal >= 75 && grandTotal < 150){
    document.getElementById("rank").innerHTML = "<p style='color:brown;''>Your overall rank is Bronze.</p>"
}
else if(grandTotal >= 150 && grandTotal < 225){
    document.getElementById("rank").innerHTML = "<p style='color:white;''>Your overall rank is Silver.</p>"
}
else if(grandTotal >= 225){
    document.getElementById("rank").innerHTML = "<p style='color:gold; ''>Congratulations! You have achieved the rank of Gold.</p>"
}
else{
    document.getElementById("rank").innerHTML = "<p>Error!</p>"
}

$('#clearData').on('click',function(){
    localStorage.clear();
    location.reload();
});