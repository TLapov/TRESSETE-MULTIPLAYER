const socket = io();
const gamerContainer = document.querySelector('.game-container');

window.addEventListener('load', () => { gamerContainer.appendChild(createUserNameUI()) });

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
        let error = null;
        if(input.value) {
            socket.emit('set-username', input.value);
            socket.on('response-username', (msg, err) => {
                if(err) {
                    toast(msg);
                }else {
                    toast(msg);
                    createRoomUI();
                }
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
        if(rooms) {
            rooms.forEach(room => {
                const li = document.createElement('li');
                li.textContent = room;
                ul.append(li);
                li.addEventListener('click', () => {
                    socket.emit('join-room', room);
                    socket.on('response-join', (msg, err) => {
                        toast(msg);
                        if(!err) {
                            socket.emit('start-game', room);
                            createGameUI();
                        }
                    });
                });
            })
            roomsContainer.appendChild(ul);
        }
    })  

    container.className = 'room-container';
    form.className = 'room-form';
    input.type = 'text';
    input.placeholder = 'Enter a room';
    button.type = 'submit';
    button.textContent = 'Create a room';

    form.append(input);
    form.append(button);
    container.append(form);
    container.append(roomsContainer);

    gamerContainer.innerHTML = '';
    gamerContainer.append(container);

    button.addEventListener('click', (e) => {
        e.preventDefault();
        if(input.value) {
            socket.emit('create-room', input.value);
            socket.on('response-room', (msg, err) => {
                if(err) {
                    toast(msg);
                }else {
                    toast(msg);
                    createGameUI();
                }
            })
        }
    });

}


function createGameUI() {
    const container = document.createElement('div');
    const playerOne = document.createElement('div');
    const playerTwo = document.createElement('div');
    const playerOneUl = document.createElement('ul');
    const playerTwoUl = document.createElement('ul');

    container.className = 'start-game-container';

    socket.on('deck-cards', (cards) => {
        cards.forEach(card => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = card.img;
            li.append(img);
            playerOneUl.append(li);
            li.addEventListener('click', (card) => {
                socket.emit('socket-card', card);
            });
        });
    });

    socket.on('send-card', (card) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = card.img;
        li.append(img);
        li.addEventListener('click', card => socket.emit('socket-card', card));
    });

    playerOne.append(playerOneUl);
    playerTwo.append(playerTwoUl);
       
    container.append(playerOne);
    container.append(playerTwo);

    gamerContainer.innerHTML = '';
    gamerContainer.append(container);
}

function toast(msg) {
    const div = document.createElement('div');
    div.className = 'alert';
    div.textContent = msg;
    document.body.append(div)
    setTimeout(() => div.remove(), 4000);
}

