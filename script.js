var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;




    var colorStep = width / 256;
    // Init 
    var osc = new Tone.Oscillator(440, "sine").toMaster().start();

    var x = 0;
    var y = 0;

    function intersectRect(r1, r2) {
      return !(r2.left > r1.right || 
               r2.right < r1.left || 
                 r2.top > r1.bottom ||
                   r2.bottom < r1.top);
    }

    function collide(r1_x, r1_y, r1_width, r1_height,
                     r2_x, r2_y, r2_width, r2_height) {
      var r1 = {
        left: r1_x,
        top: r1_y,
        right: r1_x + r1_width,
        bottom: r1_y + r1_height,
      };

      var r2 = {
        left: r2_x,
        top: r2_y,
        right: r2_x + r2_width,
        bottom: r2_y + r2_height,
      };
      return intersectRect(r1, r2);
    }

    function render(){

      context.clearRect(0,0, width, height);
      context.fillRect(x , y , 50, 50);
      requestAnimationFrame(render);
    }

    $(document).on('mousemove', function(event) {
      x = event.pageX;
      y = event.pageY;
      console.log('event', x);
      osc.frequency.value = x;
      osc.volume.value = y;
      //the ration between the bpm and the frequency will be maintained

      // Draw 

    });

    render();
