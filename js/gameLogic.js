// Variável que armazena a peça do jogador
var playerPiece;

// Variável que armazena a peça do computador
var computerPiece;

// Variável que armazena as vitórias do jogador
var playerWin = 0;

// Variável que armazena as vitórias do computador
var computerWin = 0;







// Checa se o jogador escolheu uma peça
$(".choice").on('click', function() {
  if ($(".choice").hasClass('chosen')) {
    $(".choice").removeClass('chosen')
  }

  // Destaca a peça escolhida
  $(this).addClass('chosen');

  // Permite que o jogador clique para jogar
  $(".button-game:nth-of-type(1)").removeClass('off');
  $(".button-game:nth-of-type(1)").addClass('on');

  // Coloca a peça do computador como a que o jogador não escolheu
  if ($(this).is("#cross")) {
    playerPiece = "cross";
    computerPiece = "circle";
  } else if ($(this).is("#circle")) {
    playerPiece = "circle";
    computerPiece = "cross";
  }

  // Atualiza a imagem dos turnos com a do jogador
  $('.player-turn').attr('src', 'images/' + playerPiece + '.svg');
});






// Função para quando o jogador clica na grid do jogo
function place(button) {

  // Adiciona a peça do jogador na grid e torna impossivel de ser clicada novamente
  $(button).addClass(playerPiece);
  $(button).css('pointer-events', 'none');

  // Roda função para ver se o jogador venceu, se sim, desativa a grid
  if (check(winner)) {
    $('.grid').css('pointer-events', 'none');
  }

  // Roda função para ver se o jogo empatou, se sim, desativa a grid
  else if (tie()) {
    $('.grid').css('pointer-events', 'none');
  }

  // Desativa a grid para o jogador não clicar e passa a vez para o computador
  else {
    $('.grid').css('pointer-events', 'none');
    $('.player-turn').attr('src', 'images/' + computerPiece + '.svg');
    computerPlay();
  }
}






// Realiza os movimentos do computador
function computerPlay() {
  setTimeout(function() {

    // Checa se o computador pode fazer um movimento que leve a vitória e joga nessa posição
    if (check(winningMove)) {
      $(computerSpace).addClass('computerPiece');
      $(computerSpace).css('pointer-events', 'none');
    }

    // Checa se o jogador pode fazer um movimento de vitória e joga nessa posição se retornar true
    else if (check(usedSpaces) === false) {

      // Checa se existe uma possibilidade de 3 espaços para vencer e joga nessa posição
      if (check(openSpaces)) {
        $(computerSpace).addClass(computerPiece);
        $(computerSpace).css('pointer-events', 'none');
      }

      // Se não houver possibilidades de vencer ou bloquear o jogador, joga aleatoriamente
      else {
        var computerPlace = Math.floor(Math.random() * 9) + 1;
        if ($('#grid' + computerPlace).is('.circle, .cross')) {
          computerPlay();
        } else {
          $('#grid' + computerPlace).addClass(computerPiece);
          $('#grid' + computerPlace).css('pointer-events', 'none');
        }
      }
    };

    // Peça adicionada se a checagem para vitória do jogador retornar true
    $(computerSpace).addClass(computerPiece);
    $(computerSpace).css('pointer-events', 'none');

    // Checa se alguém venceu e desliga a grid
    if (check(winner)) {
      $('.grid').css('pointer-events', 'none');
      return;
    }

    // Passa a vez para o jogador
    $('.player-turn').attr('src', 'images/' + playerPiece + '.svg');
    check(openGrid);

    // Timing adicionado para simular pensamento da máquina
  }, 800);

}







// Função criada para checar todas as sequências de 3 da grid
function check(x) {
  if (
    x('#grid1', '#grid2', '#grid3') ||
    x('#grid4', '#grid5', '#grid6') ||
    x('#grid7', '#grid8', '#grid9') ||
    x('#grid1', '#grid4', '#grid7') ||
    x('#grid2', '#grid5', '#grid8') ||
    x('#grid3', '#grid6', '#grid9') ||
    x('#grid1', '#grid5', '#grid9') ||
    x('#grid7', '#grid5', '#grid3')
  ) {
    return true;
  } else {
    return false;
  }
}




