$(document).ready(function() {

  // Adiciona smooth scrolling para todos links
  $("a").on('click', function(event) {

    // Garante que a # atual tem um valor antes de resetar
    if (this.hash !== "") {
      // Previne o comportamento padrão do click
      event.preventDefault();

      // Guarda a #
      var hash = this.hash;

      // Utiliza a propriedade animate() do Jquery para fazer uma rolagem progressiva
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {

        // adiciona # na url para indicar a seção que o usuário está
        window.location.hash = hash;
      });
    }
  });
});
