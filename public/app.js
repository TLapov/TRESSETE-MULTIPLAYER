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
    const playerOne = document.createElement('div');
    const playerTwo = document.createElement('div');
    const playerOneCards = document.createElement('ul');
    const playerTwoCards = document.createElement('ul');

    socket.on('deck-cards', (cards) => {
        cards.forEach(card => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = card.img;
            li.append(img);
            playerOneCards.append(li);
            li.addEventListener('click', (card) => {
                socket.emit('socket-card', card);
            });
        });
    });

    container.classList = 'game-container';
    playerOne.classList = 'player-one';
    playerTwo.classList = 'player-two';
    playerOne.append(playerOneCards);
    playerTwo.append(playerTwoCards);

    container.append(playerOne);
    container.append(playerTwo);

    gameSection.innerHTML = '';
    gameSection.append(container);
}

function toast(msg) {
    const div = document.createElement('div');
    div.className = 'alert';
    div.textContent = msg;
    document.body.append(div)
    setTimeout(() => div.remove(), 4000);
}

