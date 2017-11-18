var playerPiece;
var computerPiece;
var playerWin = 0;
var computerWin = 0;

$(".choice").on('click', function() {
  if ($(".choice").hasClass('chosen')) {
    $(".choice").removeClass('chosen')
  }
  $(this).addClass('chosen');
  $(".button-game:nth-of-type(1)").removeClass('off');
  $(".button-game:nth-of-type(1)").addClass('on');
  if ($(this).is("#cross")) {
    playerPiece = "cross";
    computerPiece = "circle";
  } else if ($(this).is("#circle")) {
    playerPiece = "circle";
    computerPiece = "cross";
  }
  $('.player-turn').attr('src', 'images/' + playerPiece + '.svg');
});


function place(button) {
  $(button).addClass(playerPiece);
  $(button).css('pointer-events', 'none');
  if (check(winner)) {
    $('.grid').css('pointer-events', 'none');
  } else if (tie()) {
    $('.grid').css('pointer-events', 'none');
  } else {
    $('.grid').css('pointer-events', 'none');
    $('.player-turn').attr('src', 'images/' + computerPiece + '.svg');
    computerPlay();
  }
}

function computerPlay() {
  setTimeout(function() {
    if (check(winningMove)) {
      $(computerSpace).addClass('computerPiece');
      $(computerSpace).css('pointer-events', 'none');
    } else if (check(usedSpaces) === false) {
      if (check(openSpaces)) {
        $(computerSpace).addClass(computerPiece);
        $(computerSpace).css('pointer-events', 'none');
      } else {
        var computerPlace = Math.floor(Math.random() * 9) + 1;
        if ($('#grid' + computerPlace).is('.circle, .cross')) {
          computerPlay();
        } else {
          $('#grid' + computerPlace).addClass(computerPiece);
          $('#grid' + computerPlace).css('pointer-events', 'none');
        }
      }
    };
    $(computerSpace).addClass(computerPiece);
    $(computerSpace).css('pointer-events', 'none');
    if (check(winner)) {
      $('.grid').css('pointer-events', 'none');
      return;
    }
    $('.player-turn').attr('src', 'images/' + playerPiece + '.svg');
    check(openGrid);
  }, 800);

}

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

function reset(p1, p2, p3) {
  $(p1).removeClass('circle cross');
  $(p2).removeClass('circle cross');
  $(p3).removeClass('circle cross');
  $(p1).css('pointer-events', 'auto');
  $(p2).css('pointer-events', 'auto');
  $(p3).css('pointer-events', 'auto');
}
