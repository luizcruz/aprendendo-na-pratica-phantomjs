
// Webpage e System APIs
var page = require('webpage').create();
var system = require('system');

//URL e variáveis de resposta
var url;
var total_requests = 0;
var objects = [];

url = system.args[1];

if (url !== undefined ){
	//Interceptando as requisições
	page.onResourceRequested = function (request) {
		
		//console.log('requested: ' + JSON.stringify(request, undefined, 4));
		
		//Construindo resposta com URL e tempo de inicio
		var start=new Date().getTime();
		objects[request.id] = new Array(request.url,start,0);
		total_requests=total_requests+1;
	};

	//Interceptando as respostas do servidor
	page.onResourceReceived = function (response) {

		//console.log('Resposta: ' + JSON.stringify(response, undefined, 4));

		//Adicionando o tempo final
		end=new Date().getTime();
		objects[response.id][2] = end;
	};


	page.open(url, function (status) {
	  	 
		if (status == 'success'){

			//Resposta com URL e tempo total de espera (requisição até a resposta)
			console.log("Total de requisições: "+total_requests + "\n\r");
			for (var i = 1; i < objects.length; i++) { 
				console.log("URL: "+objects[i][0]);
				console.log("Tempo decorrido: "+(objects[i][2] - objects[i][1]) + " ms \n\r");
			}
		}

		phantom.exit(0);
	});


} else {
	console.log("\nUso: phantomjs 16_estima-tempo.js <URL>\n\r");
	phantom.exit(0);
}