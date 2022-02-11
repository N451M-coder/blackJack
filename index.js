var sdeck = [];
var dvalue = 0;
//creates the deck of 52 cards
function createDeck() {
    const SUITS = ['♥', '♦', '♠', '♣'];
    const RANK = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let i = 0; i < SUITS.length; i++) {
        for (let j = 0; j < RANK.length; j++) {
            deck.push(RANK[j] + SUITS[i]);
        }
    }
    return deck;
}

//* Randomize array in-place using Durstenfeld shuffle algorithm */
function getShuffledDeck() {
    let deck = createDeck();
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}

//get exact color as per suit
function getColor(card) {
    let suit = card.charAt(1);
    let color = (suit == '♥' || suit == '♦') ? "red" : "black";
    return color;
}

//returns the value of one indiviadual card
function getIndividualCardValue(card) {
    let cureentValue = document.querySelector('.cvalue');
    let rank = card.charAt(0);
    switch (rank) {

        case '2': return rank;
            break;
        case '3': return rank;
            break;
        case '4': return rank;
            break;
        case '5': return rank;
            break;
        case '6': return rank;
            break;
        case '7': return rank;
            break;
        case '8': return rank;
            break;
        case '9': return rank;
            break;
        case '10': return rank;
            break;
            break;
        case 'A': if (cureentValue + 10 > 21) {
            return "1";
        } else {
            return "10";
        }
            break;
        default:
            return "10"
            break;
    }

}

//creating html card to display
function createUserCard(deck) {
    let userCardContainer = document.querySelector(".user-card-container");
    let newcard = document.createElement("span");
    newcard.className = "user-card"
    newcard.innerHTML = deck[0];
    newcard.style.color = getColor(deck[0]);
    userCardContainer.appendChild(newcard);
    setCardValue(getIndividualCardValue(deck[0]))
    removeCardFromDeck(deck, deck[0]);
}

//creating delaer card to display
function createDealerCard(deck) {
    let dealerCardContainer = document.querySelector(".dealer-card-container");
    let newCard = document.createElement("span");
    newCard.className = "dealer-card";
    newCard.style.color = getColor(deck[0]);
    newCard.innerHTML = deck[0];
    dealerCardContainer.appendChild(newCard);
    dvalue = dvalue + parseInt(getIndividualCardValue(deck[0]));
    removeCardFromDeck(deck, deck[0])
}

function removeCardFromDeck(deck, card) {
    const index = deck.indexOf(card);
    if (index > -1) {
        deck.splice(index, 1);
    }
}
//setting card value every time user hit for a card
function setCardValue(val) {
    let valueElement = document.querySelector('.cvalue');
    let presentValue = valueElement.innerHTML;
    valueElement.innerHTML = parseInt(presentValue) + parseInt(val);
}

//function to delete the card from html before starting the game
function removeCardFromHTMLDOM() {
    let dccontainer = document.querySelector(".dealer-card-container");
    if (dccontainer) { dccontainer.innerHTML = ''; }
    let uccontainer = document.querySelector(".user-card-container")
    if (uccontainer) {
        uccontainer.innerHTML = '';
    }
    let valueElement = document.querySelector('.cvalue');
    valueElement.innerHTML = "0";
    let parentNode = document.querySelector(".notice-board");
    let noticeele = document.createElement("span");
    noticeele.innerHTML = "Your card value is ";
    noticeele.className = "notice";
    
    parentNode.insertBefore(noticeele, parentNode.firstChild)
}

//initiation function when user clicks on play
function play() {
    dvalue = 0;
    removeCardFromHTMLDOM();
    sdeck = getShuffledDeck();
    createDealerCard(sdeck);
    createUserCard(sdeck);
    createUserCard(sdeck);
}

//hit method to calculate the winner
function hit() {
    createUserCard(sdeck);
    let valueElement = document.querySelector('.cvalue');
    let presentValue = valueElement.innerHTML;
    if (presentValue > 21) {
        valueElement.innerHTML = "you busted and lost, click PLAY to play again"
        document.querySelector('.notice').remove();
    }
}

// stand function to calculate winnner once the user finalize his card
function stand() {
    let valueElement = document.querySelector('.cvalue');
    let uvalue = valueElement.innerHTML;
    for (let i = 0; i < 5; i++) {
        createDealerCard(sdeck);
        if (dvalue > uvalue && dvalue < 22) {
            valueElement.innerHTML = "Dealer won, click PLAY to play again"
            document.querySelector('.notice').remove();
            break;
        }
        if (dvalue > 21) {
            valueElement.innerHTML = "You won, click PLAY to play again"
            document.querySelector('.notice').remove();
            break;
        }
    }

}

let hitbtn = document.querySelector(".hit")
hitbtn.addEventListener('click', hit);

let standButton = document.querySelector(".stand");
standButton.addEventListener("click", stand);
//calls play automatically once game is loaded
window.onload = function() {
    play();
  };