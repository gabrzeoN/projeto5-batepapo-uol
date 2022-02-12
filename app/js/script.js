const main = document.querySelector("main");

let responseMessageData = null;
let responseParticipantData = null;
let participant = {};
// let name = "";
// ---------------------------------- PARTICIPANTS -------------------

function login(username){
    participant = {name: username};
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', participant);
    promise.then(namePosted);
    promise.catch(nameNotPosted);
}

function namePosted(response){
    setInterval(onlineStatus, 5000);
    setInterval(searchMessages, 3000);
}
    
function nameNotPosted(error){
    if(error.response.status === 400){
        login(prompt("Nome nulo ou já em uso, por favor escolha outro."));
    }else{
        console.log("nameNotPosted: not 400");
    }  
}

function onlineStatus(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', participant);
    promise.then(online);
    // promise.catch(nameNotPosted);
}

function online(response){
    // console.log(response.data);
    console.log("nome vai ficar no servidor");
}

// login("BBBBBBBBBBBBBBBBBBBB");
login(prompt("Escolha um nome: "));

// ---------------------------------- PARTICIPANTS -------------------
// function searchParticipants(){
//     const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
//     promise.then(participantsFound);
//     promise.catch(participantsNotFound);
// }

// function participantsFound(response){
//     responseParticipantData = response.data
//     console.log(response.data);
//     validateName();
// }

// function participantsNotFound(error){
//     console.log(error.response);
// }

// function validateName(){
//     // let name = prompt("Insira seu nome:");
//     let name = "BBBBBBBBBBBBBBBBBBBB";
//     while(invalidName(name)){
//         alert("Nome já existe, por favor escolha outro.");
//         name = prompt("Insira seu nome:");
//     }
//     const participant = {name: name};
//     const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', participant);
//     promise.then(namePosted);
//     promise.catch(nameNotPosted);
// }

// function invalidName(checkName){
//     if(checkName === null || checkName === "" || checkName === undefined){
//         return true;
//     }
//     for(let i = 0; i < responseParticipantData.length; i++){
//         if(checkName === responseParticipantData.name){
//             console.log("aa");
//             return true;
//         }
//     }
//     return false;
// }

// function namePosted(response){
//     console.log(response.data);
// }

// function nameNotPosted(error){
//     console.log(error.response);
// }
// ---------------------------------- MESSAGES -------------------
function searchMessages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(messagesFound);
    promise.catch(messagesNotFound);
}

function messagesFound(response){
    responseMessageData = response.data;
    // validateName();
}

function messagesNotFound(error){
    console.log(error.response);
}










// FROM TO TEXT TYPE TIME
function showMessages(response){
    responseMessageData = response.data;
    console.log(response);
    for(let i = 0; i < response.data.length; i++){
        if(response.data[i].type === "status"){
            showStatusMessage(response.data[i]);
        }else if(response.data[i].type === "message"){
            if(response.data[i].to === "Todos"){
                showNormalMessage(response.data[i]);
            }else{
                showReservedMessage(response.data[i]);
            }
        }else{// ERROR CONTROL
            console.log("Algo deu errado com o tipo da mensagem.");
            console.log(response.data[i]);
        }
        console.log(response.data[i]);
    }
}

// FROM TO TEXT TYPE TIME
function showStatusMessage(message){
    main.innerHTML += `
    <p class="status-message"><span>(${message.time}) </span><strong>${message.from} </strong>${message.text}</p>
    `

    //message.time;   //(00:00:00)
    //message.from;   //Maria
    //message.text;   //sai da sala...
}

function showNormalMessage(message){
    main.innerHTML += `
    <p class="normal-message"><span>(${message.time}) </span><strong>${message.from} </strong>para <strong>${message.to}: </strong>${message.text}</p>
    `

    //message.time;   //(00:00:00)
    //message.from;   //Maria
                    //para
    //message.to;     //Todos
                    //:
    //message.text;   //Que dia quente!!
}

function showReservedMessage(message){
    main.innerHTML += `
    <p class="reserved-message"><span>(${message.time}) </span><strong>${message.from} </strong>reservadamente para <strong>${message.to}: </strong>${message.text}</p>
    `

    //message.time;   //(00:00:00)
    //message.from;   //Maria
                    //reservadamente para
    //message.to;     //João
                    //:
    //message.text;   //João, eu te amio!!! amie-me back!
}

// login("BBBBBBBBBBBBBBBBBBBB");
// login(null);
// login(prompt("Escolha um nome: "));
// login("");
// searchParticipants();
// searchMessages();