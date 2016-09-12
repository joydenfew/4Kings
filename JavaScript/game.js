var cardArray = [];
var KingsLeft = 4;
var actionLock = false;
var currentCardObject;

//card object
function card(title,shortRule,longRule,color)
{
   this.cardTitle=title;
   this.CardShortRule=shortRule;
   this.cardLongRule=longRule;
   this.cardColour=color;
}

//reads full gamefile form server
function readS(name){
    if(name == null){
        name = "default.txt";
    }
    
    var fileName = "gameRules/" + name;
    $.get(fileName, function(data){
        
        //data is the text file so now parse it into the game rules
        var lines = data.split('\n');
        for(var i = 0;i < lines.length;i++){
            //code here using lines[i] which will give you each line
            var tokens = lines[i].split(',');  
            var cardTemp = new card(tokens[0], tokens[1], tokens[2], tokens[3]);
            cardArray.push(cardTemp);
            //warning message about saftey
            //alert("");
        }
    });
}

//reads in short rule file from server
function readSC(name){
    if(name == null){
        name = "defaultC.txt";
        
    }
    
    var fileName = "gameRules/" + name;
    $.get(fileName, function(data){
        
        //data is the text file so now parse it into the game rules
        var lines = data.split('\n');
        for(var i = 0;i < lines.length;i++){
            //code here using lines[i] which will give you each line
            var tokens = lines[i].split(',');  
            var cardTemp = new card(tokens[0], tokens[1], tokens[2], "black");
            cardArray.push(cardTemp);
            cardTemp = new card(tokens[0], tokens[1], tokens[2], "black");
            cardArray.push(cardTemp);
            cardTemp = new card(tokens[0], tokens[1], tokens[2], "red");
            cardArray.push(cardTemp);
            cardTemp = new card(tokens[0], tokens[1], tokens[2], "red");
            cardArray.push(cardTemp);
            //warning message about saftey
            //alert("");
        }
    });
}


//is called on button click
function action(){
    if(!actionLock){
        var curCard = nextCard();
        var gameOver = forthKing();
        displayCard(curCard);
        if(gameOver){
            actionLock = true;
            displaysGameOver();
            
        }
    }
    else{
        alert("Game Over! Drink the vessel!!! ~To play again press 'refresh'");
    }
}

//lets you set up game
function menu(){
    
}

//puts the current card on screen
function displayCard(thisCard){
    currentCardObject = thisCard;
    
    var title = document.getElementById("face");
    var text = document.getElementById("simpleRule");
    
    title.textContent = thisCard.cardTitle;
    text.textContent = thisCard.CardShortRule;
    
    if(forthKing()){
        text.textContent = "4th King! Drink The Vessel!!"
    }
    
}

//builds a dom tree for displaying each card
function buildPage(){
    var mn = document.getElementById("menu");
    mn.style.display = "none";
    var game = document.getElementById("game");
    game.style.display = "block";
}

//builds the menu
function buildMenu(){
    
}

//displays game over
function displaysGameOver(){
    
}

function nextCard(){
    var x = Math.floor(cardArray.length * Math.random());
    var y = cardArray[x];
    //error checking
    if(y == null){
        alert("Deck failure");
    }
    if(y.cardTitle == ""){
        alert("bad draw");
        return nextCard();
    }
    
    //remove that element
    cardArray.splice(x, 1);
    if (y.cardTitle == "K") { 
        KingsLeft = KingsLeft - 1; 
    }
    return y;
}

function forthKing(){
    if(KingsLeft == 0){
        //display message
        return true;
    }
    return false;
}

function quickPlay(){
    readS();
    buildPage();
    KingsLeft = 4;
}


function showFullRule(){
    var tx = currentCardObject.cardLongRule;
    alert(tx);
}