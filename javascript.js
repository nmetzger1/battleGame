//Character Objects
var boshek = {
    name: "BoShek",
    id: "boshek",
    attack: 8,
    hp: 110,
    img: "images/boshek.png",
    player: false,
    opp: false,
    defeated: false
};
var lobot = {
    name: "Lobot",
    id: "lobot",
    attack: 25,
    hp: 50,
    img: "images/lobot.png",
    player: false,
    opp: false,
    defeated: false
};

var porkins = {
    name: "Jek Porkins",
    id: "porkins",
    attack: 10,
    hp: 93,
    img: "images/porkins.png",
    player: false,
    opp: false,
    defeated: false
};

var max = {
    name: "Max Rebo",
    id: "max",
    attack: 13,
    hp: 80,
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

    for(var i in characterArray){
        createCharacterDiv(characterArray[i],"char-select")
    }
    playerSelect();
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

        $('<img src="' + player.img + '">').appendTo("#player-img");
        $('.player-stats').html("Atk: " + player.attack + " HP: " + player.hp);

        for(var i in characterArray)
        {
            if(characterArray[i].player == false){
                createCharacterDiv(characterArray[i],"opp-list");
                characterArray[i].opp = true;
            }
        }

        isPlayerSelected = true;
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

        createCharacterDiv(currentOpponent,"current-opponent");
        isOppSelected = true;
        $("#div-opp-list-" + currentOpponent.id).hide();

    });

    battle();
}

function battle() {
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
    $('.player-stats').html("Atk: " + (player.attack * attackCounter) + " HP: " + player.hp);
    $('.panel-current-opponent').html("Atk: " + currentOpponent.attack + " HP: " + currentOpponent.hp);
}


function checkForOppDefeat(){
    if(currentOpponent.hp < 1){
        $(".img-div-current-opponent").hide();
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
        alert("You Lose.");
        return;
    }


    for(var i in characterArray)
    {
        if(characterArray[i].defeated == false && characterArray[i].opp == true){
            return;
        }
    }

    alert("You Win!");
}

function checkForLoss(){
    if(player.defeated){
        alert("You Lose!");
    }
}