const main = document.querySelector("main");

let promise = null;
let responseData = null;

function validateName(){
    let name = null;
    while(invalidName(name)){
        name = prompt("Insira seu nome:")
        alert("Nome já existe, por favor escolha outro.");
    }

    // Put name on sever!

}

function invalidName(checkName){
    if(checkName === null || checkName === ""){
        return true;
    }
    for(let i = 0; i < responseData.length; i++){
        if(checkName === responseData.from){
            return true;
        }
    }
    return false;
}

function searchMessages(){
    promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(showMessages);  
}


// FROM TO TEXT TYPE TIME
function showMessages(resp){
    responseData = resp.data;
    console.log(resp);

    for(let i = 0; i < resp.data.length; i++){
        if(resp.data[i].type === "status"){
            showStatusMessage(resp.data[i]);
        }else if(resp.data[i].type === "message"){
            if(resp.data[i].to === "Todos"){
                showNormalMessage(resp.data[i]);
            }else{
                showReservedMessage(resp.data[i]);
            }
        }else{// ERROR CONTROL
            console.log("Algo deu errado com o tipo da mensagem.");
            console.log(resp.data[i]);
        }
        
        
        console.log(resp.data[i]);
    }
    // main.innerHTML = resp.data;
    // console.log(resp.data);
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