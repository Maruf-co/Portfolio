import { io } from 'socket.io-client';

const socket = io('https://fwd.innopolis.app')

const form = document.getElementById('form') as HTMLFormElement;
const input = document.getElementById('input') as HTMLFormElement;
const messages = document.getElementById('messages') as HTMLFormElement;
const username = document.getElementById('username') as HTMLFormElement;


type Message = { username: string; message: string };
const myMessage: Message = {
    username: username.value,
    message: input.value,
};
socket.emit('chat message', myMessage);

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

});

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = input.value;
    if (message === '') return; // Prevent sending an empty message
    socket.emit('chat message', message);
    input.value = '';
})

