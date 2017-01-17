'use strict';

$(function(){

  let num = 20, duration = 150;
  var w = 5, h = 5;
  var draw, timer, index = 0, total = num*num;

  // matrix(1, 0, 0, 1, x, y);
  var x = Number($('#axis_x').val()) || 1, y = Number($('#axis_y').val()) || 1;

  var $matrix = $('#matrix-o');
  for(var i = 0; i < num; i++) {
    for(var j = 0; j < num; j++) {
      $('<i class="matrix_i"></i>').css({
        top: i*w,
        left: j*w,
        width: w,
        height: h,
        background: '#05F',
        zIndex: 1,
        transitionProperty: 'top, left, width, height',
        transitionDuration: 6*duration + 'ms',
        transitionTimingFunction: 'ease-in-out'
      }).appendTo($matrix);
    }
  }

  function matrix(position) {
    return {
      top: position.top * y,
      left: position.left * x,
      width: w*x,
      height: h*y
    }
  }

  function reset() {

    x = Number($('#axis_x').val()) || 1;
    y = Number($('#axis_y').val()) || 1;
    clearInterval(draw);
    index = 0;
    for(var i = 0; i < total; i++) {
      $('i.matrix_i:nth-child(' + (i + 1) + ')').css({
        top: Math.floor(i / num) * w,
        left: Math.floor(i % num) * w,
        width: w,
        height: h,
        background: '#05F',
        zIndex: 1,
        transitionProperty: 'top, left, width, height',
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
    draw = setInterval(function() {
      if(index < total) {
        var pos = $('i.matrix_i:nth-child(' + (index + 1) + ')').position();

        $('#current').html($('<p>现在是第<span class="index">' + (index + 1) + '</span>块，坐标是(' + pos.left + ', ' + pos.top + '). 于是有：</p>' +
          '<p> x\' = x * ' + x + ' = ' + pos.left + ' * ' + x + ' = ' + (pos.left * x) + ';</p>' +
          '<p> y\' = y * ' + y + ' = ' + pos.top + ' * ' + y + ' = ' + (pos.top * y) + ';</p>' +
          '<p> w\' = w * ' + x + ' = ' + w  + ' * ' + x + ' = ' + (w * x) + ';</p>' +
          '<p> h\' = h * ' + y + ' = ' + h  + ' * ' + y + ' = ' + (w * y) + ';</p>'));
        var nPos = matrix(pos);
        $('i.matrix_i:nth-child(' + (index + 1) + ')').css({
          top: nPos.top,
          left: nPos.left,
          width: nPos.width,
          height: nPos.height,
          background: '#F60',
          zIndex: 2,
          transitionProperty: 'top, left, width, height',
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

