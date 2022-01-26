
const socket = io('ws://localhost:8080');

socket.on('message', text => {
    // TODO: Receive and display message
});

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}
