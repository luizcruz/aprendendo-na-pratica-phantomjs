//Objeto da API Webpage
var webpage = require('webpage');
var page = webpage.create();

//Objeto da API System
var system = require('system');
url = system.args[1];

//Definição da resolução que a página será acessada
page.viewportSize = {width: 1366, height: 768};

//Dimensões do recorte da tela para fins de captura
page.clipRect = { top: 0, left: 0, width: 400, height: 400 };

if (url !== undefined ){
	page.open(url, function(status){
		console.log(status);

		if (status == "success"){

			//Avalia a página no contexto dela
			var point = page.evaluate(function () { 

					//Captura o elemento
					var elemento = document.getElementById('botao');

					//Retorna o DOMRect do elemento selecionado
					var rect = elemento.getBoundingClientRect();

					//Posiciona no centro do elemento
					return {
						x: rect.left + Math.floor(rect.width / 2),
						y: rect.top + (rect.height / 2)
					};
				});

				//Executa o click na posição
				page.sendEvent('click',point.x, point.y);
			

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

    	console.error(msgStack.join('\n'));
	};


} else {
	console.log("Uso: phantomjs 08_simula-click.js <URL>");
	phantom.exit(0);
}
