const gameCon = document.getElementById("game");
const gameBttn = document.getElementById("bttn");

let temp;
let count= 0;
let score=0;
const colors = [
    'yellow',
    'orange',
    'red',
    'magenta',
    'purple',
    'yellow',
    'orange',
    'red',
    'magenta',
    'purple'
];

function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
  
        // Decrease counter by 1
        counter--;
  
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
  
    return array;
};



function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("DIV");
  
        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);
        newDiv.setAttribute("flipped", "false");
        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);
  
        // append the div to the element with an id of game
        gameCon.append(newDiv);
        //gameBttn.remove();
        //document.body.querySelector("SPAN").append(gameBttn);
    
    };
};

function handleCardClick(event) {
    //Prevents user from selecting flipped cards
    if(event.target.getAttribute("flipped")=="true"){
        console.log("Card has already been flipped!")
        return;
    };

    //Prevents user from attempting match more than two cards at a time
    count++;
    if(count>2) {
        setTimeout(function(){
            count=0;
        },1000);
        console.log("Clicking too fast!");
        return;
    }
    else {
        event.target.setAttribute("flipped","true");
        //Sets temp on first guess
        if(count==1){
            temp=event.target;
            return;
        }
        else if(event.target.classList.value!==temp.classList.value) {
            //Allows transition to be played on incorrect match
            score = score + 1;
            setTimeout(function() {
                event.target.setAttribute("flipped", "false");
                temp.setAttribute("flipped","false");
                temp ="";
                count=0;
            },1000);
        }
        //Gives a second delay after correct match
        else{
            score= score + 1;
            setTimeout(function(){count=0;},1000);
        }
            

    };

};

// when the DOM loads
let shuffledColors = shuffle(colors);
createDivsForColors(shuffledColors);