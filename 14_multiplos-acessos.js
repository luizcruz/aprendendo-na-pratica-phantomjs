var page = require('webpage').create();
var system = require('system');
var urls = [];

//Recebe os argumentos 
arrayArgumentos = system.args;

if (arrayArgumentos.length>1){

	//Insere as urls passadas via linha de comando
	arrayArgumentos.forEach(function (url) {
		urls.push(url);
	});

	//Remove o nome do script do array de urls
	urls.shift(); 

	//Inicializa contador de execução
	var i = 0;

	// Função recursiva para acessos múltiplos
	var accessCallback = function () {
	    return function (status) {
	        console.log("URL: " + urls[i]);
	        
	        // exit if there was a problem with the navigation
	        if (!status || status === 'fail') {
	        	phantom.exit(0);
	        }

	        i++;

	        if (status === "success") {

				var text = page.evaluate(function() {
		  			return document.querySelectorAll('h1')[0].innerText;
				});


				
				console.log("Título: "+text);

	            if (i < urls.length) {
	                // Navega para próxima página e chama a função de callback
	                page.open(urls[i], accessCallback());
	            } else {
	                // Provoca a saída no último elemento 
	                page.open(urls[i], function () {
	                    phantom.exit(0);
	                });
	            }
	        }
	    };
	};

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

	//Acesso a primeira URL
	page.open(urls[i], accessCallback());


} else {
	console.log("\nUso: phantomjs 14_multiplos-acessos.js <URL1> <URL2> ...\n\r");
	phantom.exit(0);
}
