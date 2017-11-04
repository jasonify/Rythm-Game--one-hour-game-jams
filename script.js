var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;




    var colorStep = width / 256;
    // Init 
    var osc = new Tone.Oscillator(440, "sine").toMaster().start();

    var x = 0;
    var y = 0;

    function render(){

      context.clearRect(0,0, width, height);
      context.fillRect(x - 20, y - 25, 50, 50);
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
