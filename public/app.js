const socket = io();
const gameSection = document.querySelector('.game-section');

window.addEventListener('load', () => { gameSection.appendChild(createUserNameUI()) });

function createUserNameUI() {
    const container = document.createElement('div');
    const form = document.createElement('form'); 
    const input = document.createElement('input');
    const button = document.createElement('button');

    container.className = 'username-container';
    form.className = 'username-form';
    input.type = 'text';
    input.placeholder = 'Enter a username';
    button.type = 'submit';
    button.textContent = 'Create username';

    button.addEventListener('click', (e) => {
        e.preventDefault();
        if(input.value) {
            socket.emit('set-username', input.value, (response) => {
                toast(response.msg);
                response.success && createRoomUI();
            });
        }
    });

    form.append(input);
    form.append(button);

    container.appendChild(form);

    return container;
}

function createRoomUI() {
    const container = document.createElement('div');
    const form = document.createElement('form'); 
    const input = document.createElement('input');
    const button = document.createElement('button');
    const roomsContainer = document.createElement('div');
    const ul = document.createElement('ul');

    socket.on('rooms-list', (rooms) => {
        rooms.forEach(room => {
            const li = document.createElement('li');
            li.textContent = room;
            ul.append(li);
            li.addEventListener('click', () => {
                socket.emit('join-room', room, (response) => {
                    toast(response.msg);
                    if(response.success) {
                        socket.emit('start-game', room);
                        createGameUI();
                    }
                });
            });
        })
    });  

    container.className = 'room-container';
    form.className = 'room-form';
    input.type = 'text';
    input.placeholder = 'Enter a room';
    button.type = 'submit';
    button.textContent = 'Create a room';

    form.append(input);
    form.append(button);
    roomsContainer.append(ul);
    container.append(form);
    container.append(roomsContainer);

    gameSection.innerHTML = '';
    gameSection.append(container);

    button.addEventListener('click', (e) => {
        e.preventDefault();
        if(input.value) {
            socket.emit('create-room', input.value, (response) => {
                toast(response.msg);
                response.success && createGameUI();
            });
        }
    });

}

function createGameUI() {
    const container = document.createElement('div');
    container.classList = 'game-container';

    const showContainer = document.createElement('div');
    showContainer.classList = 'game-container__show-container';

    const playerOne = document.createElement('div');
    playerOne.classList = 'game-container__player-one';
    const playerTwo = document.createElement('div');
    playerTwo.classList = 'game-container__player-two';

    const playerOneCards = document.createElement('ul');
    const playerTwoCards = document.createElement('ul');

    playerOne.append(playerTwoCards);
    playerTwo.append(playerOneCards);

    container.append(playerOne);
    container.append(playerTwo);

    gameSection.innerHTML = '';
    gameSection.append(container);
    
    socket.on('deck-cards', (cards) => {
        cards.forEach(card => {
            const li = document.createElement('li');
            li.dataset.category = card.category;
            const img = document.createElement('img');
            img.src = card.img;

            li.append(img);
            playerOneCards.append(li);
            addOpponentCard();
            li.addEventListener('click', (e) => play(e,card));
        });
    });

    socket.on('show-card', card => showCard(card));

    socket.on('rm-opponent-card', () => {
        const cardList = playerTwoCards.querySelectorAll('li');
        const randomNum = Math.floor(Math.random() * 10);
        cardList[randomNum].remove();
    });

    socket.on('get-card', (card) => {
        const img = document.createElement('img');
        const li = Array.from(playerOne.querySelectorAll('li')).find(li => li.childElementCount === 0);
        li.dataset.category = card.category;
        img.src = card.img;
        li.append(img);
        showContainer.innerHTML = '';
        addOpponentCard();
    });

    function addOpponentCard() {
        const opponentLi = document.createElement('li');
        const opponentImg = document.createElement('img');

        opponentImg.src = 'assets/backside.png';
        opponentLi.append(opponentImg);
        playerTwoCards.append(opponentLi);
    }

    function play(e, card) {
        const li = e.currentTarget;
        const prevCard = showContainer.firstChild;
        if(prevCard) {
            const category = prevCard.getAttribute('data-category');
            const list = Array.from(playerOne.querySelectorAll('li')).filter(l => l.getAttribute('data-category') === category);
            const match = list.find(l => l.getAttribute('data-category') === li.dataset.category);
            if(list.length && !match) {
                toast('Choose right card');
            }else {
                socket.emit('play-game', card, () => li.querySelector('img').remove());
            }
        }else {
            socket.emit('play-game', card, () => li.querySelector('img').remove());
        }      
    };

    function showCard(card) {
        const div = document.createElement('div');
        const img = document.createElement('img');
    
        img.src = card.img;
        div.className = 'get-card-container';
        div.dataset.category = card.category;
        
        div.append(img);
        showContainer.append(div);
        container.append(showContainer);
    }
}

function toast(msg) {
    const div = document.createElement('div');
    div.className = 'alert';
    div.textContent = msg;
    document.body.append(div)
    setTimeout(() => div.remove(), 4000);
}


