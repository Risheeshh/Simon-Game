var count=0;
var randomNumber;
var gamePattern=[];
var userClickedPattern=[];
var color = ["green", "red", "blue", "yellow"];
var wrongAudio = new Audio("sounds/wrong.mp3");
var patternCounter = 0;

$(document).keypress(function(event){//Game Begins
    count++;
    console.log(count);

    if (count==1){ 
        $(".btn").on("click", userClick);//handle this.Not supposed to be here.
        Game();
    }
    else if(count!=0){
        userFail();
    }
});

function userFail(){
        $("h1").text("Game Over")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 100);
        wrongAudio.play();
}

function Display(level){
    $("h1").text("Level "+count);
}

function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play()
}
function playSound2(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function nextSequence(){
    randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

function Game(){
    for (var i = 1; i < 99999; i++) {//Stops the chaning headings
        clearInterval(i);
    }
    var chosenColor = color[nextSequence()];
    gamePattern.push(chosenColor);
    Display(count);
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
    async function delayedForLoop() {
        for (let i = 0; i < gamePattern.length; i++) {
            $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound2(gamePattern[i]); // Or do something with items[i]
            await delay(500); // Wait for delay milliseconds
        }
    }
    delayedForLoop();
}

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
            userFail();
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
            userFail();
        }
    }
}

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

//Changing Headings
setInterval(function () {
    $("#level-title").toggle();
    $(".Game-name").toggle()
}, 3000);
