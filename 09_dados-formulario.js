var page = require('webpage').create();
page.open("http://www.facebook.com/login.php", function(status) {

  if (status === "success") {

    page.evaluate(function() {

      //Insere valores nos inputs identificados pelo Id
      document.getElementById("email").value = "seu-email";
      document.getElementById("pass").value = "sua-senha";

      //Clica no botão
      document.getElementById("loginbutton").click();

    });

    setTimeout(function() {
      page.render("page.png");
      phantom.exit(0);
    }, 5000);

  }
});
