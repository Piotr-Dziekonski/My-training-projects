$(document).ready(function(){

  function randomColor(){ // picks a random number from 0 to 360
    return Math.floor(Math.random()*361-0.00000000000000000000001);
  };
    function generate(size){ // generates a grid with dimensions equal to size (e.g. size = 10 then grid -> 10x10)

      $squareSize = $('#grid').width() / size - 2; // gets the information of how wide squares can be ( -2 to subtract the border width)

      for(var i = 0; i<size; i++){
          $('#grid').append('<div class="row"></div>'); //makes a row
        }
      for (var i = 0; i<size; i++) {
          $('.row').append('<div class="bg-square"><div class="square"></div></div>').height($squareSize+2); // makes a square with black square behind it
        }

      $('div.square').width($squareSize).height($squareSize).mouseenter(function(){ // changes appearance of square on mouseenter
        if($(this).css("opacity") == 1 || $(this).css("opacity") == 0)
        {
          $(this).css('background-color','hsl('+randomColor()+',100%,50%)'); // makes background-color of a square random and sets it's saturation and lightness (100% and 50% is fine for me)
          $(this).css('opacity', 0.9); // sets default opacity to 0.9 to make it completly black after few mouseenters
        }
        else {
          $currOpac = $(this).css('opacity');
          $(this).css('opacity', $currOpac - 0.2); // you can change the subtrahend to make squares go black faster
        }

      });

      $('.bg-square').width($squareSize).height($squareSize); // sets size of background square to be the same as square with color

      $('#reset').click(function(){ // reset button
        $('.square').css('background-color','black');
      });
    };
    generate(10); // generates starting grid

    $('#new-grid').click(function(){ // new grid button click event handler
      var size = window.prompt("Enter number of rows and squares (max 128):");
      if(size>128 || size < 0)
      {
        window.alert("Invalid input") // wrong size m8
      }
      else{

        $(".row").remove(); // removes every row
        generate(size); // and generates new grid with user's size
      }
    });


});
