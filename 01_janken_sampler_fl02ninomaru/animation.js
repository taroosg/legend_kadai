

    // 共通 引き分け -------

    function Anim_even() {
        this.bgColor = 200;
        this.speed = -3;
    }
    
    Anim_even.prototype.draw = function() {
        noStroke();
        fill(this.bgColor);
        rect(0, 0, width, height);
        this.bgColor += this.speed;
    };

    
    // ぐーのときのアニメーション -----------------------------

    // ぐー勝ち
    function Anim_gu_win(){
        // 初期設定
        this.x = width / 2;
        this.y = height / 2;
        this.diameter = 0;
        this.weight = 30;
        this.speed = 30; 

    }

    Anim_gu_win.prototype.draw = function(){
        stroke(255);
        strokeWeight(this.weight);
        fill(0, 127, 255);
        ellipse(this.x, this.y, this.diameter + 20, this.diameter + 20);
        ellipse(this.x, this.y, this.diameter, this.diameter);
        if(this.diameter > 0){
            this.weight -= 20;
        }
        this.weight += this.speed * 0.3;
        this.diameter += this.speed; 
    }

    /*
    キータイプされたタイミングで
    animation = new Anim_a();

    draw() のなかに
    if(animation){
        animation.draw();
    }

    */

   // ぐー負け
   function Anim_gu_lose() {
     this.width = 0;
     this.speed = 80;
   }
   
   Anim_gu_lose.prototype.draw = function() {
     noStroke();
     fill(255, 0, 0);
     rectMode(CORNER);
     rect(0, 0, this.width, height);
     this.width += this.speed;
   };


   // ぐー スペシャル

   // Animation D
    function Anim_gu_special() {
        this.rotate = 0;
        this.size = 0;
        this.speed = 50;
        console.log('ok');
        
    }
    
    Anim_gu_special.prototype.draw = function() {
      //background(255);
      console.log('drawok');
      push();
      fill(255, 0, 0);
      noStroke();
      translate(width / 2, height / 2);
      rotate(radians(this.rotate));
      rectMode(CENTER);
      rect(0, 0, this.size, this.size);
      pop();
      this.rotate += this.speed;
      this.size += this.speed;
    }


    //ちょき -----------------------------------

    // ちょき勝ち
    function Anim_cho_win(){
        this.x1 = 0;
        this.y1 = windowHeight / 2; 
        this.x2 = windowWidth / 2; 
        this.y2 = windowHeight /2; 
        this.weight = 50;
        this.speed = 80;

    }

    Anim_cho_win.prototype.draw = function(){
        stroke(255);
        strokeWeight(this.weight);
        line(this.x1, this.y1, this.x2, this.y2);
        this.x2 = this.x2 + this.speed;
        //this.y2 = this.y2 + this.speed;
        if(this.x2 >= windowWidth){
            this.x1 = this.x1 + this.speed *0.5;
            //this.y1 = this.y1 + this.speed *0.5;
        }
        this.weight = this.weight - 5;   
        // console.log(this.x, this.y1);
    }


    // ぱー勝ち-----------------------------------

    class Anim_par_win {
        constructor() {
          this.position = [];
          this.velocity = [];
          for(var i = 0; i < 20; i++){
            this.position[i] = createVector(0, 0);
            //console.log('ok');
            this.velocity[i] = createVector(random(-1, 1), random(-1, 1));
            this.velocity[i].mult(200);
          }
          
          this.weight = 3;
        }
        draw() {
          push();
          translate(width / 2, height / 2);
          stroke(255);
          strokeWeight(this.weight);
          for(var i = 0; i < 19; i++){
            this.position[i].add(this.velocity[i]);
            line(this.position[i].x / 4, this.position[i].y / 4, this.position[i].x, this.position[i].y);
            //console.log(i);
          }
          pop();
        }
      }
    

    
    