// Função criada para apenas abrir espaços que não tenham peças para o jogador
function openGrid(p1, p2, p3) {
  if (!$(p1).hasClass(computerPiece) && !$(p1).hasClass(playerPiece)) {
    $(p1).css('pointer-events', 'auto');
  }
  if (!$(p2).hasClass(computerPiece) && !$(p2).hasClass(playerPiece)) {
    $(p2).css('pointer-events', 'auto');
  }
  if (!$(p3).hasClass(computerPiece) && !$(p3).hasClass(playerPiece)) {
    $(p3).css('pointer-events', 'auto');
  }
}






// Checa se a máquina pode fazer um movimento de vitória ao ver se existe uma sequência de 2 sem uma peça do jogador ou computador no terceiro espaço e armazena esta posição
function winningMove(p1, p2, p3) {
  if ($(p1).hasClass(computerPiece) && $(p2).hasClass(computerPiece) && !$(p3).hasClass(computerPiece) || !$(p1).hasClass(computerPiece) && $(p2).hasClass(computerPiece) && $(p3).hasClass(computerPiece) || $(p1).hasClass(computerPiece) && !$(p2).hasClass(computerPiece) && $(p3).hasClass(computerPiece)) {
    if (!$(p1).hasClass(computerPiece) && !$(p1).hasClass(playerPiece)) {
      computerSpace = p1;
      return true;
    } else if (!$(p2).hasClass(computerPiece) && !$(p2).hasClass(playerPiece)) {
      computerSpace = p2;
      return true;
    } else if (!$(p3).hasClass(computerPiece) && !$(p3).hasClass(playerPiece)) {
      computerSpace = p3;
      return true;
    } else {
      return false;
    }
  }
}






// Verifica se o jogador consegue vencer ao checar se existe uma sequência de 2 sem uma peça do computador bloqueando e armazena esta posição
function usedSpaces(p1, p2, p3) {
  if ($(p1).hasClass(playerPiece) && $(p2).hasClass(playerPiece) && !$(p3).hasClass(computerPiece) || !$(p1).hasClass(computerPiece) && $(p2).hasClass(playerPiece) && $(p3).hasClass(playerPiece) || $(p1).hasClass(playerPiece) && !$(p2).hasClass(computerPiece) && $(p3).hasClass(playerPiece)) {
    if (!$(p1).hasClass(playerPiece)) {
      computerSpace = p1;
      return true;
    } else if (!$(p2).hasClass(playerPiece)) {
      computerSpace = p2;
      return true;
    } else if (!$(p3).hasClass(playerPiece)) {
      computerSpace = p3;
      return true;
    } else {
      return false;
    }
  }
}







// Checa se existem 3 espaços vazios que possibilitem que o computador vença e armazena esta posição
function openSpaces(p1, p2, p3) {
  if (!$(p1).hasClass(playerPiece) && !$(p2).hasClass(playerPiece) && !$(p3).hasClass(playerPiece)) {
    if (!$(p1).hasClass(computerPiece)) {
      computerSpace = p1;
      return true;
    } else if (!$(p2).hasClass(computerPiece)) {
      computerSpace = p2;
      return true;
    } else if (!$(p3).hasClass(computerPiece)) {
      computerSpace = p3;
      return true;
    }
  }
}








