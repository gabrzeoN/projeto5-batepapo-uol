const main = document.querySelector("main");
let participants = [];
let participant = {
    name: null
};
let message = {
    from: null,
    to: "Todos",
    text: null,
    type: "message"
};

// ---------------------------------- PARTICIPANTS -------------------
function login(username){
    participant = {name: username};
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', participant);
    promise.then(namePosted);
    promise.catch(nameNotPosted);
}

function namePosted(response){
    message.from = participant.name;
    setInterval(function(){
        axios.post('https://mock-api.driven.com.br/api/v4/uol/status', participant);
    }, 5000);
    searchAllParticipants();
    setInterval(searchAllParticipants, 10000);
    searchAllMessages();
    setInterval(searchAllMessages, 3000);
}
    
function nameNotPosted(error){
    if(error.response.status === 400){
        login(prompt("Nome nulo ou já em uso, por favor escolha outro."));
    }else{
        console.log("Function nameNotPosted");
        console.log("Status code: " + error.response.status);
	    console.log("Error message: " + error.response.data);
    }  
}

// ---------------------------------- MESSAGES -------------------
function searchAllMessages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(showAllMessages);
    promise.catch(messagesNotFound);
}

function messagesNotFound(error){
    console.log("Function messagesNotFound");
    console.log("Status code: " + error.response.status);
	console.log("Error message: " + error.response.data);
}

function showAllMessages(response){
    main.innerHTML = "";
    for(let i = 0; i < response.data.length; i++){
        if(response.data[i].type === "status"){
            showStatusMessage(response.data[i]);
        }else if(response.data[i].type === "message"){
            showNormalMessage(response.data[i]); 
        }else if(response.data[i].type === "private_message"){
            if(response.data[i].from === participant.name || response.data[i].to === participant.name){
                showReservedMessage(response.data[i]);
            }
        }else{
            console.log("Algo deu errado com o tipo da mensagem.");
            console.log(response.data[i]);
        }
        main.scrollIntoView({block: "end"});
    }
}

function showStatusMessage(message){
    main.innerHTML += `
    <p data-identifier="message" class="status-message message"><time>(${message.time}) </time><strong>${message.from} </strong>${message.text}</p>
    `;
}

function showNormalMessage(message){
    main.innerHTML += `
    <p data-identifier="message" class="normal-message message"><time>(${message.time}) </time><strong>${message.from} </strong>para <strong>${message.to}: </strong>${message.text}</p>
    `;
}

function showReservedMessage(message){
    main.innerHTML += `
    <p data-identifier="message" class="reserved-message message"><time>(${message.time}) </time><strong>${message.from} </strong>reservadamente para <strong>${message.to}: </strong>${message.text}</p>
    `;
}

function sendMessage(){
    message.text = document.querySelector("footer .text input").value;
    document.querySelector("footer .text input").value="";
    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', message);
    promisse.then(searchAllMessages);
    promisse.catch(function(){
        alert("Usuário não está online!");
        window.location.reload()
    });
}

// ---------------------------------- PARTICIPANTS -------------------
function searchAllParticipants(){
    const promisse = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
    promisse.then(showAllParticipants);
    promisse.catch(participantNotFound);
}

function participantNotFound(error){
    console.log("Function searchAllParticipants");
    console.log("Status code: " + error.response.status);
	console.log("Error message: " + error.response.data);
}

function showAllParticipants(response){
    participants = response.data;
    const contacts = document.querySelector(".contacts ul");
    contacts.innerHTML = `
    <li data-identifier="participant">
        <ion-icon name="people"></ion-icon>
        <p>Todos</p>
        <ion-icon name="checkmark-outline"></ion-icon>
    </li>
    `;
    for(let i = 0; i < response.data.length; i++){
        contacts.innerHTML += `
        <li data-identifier="participant">
            <ion-icon name="person-circle"></ion-icon>
            <p>${response.data[i].name}</p>
        </li>
        `;
    }

}

function openSidebar(){
    document.querySelector("aside").classList.remove("hidden");
}

function closeSidebar(){
    document.querySelector("aside").classList.add("hidden");
}

login(prompt("Escolha um nome: "));