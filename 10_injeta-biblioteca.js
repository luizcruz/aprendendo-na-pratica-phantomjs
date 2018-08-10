var webPage = require('webpage');
var page = webPage.create();

page.open('https://www.uol.com.br', function (status) {

  if (status === "success") {
     //Inclui biblioteca
    page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', function() {
       //inclui função de arquivo externo
      if (page.injectJs('11_funcao-externa.js')) {
        //Se a função foi injetada, executa a função no contexto da página
        var description = page.evaluate(function() {
          return returnDescription();
        });
        console.log(description);
        phantom.exit(0);
      }
    });
  }
});
