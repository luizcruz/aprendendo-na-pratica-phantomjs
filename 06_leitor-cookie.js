// Instanciando o objeto da API Webpage em uma linha
var page = require('webpage').create();

//Objeto da API System
var system = require('system');
url = system.args[1];

//Argumento passado
if (typeof url != null){

	//Abre URL
	page.open(url, function(status) {

		if (status === 'success') {
			//Lê o cookie
			phantom.cookies.forEach(function(cookie) {
				
				//Imprime cada chave e valor
				for (var key in cookie) {

					if (key == "domain"){
						console.log(' ');
						console.log('[Domínio '+cookie[key]+']');
					}else{
						console.log('Chave: ' + key + ' - Valor: ' + cookie[key]);	
					}
					
				}
			});
			phantom.exit(0);
		}
	});

	page.onError = function(msg, trace) {
	    var msgStack = ['Erro: ' + msg];
	    if (trace && trace.length) {
	        msgStack.push('Local do erro:');
	        trace.forEach(function(t) {
	            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
	        });
	    }
		//    console.error(msgStack.join('\n'));
	};
}

