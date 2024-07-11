var count=0;
var randomNumber;
var gamePattern=[];
var userClickedPattern=[];
var color = ["green", "red", "blue", "yellow"];
var wrongAudio = new Audio("sounds/wrong.mp3");
var patternCounter = 0;
var musicSerial;

//handles game beginning
$(document).keypress(function(event){//Game Begins
    count++;
    console.log(count);

    if (count==1){ 
        $(".btn").on("click", userClick);//handle this.Not supposed to be here.
        Game();
    }
});

//handling the rules section
$(".rules").on("click",function(event){
    $(".rules").fadeOut(75).fadeIn(75);
    event
    $(".rules").toggleClass("rules-pressed")
    $(".container").toggle();
    if($(".rules").text()==="Rules"){
        $(".rules").text("back");
        $(".description").slideToggle();
    }
    else{
        $(".rules").text("Rules")
        $(".description").slideToggle();
    }
});

//handles game over situations
function userFail(correctButton){
        $("h1").text("Game Over")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 100);
        $(".btn").addClass("game-over-buttons");
        $("#"+gamePattern[correctButton]).addClass("missedButton");
        console.log("#"+correctButton);
        wrongAudio.play();
        $("#"+gamePattern[correctButton]).removeClass("game-over-buttons");
        wrongAudio.play();
}

function Display(level){
    $("h1").text("Level "+count);
}

function playSound(color){
    switch (color){
        case "green":
            musicSerial="1";
            break;
        case "red":
            musicSerial="2"; 
            break;
        case "yellow":
            musicSerial="3";
            break;
        case "blue":
            musicSerial="4";
            break;
    }
    var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound"+musicSerial+".mp3");
    audio.play()
}

//helps in creating a random game pattern
function nextSequence(){
    randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

//the function handling the game's random pattern
function Game(){
    for (var i = 1; i < 99999; i++) {//Stops the changing headings
        clearInterval(i);//stops the infinite changing heading loop
    }
    var chosenColor = color[nextSequence()];
    gamePattern.push(chosenColor);
    Display(count);
    
    //delayed for loop below
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
    async function delayedForLoop() {
        for (let i = 0; i < gamePattern.length; i++) {
            $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
            await delay(250); // Wait for delay
        }
    }
    delayedForLoop();
}

//the function handling the user's button clicks
function userClick(event){
    var userChosenColor = event.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern)
    console.log(gamePattern);
    if(userClickedPattern.length===gamePattern.length){
        if(userClickedPattern.toString()===gamePattern.toString()){
            $("#"+userChosenColor).addClass("pressed");
            setTimeout(function(){
                $("#"+userChosenColor).removeClass("pressed");
            }, 100); 
            playSound(userChosenColor);
            count++;
            Display(count);
            setTimeout(function(){
                Game();
            }, 2000);
            userClickedPattern=[];
            patternCounter=0;
        }
        else{
            var endPosn = userClickedPattern.length-1;
            userFail(endPosn);
        }
    }

    else{
        if (userClickedPattern[patternCounter]===gamePattern[patternCounter]){
            $("#"+userChosenColor).addClass("pressed");
            setTimeout(function(){
                $("#"+userChosenColor).removeClass("pressed");
            }, 100); 
            playSound(userChosenColor);
            patternCounter++;
        }
        else{
            var endPosn = userClickedPattern.length-1;
            userFail(endPosn);
        }
    }
}

//Changing Headings
setInterval(function () {
    $("#level-title").toggle();
    $(".Game-name").toggle()
}, 3000);

//checking audio to prevent lag
window.onload = function(){
    var demo;
    setTimeout(function(){
        demo = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
        demo.play();}, 2000);
    setTimeout(function(){
        demo = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
        demo.play();}, 2150);
    setTimeout(function(){
        demo = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
        demo.play();}, 2300);
    setTimeout(function(){
        demo = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
        demo.play();}, 2450);
};
