function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// varible
const arr = [];
let openedCardsArr = [];
let comparingReturn;
let moves = 0;
const hearts = document.getElementById("heart");
const timer = document.getElementById("timer");
const stop = document.getElementById("restart");
let time = 0;
let timerId = 0;
let timerOut = true;
let allCards = [];


//functions
function check2Cards (cardsArray){
    let firstCard;
    let secondCard;
    let comparingResult;
    let arrLength = cardsArray.length;
    firstCard = cardsArray[0];
    secondCard = cardsArray[1];
    if (firstCard == secondCard){
        comparingResult = true;

    } else {
        comparingResult = false;
        arr.length = 0;
    }
    return comparingResult;
}

function removeHeart() {
        if (moves == 8 || moves == 16 || moves == 24){
            hearts.removeChild(hearts.lastElementChild);
        }
}

function resetCards() {
    for (let card of cards){
        card.classList.remove("open");
        card.classList.remove("match");
    }
}

function resetMoves() {
    moves = 0;
    document.getElementById("moves").textContent = `${moves} moves`;
}

function resetHeart() {
            hearts.innerHTML = "";
            hearts.innerHTML = "<li><i class=\"bi bi-heart-fill\"></i></li> <li><i class=\"bi bi-heart-fill\"></i></li><li><i class=\"bi bi-heart-fill\"></i></li>"
}

const initTimer = () => {
    timerOut = false;
    timerId = setInterval(() => {
        time++;
        timerCount();
    }, 1000);
};


const timerCount = () => {
    const min = Math.floor(time/60);
    const sec = time % 60;
    if (sec < 10){
        timer.innerHTML = `${min}:0${sec}`;
    } else {
        timer.innerHTML = `${min}:${sec}`;
    }
};

const stopTimer = () => {
    clearInterval(timerId);
    initTimer();
    
}


// event listeners
const cards = document.querySelectorAll(".card");
for (let card of cards){
    card.addEventListener("click",function(event){
        event.target.classList.add("open");
    })
}


const openedCards = document.querySelectorAll(".card");
for (let card of openedCards){
    card.addEventListener("click",function(event){
        arr.push(card.firstElementChild.className);
        if (arr.length == 2){
            comparingReturn = check2Cards(arr);
            if (comparingReturn == false){
                setTimeout(function(){
                    event.target.classList.remove("open");
                    openedCardsArr[0].target.classList.remove("open");
                    moves++;
                    removeHeart();
                    document.getElementById("moves").textContent = `${moves} moves`;
                }, 800);
                
            } else if (comparingReturn == true) {
                setTimeout(function(){
                    event.target.classList.add("match");
                    openedCardsArr[0].target.classList.add("match");
                    openedCardsArr.length = 0;
                    arr.length = 0;
                    moves++;
                    removeHeart();
                    document.getElementById("moves").textContent = `${moves} moves`;
                }, 800);
            }
        } else {
            openedCardsArr.length = 0;
            openedCardsArr.push(event);
        }
        
        
    })
}


stop.addEventListener("click", function(){
    stopTimer();
    timerOut = true;
    time = 0;
    timerCount();
    resetCards();
    resetMoves();
    resetHeart();
    allCards = [];
    for (let card of cards){
        allCards.push(card.firstElementChild.className);
        allCards.unshift();
    }
    shuffleCurrentArr(shuffle(allCards));
})

setTimeout(function(){
    initTimer();
}, 400);


function shuffleCurrentArr(array){
    var element = document.querySelectorAll(".card i")
    for(let x = 0; x< element.length; x++){
        element[x].className = allCards[x];
    }
}