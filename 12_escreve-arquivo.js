//Objeto da API Filesystem
var fs=require('fs');

//Caminho completo para arquivo de resposta
var filePath="Resposta.txt";
var Path="./";

//Abre o arquivo para escrita
out = fs.open(filePath,'w');

//Grava o conteúdo
out.write('\n\nEstamos no diretório' + fs.workingDirectory + '\n\r\n');

//Lista os arquivos do diretório e imprime o tamanho
fs.list(Path).forEach(function(file){
	fileName = file;
	file = Path + file;
	out.write('Arquivo: '+ fileName + '\tTamanho:' + fs.size(file) + ' bytes\r\n');

});

//Fecha o arquivo
out.close();

//Verifica se o arquivo foi criado (existe)
if (fs.exists(filePath))
  console.log('Arquivo de resposta criado. \n\r');
else
  console.log('Arquivo de resposta não foi criado.\n\r');

phantom.exit(0);
