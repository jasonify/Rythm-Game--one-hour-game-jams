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
    var heroDimensions = 50;
    function populateEnemies(){
      for(var i = 0; i < elementsCount; i++) {
        elements.push({
          x: 0, 
          y: Math.random() * height * 0.8 + 50,
          ySpeed: Math.random() * 10 + 4,
          xSpeed: Math.random() * 10 + 4,
          width: 30,
          height: 30
        });
      }
    }


    function checkEnemyCollisions(x, y, width, height){
      for(var i = 0; i < elementsCount; i++) {
        var enemy = elements[i];
        var heroRect = getRect(x,y,width, height);
        var enemyRect = getRect(enemy.x, enemy.y, enemy.width, enemy.height);
        if ( intersectRect(heroRect, enemyRect)) {
          return true;
        }
      }
      return false;
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

    var justHit = false;
    var death = 0;
    function render(){
      updateEnemies();
      if (justHit) {
        // justHit = false;
        context.fillStyle="#FF0000";
        context.fillRect(0, 0, width, height);
        context.fillStyle="#000000";


        if(death ==0){
        //initialize the noise and start
        var noise = new Tone.Noise("pink").start();

        //make an autofilter to shape the noise
        var autoFilter = new Tone.AutoFilter({
          "frequency" : "8m", 
          "min" : 800, 
          "max" : 15000
        }).connect(Tone.Master);

        //connect the noise
        noise.connect(autoFilter);
        //start the autofilter LFO
        autoFilter.start()
        }
        death++;
        context.font = "30px Arial";
        context.fillText("GAME OVER",10,50);

        context.font = "15px Arial";
        context.fillText(" Refresh the page :(",10,80);

        osc.volume
      osc.volume.value = 0;

      } else {
        context.clearRect(0,0, width, height);
      }
      context.fillRect(x , y , heroDimensions, heroDimensions);
      renderEnemies();
      var didCollide  = checkEnemyCollisions(x,y,heroDimensions,heroDimensions);
      if (didCollide) {
        console.log('collided!');
        justHit = true;
      }
      requestAnimationFrame(render);
    }

    $(document).on('mousemove', function(event) {
      x = event.pageX;
      y = event.pageY;
      osc.frequency.value = x;
      if( justHit) {
       osc.volume.value = y;
      }
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

