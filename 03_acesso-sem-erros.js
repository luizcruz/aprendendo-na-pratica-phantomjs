//Objeto da API Webpage
var page=require('webpage').create();

//Função que faz a requisição
page.open("http://exame.abril.com.br", function(status){

        //Valida status da requisição
        if (status == "success"){
                //Imprime o titulo do objeto page carregado
                console.log(page.title);
        } else {
                console.log("Erro");
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
    // console.error(msgStack.join('\n'));
};
