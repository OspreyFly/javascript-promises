deck_id = ''

async function shuffle(){
    request = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((res) =>{
        deck_id = res.data.deck_id;
    });
}

async function drawCard(deck_id){
    request = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    return request.data.cards[0];
}

function showCard(value, suit){
    content = document.getElementById('content');
    table = document.createElement('div');
    content.appendChild(table);
    card = document.createElement('span');
    card.innerHTML = `${value} ${suit}`;
    table.appendChild(card);
}

shuffle().then(() => {
    drawCard(deck_id).then((card) => {
        showCard(card.value, card.suit);
    })
})

document.getElementById('drawButton').addEventListener('click', () => {
    drawCard(deck_id).then((card) => {
        showCard(card.value, card.suit);
    });
});