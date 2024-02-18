const socket = io('http://localhost:8000')
const form = document.getElementById('send-form');
const msgInput = document.getElementById('msgInp');
const msgContainer = document.querySelector('.container');
var audio = new Audio('notification.mp3');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, `right`);
    socket.emit('send', message);
    msgInput.value = '';
})

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);

    if (position == 'left')
        audio.play();
}

let username = prompt('Enter Your Name');
socket.emit('new-user-joined', username);

socket.on('user-joined', name => {
    append(`${name} Joined The Chat`, 'left')
})

socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('chatLeft', name => {
    append(`${name} Left The Chat`, 'left')
})