(function () {
   'use strict';
	//Objetos das APIs Webpage e Filesystem
	var page = require('webpage').create();
	var fs = require('fs');

	//Arquivo de destino (formato JSON)
	var filePath = 'megasena.json';

	page.open('http://loterias.caixa.gov.br/wps/portal/loterias/landing', function(status) {

		//Avalia funções no contexto da página
		var json = page.evaluate(function() {
			var items=document.getElementsByClassName("resultado-loteria mega-sena").item(0).getElementsByTagName("li");
			var numbers="";
			for (var j = 0; j < items.length; ++j) {
				numbers += " "+items[j].innerText;
		    }
			
			//Retorna objeto no padrão JSON
			return {
				loteria: document.getElementsByClassName("megasena nome-loteria")[0].innerText,
				resultado: document.getElementsByClassName("zeta")[0].innerText,
				numeros: numbers.trim()
			};
		});

	  	//console.log(JSON.stringify(json,null,5));

		//Grava arquivo JSON
		var out = fs.open(filePath, 'w');
		out.write(JSON.stringify(json,null,5));
		out.close();
		
		if(fs.exists(filePath)){
			var time = new Date();
			console.log(filePath+" criado em "+time);
		}

	 	 phantom.exit(0);

	}); 

}());
