//Objeto da API System
var system = require('system');

//Recebe os argumentos 
arrayArgumentos = system.args;

//Para cada argumento presente no array
arrayArgumentos.forEach(function (argumento) {

  	  //imprime o argumento
	  console.log(argumento);
});

phantom.exit(0);