// Verifica se alguém venceu ao passar pelas sequências e ver se as peças pertencem ao mesmo set, depois realiza uma animação que leva para a tela seguinte
function winner(p1, p2, p3) {
  if ($(p1).hasClass(playerPiece) && $(p2).hasClass(playerPiece) && $(p3).hasClass(playerPiece)) {
    playerWin = playerWin + 1;
    $(p1).css('background-image', 'url("images/' + playerPiece + 'Win.svg")');
    $(p2).css('background-image', 'url("images/' + playerPiece + 'Win.svg")');
    $(p3).css('background-image', 'url("images/' + playerPiece + 'Win.svg")');
    $(p1).addClass("blink");
    $(p2).addClass("blink");
    $(p3).addClass("blink");
    $("#" + playerPiece + "Score").html(playerWin);
    $(".button-game").css('pointer-events', 'none');
    setTimeout(function() {
      $(".game-box").css('pointer-events', 'none');
      $(".game-box").css('opacity', '0');
      $(".button-game").css('opacity', '0');
      $(".top-text-game").css('opacity', '0');
      $(".player-turn").css('opacity', '0');
    }, 1000);
    setTimeout(function() {
      $(".game-box").css('display', 'none');
      $("#retry").css('display', 'flex');
      $(".result-box").css('display', 'flex');
      $(".result-message").html('Você ganhou!');
      $(".result-image").html('<img class="result" src="images/' + playerPiece + '.svg">');
    }, 2000);
    setTimeout(function() {
      $(".button-game").css('pointer-events', 'auto');
      $(".button-game").css('opacity', '1');
      $(".result-box").css('opacity', '1');
      $(p1).removeClass("blink");
      $(p2).removeClass("blink");
      $(p3).removeClass("blink");
      $(p1).css({
        'background-image': ''
      });
      $(p2).css({
        'background-image': ''
      });
      $(p3).css({
        'background-image': ''
      });
    }, 2100);
    return true;
  } else if ($(p1).hasClass(computerPiece) && $(p2).hasClass(computerPiece) && $(p3).hasClass(computerPiece)) {
    computerWin = computerWin + 1;
    $(p1).css('background-image', 'url("images/' + computerPiece + 'Win.svg")');
    $(p2).css('background-image', 'url("images/' + computerPiece + 'Win.svg")');
    $(p3).css('background-image', 'url("images/' + computerPiece + 'Win.svg")');
    $(p1).addClass("blink");
    $(p2).addClass("blink");
    $(p3).addClass("blink");
    $("#" + computerPiece + "Score").html(computerWin);
    $(".button-game").css('pointer-events', 'none');
    setTimeout(function() {
      $(".game-box").css('pointer-events', 'none');
      $(".game-box").css('opacity', '0');
      $(".button-game").css('opacity', '0');
      $(".top-text-game").css('opacity', '0');
      $(".player-turn").css('opacity', '0');
    }, 1000);
    setTimeout(function() {
      $(".game-box").css('display', 'none')
      $("#retry").css('display', 'flex');
      $(".result-box").css('display', 'flex')
      $(".result-message").html('Você perdeu :c');
      $(".result-image").html('<img class="result" src="images/' + computerPiece + '.svg">');
    }, 2000);
    setTimeout(function() {
      $(".button-game").css('pointer-events', 'auto');
      $(".button-game").css('opacity', '1');
      $(".result-box").css('opacity', '1');
      $(p1).removeClass("blink");
      $(p2).removeClass("blink");
      $(p3).removeClass("blink");
      $(p1).css({
        'background-image': ''
      });
      $(p2).css({
        'background-image': ''
      });
      $(p3).css({
        'background-image': ''
      });
    }, 2100);
    return true;
  }
}











// Verifica se o jogo empatou ao passar pelas sequências e ver se as peças são diferentes, depois realiza uma animação que leva para a tela seguinte
function tie() {
  var tieCount;
  for (var i = 1; i < 10; i++) {
    if ($('#grid' + i).hasClass(playerPiece) || $('#grid' + i).hasClass(computerPiece)) {
      tieCount = i;
    } else {
      return false;
    }
  }
  $(".button-game").css('pointer-events', 'none');
  setTimeout(function() {
    $(".game-box").css('pointer-events', 'none');
    $(".game-box").css('opacity', '0');
    $(".button-game").css('opacity', '0');
    $(".top-text-game").css('opacity', '0');
    $(".player-turn").css('opacity', '0');
  }, 1000);
  setTimeout(function() {
    $(".game-box").css('display', 'none')
    $("#retry").css('display', 'flex');
    $(".result-box").css('display', 'flex')
    $(".result-message").html('Deu velha!');
    $(".result-image").html('<img class="result" src="images/' + computerPiece + '.svg"> <img class="result" src="images/' + playerPiece + '.svg">');
  }, 2000);
  setTimeout(function() {
    $(".button-game").css('pointer-events', 'auto');
    $(".button-game").css('opacity', '1');
    $(".result-box").css('opacity', '1');
  }, 2100);
  return true;
}








// Reseta as peças do grid e torna todos os espaços clicaveis novamente
function reset(p1, p2, p3) {
  $(p1).removeClass('circle cross');
  $(p2).removeClass('circle cross');
  $(p3).removeClass('circle cross');
  $(p1).css('pointer-events', 'auto');
  $(p2).css('pointer-events', 'auto');
  $(p3).css('pointer-events', 'auto');
}
