// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";
const socket = io();

// Functions
function sentUserId({sID, message}){
    vm.socketID = sID;
};

function runDisconnectMessage(packet){
    console.log(packet);
};

function appendNewMessage(msg){
    vm.messages.push(msg);
    vm.$nextTick(function(){
        let messagesContainer = document.querySelector('#messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    
}

//this is our main Vue instance
const vm = new Vue({
    data: {
        socketID : "",
        messages: [],
        message: "",
        username: "",
        state: 0
    },

    methods: {
        dispatchMessage(){
            // emit the message event and send a message to the sever
            socket.emit('chat_message', {
                content: this.message,
                name: this.username || 'anonymous'
            })
            this.message = "";
        },
        setUsername(){
            socket.emit('join', this.username);
            this.nickName = '';
            this.state = 1;
        },
        continueAnonimous(){
            socket.emit('join', null);
            this.state = 1;
        }   
    },

    components: {
        newmessage: ChatMessage
    },

    mounted: function(){
        
    }

}).$mount("#app");

// some event handling -> these events are coming from the server
socket.addEventListener('connected', sentUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);

// 
// Adding JS animations
