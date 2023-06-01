class Bullet{
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || 10  //設計的飛彈有大有小時。就傳參數，args
        this.p = args.p || shipP.copy() //createVector(width/2,height/2)  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)  //算出方向，limit-->每次移動5
        //this.color = args.color || "#a663cc"
      }
      draw(){  //繪出物件的程式碼
        push()
         translate(this.p.x-14.85,this.p.y-14)
         // 椭圆形作為火焰的底部
         fill(255, 0, 0); // 红色填充
         noStroke();
         ellipse(20, 30, 15, 20);
  
         // 三角形作為火焰的頂部
          fill(255, 165, 0); // 橙色填充
         noStroke();
         triangle(20, 10, 15, 30, 25, 30);
  
           // 矩形作為火焰的中間部分
          fill(255, 255, 0); // 黄色填充
         noStroke();
         rect(17.5, 20, 5, 10);
          
          //  translate(this.p.x,this.p.y)
          //  fill(this.color)
          //  noStroke()
          //  ellipse(0,0,this.r+2)
        pop()
  
      }
      update(){  //計算出移動後的位置
        // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
        // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
        this.p.add(this.v)
  
      }
      
    }