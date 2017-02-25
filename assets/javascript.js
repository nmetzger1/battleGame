//Character Objects
var boshek = {
    name: "BoShek",
    id: "boshek",
    attack: 0,
    hp: 0,
    img: "assets/images/boshek.png",
    player: false,
    opp: false,
    defeated: false
};

var lobot = {
    name: "Lobot",
    id: "lobot",
    attack: 0,
    hp: 0,
    img: "assets/images/lobot.png",
    player: false,
    opp: false,
    defeated: false
};

var porkins = {
    name: "Jek Porkins",
    id: "porkins",
    attack: 0,
    hp: 0,
    img: "assets/images/porkins.png",
    player: false,
    opp: false,
    defeated: false
};

var max = {
    name: "Max Rebo",
    id: "max",
    attack: 0,
    hp: 0,
    img: "assets/images/max.png",
    player: false,
    opp: false,
    defeated: false
};

characterArray = [boshek, max, lobot, porkins];

// End of Character definitions

//Global Variables
var isPlayerSelected; //Manages game state
var isOppSelected;  //Manages game state
var player = {};
var currentOpponent = {};
var attackCounter;

function gameStart() {
    isPlayerSelected = false;
    isOppSelected = false;
    player = {};
    currentOpponent = {};
    attackCounter = 1;

    setPlayerStats();

    $(".char-select").html("<h1>Player Select</h1>");

    //Create an image div (image + stats) for all characters
    for(var i in characterArray){
        createCharacterDiv(characterArray[i],"char-select")
    }

    //Empty all game areas except for character select
    $(".middle").empty();
    $(".player").empty();
    $(".opp-list").empty();
    $(".current-opponent").empty();
    $(".game-info");


    playerSelect();
}

//Resets all characters back to their starting values
function setPlayerStats(){

    boshek.hp = 107;
    boshek.attack = 8;

    lobot.hp = 50;
    lobot.attack = 25;

    porkins.attack =  10;
    porkins.hp =  93;

    max.attack = 13;
    max.hp = 80;

    for(var i in characterArray){
        characterArray[i].defeated = false;
        characterArray[i].opp = false;
        characterArray[i].player = false;
    }

}

//Handles player selection portion of the game
function playerSelect() {
    $(".img-div-char-select").click(function () {


        //prevents user from selecting a player if one is already selected
        if(isPlayerSelected){
            return;
        }

        var chosenCharacter = $(this).attr('id'); //gets id of element with click listener

        //Sets current plater based on user click
        switch (chosenCharacter){
            case "div-char-select-boshek":
                boshek.player = true;
                player = boshek;
                break;
            case "div-char-select-max":
                max.player = true;
                player = max;
                break;
            case "div-char-select-porkins":
                porkins.player = true;
                player = porkins;
                break;
            default:
                lobot.player = true;
                player = lobot;
        }

        $(".player").append("<h2>" + player.name + "</h2>"); //Add character name to play area
        createCharacterDiv(player, "player"); //Creates player image/stats element

        //Creating opponent list from all other characters not picked
        $(".opp-list").append("<h1>Your Opponents</h1>");
        for(var i in characterArray)
        {
            if(characterArray[i].player == false){
                createCharacterDiv(characterArray[i],"opp-list");
                characterArray[i].opp = true;
            }
        }

        isPlayerSelected = true;

        $(".char-select").empty(); //empties character select div to make room for battle area

        opponentSelect();
    });
}

function opponentSelect() {

    checkForEndGame(); //prevents opponent select from occurring after last opp. defeated

    $(".game-info").html("<h1>Choose Your Opponent</h1>"); //shows message while waiting for opp. to be picked


    $(".img-div-opp-list").click(function () {

        //prevents user from selecting opponent if one is already picked
        if (isOppSelected) {
            return;
        }

        var chosenOpponent = $(this).attr('id'); //sets opponent to character user clicked

        switch (chosenOpponent) {
            case "div-opp-list-boshek":
                currentOpponent = boshek;
                break;
            case "div-opp-list-max":
                currentOpponent = max;
                break;
            case "div-opp-list-porkins":
                currentOpponent = porkins;
                break;
            default:
                currentOpponent = lobot;
        }

        $(".middle").append("<h1>Vs.</h1>"); //Add Vs. Text once opponent is chosen
        $(".current-opponent").append("<h2>" + currentOpponent.name + "</h2>"); //Add Opponent Name to Screen
        createCharacterDiv(currentOpponent,"current-opponent"); //adds opp. image & stats to battle area
        isOppSelected = true; //sets game state
        $("#div-opp-list-" + currentOpponent.id).hide(); //removes selected opponent from list of choices

        battle();

    });


}

//Is called after both player & opponent have been selected
function battle() {

    $(".game-info").html("<h1>Fight!</h1>"); //replaces Choose Opponent text
    $(".middle").append("<button class='btn btn-danger btn-lg' id='attack'>Attack</button>"); //adds attack button to screen

    $("#attack").click(function () {
        attack();
        checkForOppDefeat();
        checkForEndGame();
    });
}


//This function creates all of the character divs and places it in the chosen panel. This is where the magic happens
function createCharacterDiv(object, panel){

    var div = $("<div class='img img-div-" + panel + "' id='div-" + panel + "-" + object.id + "'>");
    var image = $("<img src='" + object.img + "' class='image image-" + panel + "' id='img-" + panel + "-" + object.id + "'>");
    var stats = $("<p class = 'stats panel-" + panel + "'> Atk: " + object.attack + " HP: " + object.hp + "</p>");

    $("." + panel).append(div); //creates initial div
    div.append(image, stats); //adds character image and stats to div

}

//Is called when the Attack button is pressed
function attack() {

    //prevents attacking if opponent is not selected. may not be needed now that the attack button is hidden if opp isn't selected
    if(isOppSelected == false){
        return;
    }

    currentOpponent.hp -= (player.attack * attackCounter); //player attacking opp
    player.hp -= currentOpponent.attack; //opp attacking player
    attackCounter++; //increase attack level
    $('.panel-player').html("Atk: " + (player.attack * attackCounter) + " HP: " + player.hp); //updates player stats
    $('.panel-current-opponent').html("Atk: " + currentOpponent.attack + " HP: " + currentOpponent.hp); //updates opp stats
}


function checkForOppDefeat(){
    if(currentOpponent.hp < 1){ //if opp health is 0 or less
        $(".current-opponent").empty(); //empty current opponent div
        $(".middle").empty(); //gets rid of attack button and VS. text
        isOppSelected = false; //sets game state to waiting for opponent

        //updates actual character object to defeated
        for(var i in characterArray){
            if (currentOpponent.id === characterArray[i].id){
                characterArray[i].defeated = true;
            }
        }

        opponentSelect();
    }


}

function checkForEndGame() {

    //Check if Player is Defeated
    if(player.hp < 1){
        $(".middle").html("<h2>You Lost.</h2>");
        endGame();
        return;
    }

    //If any opponent is not defeated, leave function
    for(var i in characterArray)
    {
        if(characterArray[i].defeated == false && characterArray[i].opp == true){
            return;
        }
    }

    $(".middle").html("<h2>The Winner Is You!</h2>");
    endGame();
}

function endGame() {
    $(".game-info").empty(); //clears Fight! text
    $(".char-select").html("<h1>Game Over</h1>"); //adds Game Over text
    $(".middle").append("<button class='btn btn-primary btn-lg' id='restart'>Restart Game</button>"); //creates restart button
    isOppSelected = true; //prevents user from select opp if defeated
    $("#restart").click(function () {
        gameStart();
    })
}