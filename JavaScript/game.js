var cardArray = [];
var KingsLeft = 4;
var actionLock = false;

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
        if(gameOver){
            actionLock = true;
            displaysGameOver();
        }
        else displayCard(curCard);
    }
}

//lets you set up game
function menu(){
    
}

//puts the current card on screen
function displayCard(thisCard){
    
}

//builds a dom tree for displaying each card
function buildPage(){
    
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
    if(KingsLeft == 1){
        //display message
        return true;
    }
    return false;
}

function quickPlay(){
    KingsLeft = 4;
    readS();
}