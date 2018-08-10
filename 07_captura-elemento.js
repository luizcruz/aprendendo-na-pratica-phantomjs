//Objeto da API Webpage
var page = require('webpage').create();

//Objeto da API System
var system = require('system');
url = system.args[1];

if (url !== undefined ){
	page.open(url, function(status){

		//Avalia funções no contexto da página
		var resposta = page.evaluate(function() {

            //Seleção de todas as tags p
			return document.querySelectorAll('p');			
		});

		console.log("Total de parágrafos: "+resposta.length);
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
	console.log("\nUso: phantomjs 07_captura-elemento.js <URL>\n\r");
	phantom.exit(0);
}
