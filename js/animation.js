

// Animação para quando o jogador clica em jogar após escolher sua peça
function startGame() {
  $(".choice").css('pointer-events', 'none');
  $(".choice").css('opacity', '0');
  $(".button-game").css('pointer-events', 'none');
  $(".button-game").css('opacity', '0');
  $(".top-text-game").css('opacity', '0');
  setTimeout(function() {
    $(".choice").css('display', 'none');
    $(".game-box").css('display', 'flex');
    $(".button-game:nth-child(1)").css('display', 'none');
    $(".button-game:nth-child(3)").html('SAIR');
    $(".top-text-game").html('Turno');
  }, 1000);
  setTimeout(function() {
    $(".game-box").css('opacity', '1');
    $(".button-game").css('pointer-events', 'auto');
    $(".button-game").css('opacity', '1');
    $(".top-text-game").css('opacity', '1');
    $(".player-turn").css('opacity', '1');
  }, 1100);
}

// Animação para quando o jogador abre as regras do jogo
function openRegras() {
  $(".menu-box").css('pointer-events', 'none');
  $(".menu-box").css('opacity', '0');
  setTimeout(function() {
    $(".menu-box").css('display', 'none');
    $(".regras-box").css('display', 'flex');
  }, 1000);
  setTimeout(function() {
    $(".regras-box").css('opacity', '1');
  }, 1100);
}

// Animação para quando o jogador fecha as regras do jogo
function closeRegras() {
  $(".regras-box").css('pointer-events', 'none');
  $(".regras-box").css('opacity', '0');
  setTimeout(function() {
    $(".regras-box").css('display', 'none');
    $(".menu-box").css('display', 'flex');
    $(".menu-box").css('pointer-events', 'auto');
  }, 1000);
  setTimeout(function() {
    $(".menu-box").css('opacity', '1');
  }, 1100);
}

// Animação para quando o jogador decide sair do jogo e voltar para o menu
function exitGame() {
  $("#circleScore").html('0');
  $("#crossScore").html('0');
  playerWin = 0;
  computerWin = 0;
  $(".choice").removeClass('chosen');
  $(".button-game:nth-child(1)").removeClass('on');
  $(".button-game:nth-child(1)").addClass('off');
  $(".game-box").css('pointer-events', 'none');
  $(".game-box").css('opacity', '0');
  $(".button-game").css('pointer-events', 'none');
  $(".button-game").css('opacity', '0');
  $(".top-text-game").css('opacity', '0');
  $(".player-turn").css('opacity', '0');
  $(".result-box").css('opacity', '0');
  setTimeout(function() {
    check(reset);
    $(".game-box").css('display', 'none');
    $(".result-box").css('display', 'none');
    $("#retry").css('display', 'none');
    $(".choice").css({
      'display': ''
    });
    $(".choice").css('opacity', '1');
    $(".choice").css('pointer-events', 'auto');
    $(".top-text-game").html('Escolha');
    $(".top-text-game").css('opacity', '1');
    $(".button-game:nth-child(1)").css('display', 'flex');
    $(".button-game:nth-child(3)").html('VOLTAR');
    $(".button-game").css('pointer-events', 'auto');
    $(".button-game").css('opacity', '1');
  }, 1000);
}

// Animação para quando o jogador decide resetar o jogo
function retryGame() {
  $(".button-game").css('pointer-events', 'none');
  $(".button-game").css('opacity', '0');
  $(".top-text-game").css('opacity', '0');
  $(".player-turn").css('opacity', '0');
  $(".result-box").css('opacity', '0');
  setTimeout(function() {
    check(reset);
    $(".result-box").css('display', 'none');
    $(".game-box").css('display', 'flex');
    $("#retry").css('display', 'none');
    $('.player-turn').attr('src', 'images/' + playerPiece + '.svg');
  }, 1000);
  setTimeout(function() {
    $(".top-text-game").css('opacity', '1');
    $(".player-turn").css('opacity', '1');
    $(".button-game").css('pointer-events', 'auto');
    $(".button-game").css('opacity', '1');
    $(".game-box").css('opacity', '1');
  }, 1100);
}
