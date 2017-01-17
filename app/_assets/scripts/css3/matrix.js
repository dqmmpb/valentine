'use strict';

$(function(){

  let num = 20, duration = 150;
  var w = 5, h = 5;
  var draw, timer, index = 0, total = num*num;

  // matrix(1, 0, 0, 1, x, y);
  var x = Number($('#axis_x').val()) || 30, y = Number($('#axis_y').val()) || 30;

  var $matrix = $('#matrix-o');
  for(var i = 0; i < num; i++) {
    for(var j = 0; j < num; j++) {
      $('<i class="matrix_i"></i>').css({
        top: i*w,
        left: j*w,
        background: '#05F',
        zIndex: 1,
        transitionProperty: 'top, left',
        transitionDuration: 6*duration + 'ms',
        transitionTimingFunction: 'ease-in-out'
      }).appendTo($matrix);
    }
  }

  function matrix(position) {
    return {
      top: position.top + y,
      left: position.left + x
    }
  }

  function reset() {

    clearInterval(draw);
    index = 0;
    for(var i = 0; i < total; i++) {
      $('i.matrix_i:nth-child(' + (i + 1) + ')').css({
        top: Math.floor(i / num) * w,
        left: Math.floor(i % num) * w,
        background: '#05F',
        zIndex: 1,
        transitionProperty: 'top, left',
        transitionDuration: '0ms',
        transitionTimingFunction: 'ease-in-out'
      });
    }

  }

  $('#reset').click(function() {
    reset();
  });

  $('#axis_x').change(function() {
    var val = $(this).val();
    $('.axis_x').text(val);
  });

  $('#axis_y').change(function() {
    var val = $(this).val();
    $('.axis_y').text(val);
  });

  $('#transform').click(function() {
    reset();
    x = Number($('#axis_x').val()) || 30;
    y = Number($('#axis_y').val()) || 30;
    draw = setInterval(function() {
      if(index < total) {
        var pos = $('i.matrix_i:nth-child(' + (index + 1) + ')').position();

        $('#current').html($('<p>现在是第<span class="index">' + (index + 1) + '</span>块，坐标是(' + pos.left + ', ' + pos.top + '). 于是有：</p>' +
          '<p> x\' = x + ' + x + ' = ' + pos.left + ' + ' + x + ' = ' + (pos.left + x) + ';</p>' +
        '<p> y\' = y + ' + y + ' = ' + pos.top + ' + ' + y + ' = ' + (pos.top + y) + ';</p>'));
        var nPos = matrix(pos);
        $('i.matrix_i:nth-child(' + (index + 1) + ')').css({
          top: nPos.top,
          left: nPos.left,
          background: '#F60',
          zIndex: 2,
          transitionProperty: 'top, left',
          transitionDuration: 6*duration + 'ms',
          transitionTimingFunction: 'ease-in-out'
        });
        index++;
      } else {
        clearInterval(draw);
      }
    }, duration);

  });
});

