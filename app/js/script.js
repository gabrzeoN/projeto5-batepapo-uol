const main = document.querySelector("main");
let allMessagesLoaded = false;
let participant = {};

// ---------------------------------- PARTICIPANTS -------------------
function login(username){
    participant = {name: username};
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', participant);
    promise.then(namePosted);
    promise.catch(nameNotPosted);
}

function namePosted(response){
    setInterval(function(){
        axios.post('https://mock-api.driven.com.br/api/v4/uol/status', participant);
    }, 5000);
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
    if(!allMessagesLoaded){
        promise.then(showAllMessages);
        allMessagesLoaded = true;
    }else{
        promise.then(showNewMessages);
    }
    promise.catch(messagesNotFound);
}

function messagesNotFound(error){
    console.log("Function messagesNotFound");
    console.log("Status code: " + error.response.status);
	console.log("Error message: " + error.response.data);
}

function showAllMessages(response){
    for(let i = 0; i < response.data.length; i++){
        if(response.data[i].type === "status"){
            showStatusMessage(response.data[i]);
        }else if(response.data[i].type === "message"){
            showNormalMessage(response.data[i]); 
        }else if(response.data[i].type === "private_message"){
            showReservedMessage(response.data[i]);
        }else{// ERROR CONTROL
            console.log("Algo deu errado com o tipo da mensagem.");
            console.log(response.data[i]);
        }
    }
}

function showNewMessages(response){
    let i = 100;
    while(response.data[i] === ){

    }
    
}



// FROM TO TEXT TYPE TIME
function showStatusMessage(message){
    main.innerHTML += `
    <p class="status-message"><span>(${message.time}) </span><strong>${message.from} </strong>${message.text}</p>
    `;
}

function showNormalMessage(message){
    main.innerHTML += `
    <p class="normal-message"><span>(${message.time}) </span><strong>${message.from} </strong>para <strong>${message.to}: </strong>${message.text}</p>
    `;
}

function showReservedMessage(message){
    main.innerHTML += `
    <p class="reserved-message"><span>(${message.time}) </span><strong>${message.from} </strong>reservadamente para <strong>${message.to}: </strong>${message.text}</p>
    `;
}

login("BBBBBBBBBBBBBBBBBBB");
// login(null);
// login(prompt("Escolha um nome: "));
// login("");
// searchParticipants();
// searchMessages();






    //message.time;   //(00:00:00)
    //message.from;   //Maria
    //message.text;   //sai da sala...



    //message.time;   //(00:00:00)
    //message.from;   //Maria
                    //para
    //message.to;     //Todos
                    //:
    //message.text;   //Que dia quente!!


    //message.time;   //(00:00:00)
    //message.from;   //Maria
                    //reservadamente para
    //message.to;     //João
                    //:
    //message.text;   //João, eu te amio!!! amie-me back!