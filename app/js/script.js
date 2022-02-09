let promise = null;

function validateName(){
    let name = "";
    while(prompt("Insira seu nome:") === nomeJaExistente){

        alert("Nome já existe, por favor escolha outro.");
    }


}

function invalidName(name){
    if(name === null || name === ""){
        return true;
    }
    for(let i = 0; i < promise.data.length; i++){
        
    }
}

function searchMessages(){
    promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(showMessages);  
}



function showMessages(resp){
    const main = document.querySelector("main");
    main.innerHTML = resp.data;
    console.log(resp.data);
}