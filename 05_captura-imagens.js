//Objeto da API Webpage
var webpage = require('webpage');
var page = webpage.create();

//Objeto da API System
var system = require('system');
url = system.args[1];

//Definição da resolução que a página será acessada
page.viewportSize = {width: 1366, heigth: 768};

//Dimensões do recorte da tela para fins de captura
page.clipRect = { top: 0, left: 0, width: 400, height: 400 };

if (url !== undefined ){
	page.open(url, function(status){
                        //Se a página foi carregada corretamente
		if (status == "success"){
			//Salva a imagem da página carregada 
			page.render("captura.jpg");
		}
		phantom.exit(0);
	});

	page.onError = function(msg, trace) {
    	var msgStack = ['Erro: ' + msg];
    	if (trace && trace.length) {
        	msgStack.push('Local do erro:');
        	trace.forEach(function(t) {
            	msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
 	        });
    	}

    	//console.error(msgStack.join('\n'));
	};


} else {
            //Nenhum parâmetro passado, avise o usuário
	console.log("Uso: phantomjs 05_captura-imagem.js <URL>");
	phantom.exit(0);
}
