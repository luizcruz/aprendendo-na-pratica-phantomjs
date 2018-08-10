//Objeto da API Webpage
var page=require('webpage').create();

//Função que faz a requisição
page.open("http://brasilcomputer.club", function(status){
	
        //Valida o status da requisição
        if (status == "success"){
                //Imprime o título do objeto page carregado
                console.log(page.title);
        } else {
                console.log("Erro");
        }
        phantom.exit(0);
});
