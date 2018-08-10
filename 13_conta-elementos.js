//Objeto da API Webpage
var page = require('webpage').create();

//Objeto da API System
var system = require('system');
url = system.args[1];

if (url !== undefined ){

	//Habilita
	page.onConsoleMessage = function(msg) {
	  console.log(msg);
	};

	page.open(url, function(status) {

	  page.evaluate(function() {

	  			//Unifica os textos de todas as tags parágrafo
	  			text="";
				p = document.querySelectorAll("p");
				for(i = 0; i < p.length; i++){
					text =  text + p[i].innerText;
				}

				//Imprime as contabilizações
				console.log('---[ Análise SEO ]----------------------------------------------------------------');
				console.log('Presença de uma tag h1: '+ ((document.querySelectorAll('h1').length == 1) ? "Sim" : "Não"));
				console.log('Presença de um meta description: '+ (document.querySelectorAll("meta[name=description]").length == 1 ? "Sim" : "Não"));
				console.log('Tamanho do h1: '+ document.querySelectorAll('h1')[0].innerText.length + ' caracteres [Recomendado ter até 65 caracteres]');
				console.log('Tamanho do meta description: '+ document.querySelectorAll("meta[name=description]")[0].content.length + ' caracteres [Recomendado ter até 165 caracteres]');
				console.log('Tamanho do texto: '+ text.split(" ").length + ' palavras [Recomendado ter pelo menos 300 palavras]');
				
	  });

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
	console.log("\nUso: phantomjs 13_conta_elementos.js <URL>\n\r");
	phantom.exit(0);
}
