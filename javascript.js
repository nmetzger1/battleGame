//Character Objects
var boshek = {
    name: "BoShek",
    id: "boshek",
    attack: 0,
    hp: 0,
    img: "images/boshek.png",
    player: false,
    opp: false,
    defeated: false
};

var lobot = {
    name: "Lobot",
    id: "lobot",
    attack: 0,
    hp: 0,
    img: "images/lobot.png",
    player: false,
    opp: false,
    defeated: false
};

var porkins = {
    name: "Jek Porkins",
    id: "porkins",
    attack: 0,
    hp: 0,
    img: "images/porkins.png",
    player: false,
    opp: false,
    defeated: false
};

var max = {
    name: "Max Rebo",
    id: "max",
    attack: 0,
    hp: 0,
    img: "images/max.png",
    player: false,
    opp: false,
    defeated: false
};

characterArray = [boshek, max, lobot, porkins];

// End of Character definitions

//Global Variables
var isPlayerSelected;
var isOppSelected;
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
    for(var i in characterArray){
        createCharacterDiv(characterArray[i],"char-select")
    }

    $(".middle").empty();
    $(".player").empty();
    $(".opp-list").empty();
    $(".current-opponent").empty();


    playerSelect();
}

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

function playerSelect() {
    $(".img-div-char-select").click(function (charClick) {

        if(isPlayerSelected){
            return;
        }

        switch (charClick.target.id){
            case "img-char-select-boshek":
                boshek.player = true;
                player = boshek;
                break;
            case "img-char-select-max":
                max.player = true;
                player = max;
                break;
            case "img-char-select-porkins":
                porkins.player = true;
                player = porkins;
                break;
            default:
                lobot.player = true;
                player = lobot;
        }

        $(".player").append("<h2>" + player.name + "</h2>"); //Add character name to play area
        createCharacterDiv(player, "player"); //Creates player image/stats element

        $(".opp-list").append("<h1>Your Opponents</h1>");
        for(var i in characterArray)
        {
            if(characterArray[i].player == false){
                createCharacterDiv(characterArray[i],"opp-list");
                characterArray[i].opp = true;
            }
        }

        isPlayerSelected = true;
        $(".char-select").html("<h1>Fight!</h1>");
        opponentSelect();
    });
}

function opponentSelect() {
    $(".img-div-opp-list").click(function (oppClick) {

        if (isOppSelected) {
            return;
        }

        switch (oppClick.target.id) {
            case "img-opp-list-boshek":
                currentOpponent = boshek;
                break;
            case "img-opp-list-max":
                currentOpponent = max;
                break;
            case "img-opp-list-porkins":
                currentOpponent = porkins;
                break;
            default:
                currentOpponent = lobot;
        }

        $(".middle").append("<h1>Vs.</h1>"); //Add Vs. Text
        $(".current-opponent").append("<h2>" + currentOpponent.name + "</h2>");
        createCharacterDiv(currentOpponent,"current-opponent");
        isOppSelected = true;
        $("#div-opp-list-" + currentOpponent.id).hide();

        battle();

    });


}

function battle() {

    $(".middle").append("<button class='btn btn-danger btn-lg' id='attack'>Attack</button>");

    $("#attack").click(function () {
        attack();
        checkForOppDefeat();
        checkForEndGame();
    });
}

function createCharacterDiv(object, panel){

    var div = $("<div class='img img-div-" + panel + "' id='div-" + panel + "-" + object.id + "'>");
    var image = $("<img src='" + object.img + "' class='image image-" + panel + "' id='img-" + panel + "-" + object.id + "'>");
    var stats = $("<p class = 'stats panel-" + panel + "'> Atk: " + object.attack + " HP: " + object.hp + "</p>");

    $("." + panel).append(div);
    div.append(image, stats);

}


function attack() {

    if(isOppSelected == false){
        return;
    }

    currentOpponent.hp -= (player.attack * attackCounter);
    player.hp -= currentOpponent.attack;
    attackCounter++;
    $('.panel-player').html("Atk: " + (player.attack * attackCounter) + " HP: " + player.hp);
    $('.panel-current-opponent').html("Atk: " + currentOpponent.attack + " HP: " + currentOpponent.hp);
}


function checkForOppDefeat(){
    if(currentOpponent.hp < 1){
        $(".current-opponent").empty();
        $(".middle").empty();
        isOppSelected = false;

        for(var i in characterArray){
            if (currentOpponent.id === characterArray[i].id){
                characterArray[i].defeated = true;
            }
        }
    }
}

function checkForEndGame() {

    if(player.hp < 1){
        $(".middle").html("<h2>You Lost.</h2>");
        endGame();
        return;
    }


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
    $(".char-select").html("<h1>Game Over</h1>");
    $(".middle").append("<button class='btn btn-primary btn-lg' id='restart'>Restart Game</button>");
    $("#restart").click(function () {
        gameStart();
    })
}