'use strict';

$(function(){

  var speed = 0.95;
  var playState = true;

  function speedChange() {
    $('#student').css({
      animationDuration: speed + 's'
    });
  }

  function reset() {
    speed = Number($('#axis_x').val()) || 0.95;
    $('.axis_x').text(speed);
    speedChange();
    playState = true;
  }

  $('#axis_x').change(function() {
    speed = Number($('#axis_x').val()) || 0.95;
    $('.axis_x').text(speed);
    speedChange();
  });

  $('#reset').click(function() {
    reset();
    $('#student').css({
      animationPlayState: playState ? 'running' : 'paused'
    });
  });

  $('#pause').click(function() {
    //reset();
    playState = !playState;
    $('#student').css({
      animationPlayState: playState ? 'running' : 'paused'
    });

    $(this).text(playState ? '暂停' : '开始');
  });


});

