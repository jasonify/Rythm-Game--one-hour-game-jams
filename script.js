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

    function getRect(r1_x, r1_y, r1_width, r1_height){
      return  {
        left: r1_x,
        top: r1_y,
        right: r1_x + r1_width,
        bottom: r1_y + r1_height,
      };
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


    var score = 0;
    var elements = [];
    var elementsCount = 4;
    function populateEnemies(){
      for(var i = 0; i < elementsCount; i++) {
        elements.push({
          x: 0, 
          y: Math.random() * height * 0.8 + 50,
          ySpeed: Math.random() * 3 + 1,
          xSpeed: Math.random() * 3 + 1,
          width: 30,
          height: 30
        });
      }
    }


    function updateEnemies(){
      for(var i = 0; i < elementsCount; i++) {
        var enemy = elements[i];
        enemy.x += enemy.xSpeed;
        if (enemy.x > width + enemy.width  || enemy.x < 0) {
          enemy.xSpeed *= -1;
          enemy.y = Math.random() * height * 0.8 + 50;
        }
      }
    }
    function renderEnemies(){
      for(var i = 0; i < elementsCount; i++) {
        var enemy = elements[i];
        context.fillRect(enemy.x , enemy.y , enemy.width, enemy.height);
      }
    }

    function render(){
      updateEnemies();
      context.clearRect(0,0, width, height);
      context.fillRect(x , y , 50, 50);
      renderEnemies();
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

   
    function init(){
      score = 0;
      elements = [];
      populateEnemies();
      render();
    }
    init();

