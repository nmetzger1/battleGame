//Character Objects
var Luke = {
    name: "Luke Skywalker",
    id: "luke",
    attack: 8,
    hp: 110,
    img: "images/luke.png",
    player: false,
    opp: false,
    defeated: false
};
var Han = {
    name: "Han Solo",
    id: "han",
    attack: 25,
    hp: 110,
    img: "images/han.png",
    player: false,
    opp: false,
    defeated: false
};

var Kenobi = {
    name: "Obi-Wan Kenobi",
    id: "kenobi",
    attack: 8,
    hp: 110,
    img: "images/kenobi.png",
    player: false,
    opp: false,
    defeated: false
};

var Vader = {
    name: "Darth Vader",
    id: "vader",
    attack: 8,
    hp: 110,
    img: "images/vader.png",
    player: false,
    opp: false,
    defeated: false
};

characterArray = [Luke, Han, Kenobi, Vader];

// End of Character definitions

//Global Variables
var isPlayerSelected = false;
var isOppSelected = false;
var player = {};
var currentOpponent = {};
var attackCounter = 1;


function playerSelect() {
    $(".user-char").click(function (charClick) {

        if(isPlayerSelected){
            return;
        }

        switch (charClick.target.id){
            case "luke":
                Luke.player = true;
                player = Luke;
                break;
            case "han":
                Han.player = true;
                player = Han;
                break;
            case "kenobi":
                Kenobi.player = true;
                player = Kenobi;
                break;
            default:
                Vader.player = true;
                player = Vader;
        }

        $('<img src="' + player.img + '">').appendTo(".player");

        for(i = 0; i < characterArray.length; i++){
            if(characterArray[i].player == false){
                $('<img src="' + characterArray[i]  .img + '" class="opp" id= opp-' + characterArray[i].id + '>').appendTo(".opponents");
                characterArray[i].opp = true;
            }
            $("#" + characterArray[i].id).hide();
        }

        isPlayerSelected = true;
        opponentSelect();
    });
}

function opponentSelect() {
    $(".opp").click(function (oppClick) {

        if (isOppSelected) {
            return;
        }

        switch (oppClick.target.id) {
            case "opp-luke":
                currentOpponent = Luke;
                break;
            case "opp-han":
                currentOpponent = Han;
                break;
            case "opp-kenobi":
                currentOpponent = Kenobi;
                break;
            default:
                currentOpponent = Vader;
        }

            $('<img src="' + currentOpponent.img + '" id="current-' + currentOpponent.id + '">').appendTo(".current-opponent");
            isOppSelected = true;
            $("#opp-" + currentOpponent.id).hide();

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

function attack() {

    if(isOppSelected == false){
        return;
    }

    currentOpponent.hp -= (player.attack * attackCounter);
    player.hp -= currentOpponent.attack;
    console.log("Attack", player.attack * attackCounter);
    console.log("Opp HP", currentOpponent.hp);
    console.log("Player HP", player.hp);
    attackCounter++;
}


function checkForOppDefeat(){
    if(currentOpponent.hp < 1){
        $("#current-"+currentOpponent.id).hide();
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