// imports always go first - if we're importing anything


const socket = io();

function sentUserId(packet){
    console.log(packet);
};

function runDisconnectMessage(packet){
    console.log(packet);
}

// some event handling -> these events are coming from the server
socket.addEventListener('connected', sentUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);