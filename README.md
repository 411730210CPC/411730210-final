# 411730210-final
---
tags: 程式設計_下學期講義,程式設計,期末作業
---
# 411730210陳柏蓁 第二個作業(期末)


遊戲連結：https://youtu.be/QAXjiKMuFmk
## 產生多個元件(class)
![](https://hackmd.io/_uploads/B1F7b9QI3.gif)    此為製作物件移動的程式碼
```javascript=

// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [[4, 0],[5, -1],[5, 0],[6, 1], [6, 3], [8, 1], [8, 0],[7, 0],[7, -1],[6, -1], [6, -9],[4,-9],[5,-8],[3,-6],[-1,-6],[-3,-8],[-3,-9],[-5,-9],[-4,-8],[-4,-6],[-5,-5],[-5,-2],[-8,-2],[-11,1],[-11,3],[-8,3],[-6,5],[-4,5],[-1,2],[-1,1]]; //list資料，
var fill_colors = "ccd5ae-e9edc9-fefae0-faedcd-d4a373".split("-").map(a=>"#"+a)
var line_colors = "ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a".split("-").map(a=>"#"+a)

//class:類別，粒子
class Obj{  //宣告一個類別，針對一個畫的圖案
    constructor(){  //預設值，基本資料(物件的顏色，移動的速度、大小、初始值顯示位置......)
      this.p = {x: random(width),y:random(height)}//描述為該物件的初始位置
      this.v = {x: random(-1,1),y:random(-1,1)} //設定一個物件的移動速度
      this.size = random(10,15)  //一個物件的放大倍率
      this.color = random(fill_colors)  //充滿顏色
      this.stroke = random(line_colors)  //線條外框顏色
    }
    draw(){  //畫出單一個物件形狀
      push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)  //依該物件位置為原點
        scale(this.v.x<0?1:-1,-1)  //?為否則(<0=1否則=-1)
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)  //線的粗細
        beginShape()
          for(var k=0;k<points.length;k=k+1){
            //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
            //vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一點，當指令到endShape()，會把所有的點連接再一起
            curveVertex(points[k][0]*this.size,points[k][1]*this.size)
          }
        endShape()
      pop()  //執行pop()後，原點(0,0)設定為回到整個視窗的左上角
    }
    update(){
      this.p.x = this.v.x + this.p.x
      this.p.y = this.v.y + this.p.y
    }

}

var ball  //目前要處理的物件，暫時放在ball(隨意取)變數內 
var balls = []  //把產生的"所有"的物件
function setup() {
  createCanvas(windowWidth,windowHeight);
  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4......,8,9
    ball = new Obj()  //產生一個Obj class元件
    balls.push(ball)  //把ball的物件放入到balls陣列內
  }

}

function draw() {
  background(220);
  for(var j=0;j<balls.length;j++){
    ball = balls[j]
    ball.draw()
    ball.update()
  }
}
```

### 以下為遊戲程式的拆解說明
---
## 一、設計圖案
![](https://hackmd.io/_uploads/rJlayim83.gif)

#### 繪製描點狗狗，再將其身體填色及外框填色
實際的程式碼
```javascript=
// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [[4, 0],[5, -1],[5, 0],[6, 1], [6, 3], [8, 1], [8, 0],[7, 0],[7, -1],[6, -1], [6, -9],[4,-9],[5,-8],[3,-6],[-1,-6],[-3,-8],[-3,-9],[-5,-9],[-4,-8],[-4,-6],[-5,-5],[-5,-2],[-8,-2],[-11,1],[-11,3],[-8,3],[-6,5],[-4,5],[-1,2],[-1,1]]; //list資料，
var fill_colors = "ccd5ae-e9edc9-fefae0-faedcd-d4a373".split("-").map(a=>"#"+a)
var line_colors = "ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a".split(
```
---
## 二、設定狗狗的class(物件)

### 2（１）   class的constructor定義內容


先於程式中設定，將物件狗狗命名為dog，而放置所產生的dog物件，其倉庫命名為dogs。怪物物件名為monster，倉庫名為monsters。子彈物件名為bullet，倉庫為bullets。
接著，將槍的位置設定為「var shipP」。
下一步，設定for迴圈，並將繪製出的圖形(dog,monster)傳送至dogs(monsters)裡面，並產生一個物件名為Obj(Monster)。

#### 實際的程式碼


```javascript=
//++++++設定畫points所有"點"的物件變數++++++
var dog //目前要處理的物件，暫時放在ball(隨意取)變數內 
var dogs = []  //把產生的"所有"的物件，為物件的倉庫，所有資料都在此

//++++++設定飛彈物件的變數++++++
var bullet  //"目前要處理"的物件，暫時放在bullet變數內
var bullets = []  //把產生"所有"的物件，為物件的倉庫，所有物件資料都在此

//++++++設定怪物物件的變數++++++
var monster  //"目前要處理"的物件，暫時放在monster變數內
var monsters = []  //把產生"所有"的物件，為物件的倉庫，所有物件資料都在此

//++++++設定砲台的位置++++++
var shipP
function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台的位置為(width/2,height/2)

  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4......,8,9
    dog = new Obj({})  //產生一個Obj class元件
    dogs.push(dog)  //把dog的物件放入到dogs陣列內
  }
  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4......,8,9
    monster = new Monster({})  //產生一個Monster class元件
    monsters.push(monster)  //把monster的物件放入到monsters陣列內
  }
```
### 2（２） 在obj中基本設定
#### class的畫圖程式碼、產生20個相同的class元件
設定基本設定。
* createVector(random(width) ,random(height))為設定隨機位置，與this.p相同
* createVector(random(-5,5) ,random(-1,1))為設定移動速度，與this.v相同
* this.size=random(10,15)為設定大小，與this.size相同。
* random(fill_colors) 為設定隨機顏色，與this.color相同random(line_colors)為隨機線條顏色。
 ##### 實際的程式碼
```javascript=
//class:類別，粒子
class Obj{  //宣告一個類別，針對一個畫的圖案
    constructor(args){  //預設值，基本資料(物件的顏色，移動的速度、大小、初始值顯示位置......)
      //this.p = args.p || {x: random(width),y:random(height)}//描述為該物件的初始位置，|| (or)，當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有傳參數，就以||(or)後面設定產出
      this.p = args.p || createVector(random(width),random(height))  //把原本{x:......,y:......}改成"向量"方式
      //this.v = {x: random(-1,1),y:random(-1,1)} //設定一個物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1))  //把原本{x:......,y:......}改成"向量"方式
      this.size = random(10,15)  //一個物件的放大倍率
      this.color = random(fill_colors)  //充滿顏色
      this.stroke = random(line_colors)  //線條外框顏色
    }
```
* class:類別，粒子：這是一個註解，提供了關於 Obj 類別的說明。
* class Obj{}：宣告了一個 Obj 類別。
* constructor(args){}：這是 Obj 類別的建構子，它接收一個 args 參數來設定物件的基本資料。
* this.p = args.p || createVector(random(width),random(height))：使用 args.p 參數來設定物件的初始位置。如果 args.p 不存在，則使用 createVector(random(width), random(height)) 來產生一個隨機位置的向量。
* this.v = createVector(random(-1,1),random(-1,1))：使用 createVector(random(-1, 1), random(-1, 1)) 來產生一個隨機速度的向量，表示物件的移動速度。
* this.size = random(10,15)：隨機生成一個介於 10 到 15 之間的數字，表示物件的放大倍率。
* this.color = random(fill_colors)：從 fill_colors 中隨機選擇一個顏色，用於填充物件。
* this.stroke = random(line_colors)：從 line_colors 中隨機選擇一個顏色，用於物件的線條外框。

#### 於obj繪圖
##### 實際的程式碼
```javascript=
 draw(){  //畫出單一個物件形狀
      push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)  //依該物件位置為原點
        scale(this.v.x<0?1:-1,-1)  //?為否則(<0=1否則=-1) //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的-1為上下顛倒
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)  //線的粗細
        beginShape()
          for(var k=0;k<points.length;k=k+1){
            //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
            //vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一點，當指令到endShape()，會把所有的點連接再一起
            curveVertex(points[k][0]*this.size,points[k][1]*this.size)
          }
        endShape()
      pop()  //執行pop()後，原點(0,0)設定為回到整個視窗的左上角
    }
```


---
### 2(3) 在Obj中做剩下的設定
#### class的移動內容




##### 實際的程式碼


```javascript=
update(){
      // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
      // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
      this.p.add(this.v)  //設定好向量後，使用add，就可以抵上面兩行指令
      //向量sub==> 減號
      //知道滑鼠的位置，並建立一個滑鼠的向量
      // let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
      // let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //sub計算出滑鼠所在位置的向量(mouseV)到物件向量(this.p)的距離，每次以3的距離
      // //this.v.mag()代表該物件的速度大小(一個向量值有大小和方向)
      // this.p.add(delta)
      
      if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向、速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
        this.v.y = -this.v.y  //把y軸方向、速度方向改變
      }
    }
    isBallinRanger(x,y){  //功能：判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
      if(d<4*this.size){  
        return true  //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回ture的值(碰觸)
      }else{  
        return false  //滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
      }

    }
```
做Obj物件的剩餘環境設定。this.p.add(this.v)為x軸的目前位置加上x軸的移動速度加上y軸的目前位置加上y軸的移動速度。
if開頭的程式碼是利用this.p.x和this.p.x有無碰到所設定的邊框來決定是否應該變更行走方向(變負值)。
### 2(4) 利用此判斷是否播放音樂/obj判斷
##### 實際的程式碼
```javascript=
for(let ball of balls){  //只要是陣列的方式，都可以利用此方式來做
    ball.draw()
    ball.update()
    for(let bullet of bullets){  //檢查每一個物件
      if(ball.isBallinRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score+1
        dog_sound.play()
      }
    }
  }
```
利用迴圈重複判斷並提取圖案內容及update中的值。再依子彈是否碰觸到物件從倉庫中(dogs)刪除，並加分

---
## 三、設定變異蟲的class 

![](https://hackmd.io/_uploads/rkuQMqrI3.gif)


### 3(1) class的constructor定義內容
#### 元件的大小，元件的左右移動，速度不一
```javascript=
var colors1 = "335c67-fff3b0-e09f3e-9e2a2b-540b0e0".split("-").map(a=>"#"+a)

class Monster{  //宣稱一個怪物類別。它稱為Monster
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || random(50,150)  //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就以100為主
        this.p = args.p || createVector(random(width),random(height))  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(random(-1,1),random(-1,1))  //移動的速度，如果沒有傳參數args，就會利用亂數(-1,1)，抽出x,y軸的移動速度
        this.color = args.color || random(colors1)
        this.mode = random(["happy","bad"])
        this.dead = false  //代表活著
        this.timenum = 0 //延長時間，讓大家看到他死
      }
```
var monstercolors設定顏色，並用args.color||random(monstercolors)隨機顏色。random([‘happy’,‘bad’])做兩種情緒，而this.dead=false 則是代表活著或死亡，便做出接下來的狀態， this.timenumber=0是延長時間，讓遊玩者能看到怪物的死亡狀態。

---
### 3(2)在monster中的環境設定/繪圖
```javascript=
draw(){  //畫出元件
        if(this.dead == false ){
       push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color)//填色
           noStroke() //不描邊
           ellipse(0,0,this.r,this.r/2) //畫橢圓(怪物身體)
           if(this.mode=="happy"){
               fill(255)
               ellipse(1,0,this.r/1.5)
               //ellipse(0,0,this.r/2)
               fill("#4cc9f0")
               ellipse(0,0,this.r/2)
               ellipse(1,1,this.r/2)
           }else{
               fill("#cdb4db")
               arc(0,0,this.r,this.r,0,PI)
               fill(0)
               arc(0,0,this.r/3,this.r/2,0,PI)
           }
           stroke(this.color)
           strokeWeight(4)
           noFill()
           //line(this.r/2,0,this.r,0)
        for(var j=0;j<10;j++){
           rotate(PI/4)
           beginShape()
           for(var i=0;i<(this.r/3);i++){
            vertex(this.r/3+i,sin(i/2+frameCount/5)*7)

           }
           endShape()
        }
           pop()  //恢復原點到視窗左上角
        }
        else{  //怪物死亡
            this.timenum = this.timenum + 1
        push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)
           stroke(255)
           line(-this.r/2,0,this.r/2,0)
           stroke(this.color)
           strokeWeight(2)
           noFill()
           for(var j=0;j<5;j++){
              rotate(PI/8)
              line(this.r/2,0,this.r,0)
           }
        pop()
        }
    }
```
依照怪物心情做不同調整，變異蟲腳的部分是用sin函數畫(改快慢&腳波幅大小)。變異蟲死亡時，會閉眼且腳伸直，再加上延遲程式讓我們能看到變異蟲死亡的樣子。



---
### 3(3)在monster中做剩下設定
#### 元件的大小，元件的左右移動，速度不一
```javascript=
update(){  //計算移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x  //把x軸方向、速度方向改變
          }
        if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
            this.v.y = -this.v.y  //把y軸方向、速度方向改變
          }

    }
    isBallInRanger(x,y){  //功能:判斷飛彈是否在怪物範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
        if(d<this.r/2){  
            return true  //飛彈(x,y)與物件的距離(this)
        }else{  
            return false  //飛彈(x,y)與物件的距離(this)，滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
        }
    }
}
```
---
### 3(4) 在monster中做判斷
```javascript=
for(let monster of monsters)  //只要是陣列的方式，都可以利用此方式來做
      {
        if(monster.dead == true  && monster.timenum>4 ){
          monsters.splice(monsters.indexOf(monster),1)  //從倉庫monster取出，只取一個
        }
        monster.draw()
        monster.update()
        for(let bullet of bullets){  //檢查每一個物件
          if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
            //monsters.splice(monsters.indexOf(monster),1)  //從倉庫monsters取出，只取1個
            bullets.splice(bullets.indexOf(bullet),1)
            score = score-1
            monster.dead = true //怪物死亡
            monster_sound.play()
        }
       }
    }

```
死亡時間延遲(monster.timenumber)
是否死亡的條件判斷(monster.dead==true)

---
## 四、設定子彈的class

![](https://hackmd.io/_uploads/BJmV15rU3.gif)


### 4(1) class的constructor定義內容
```javascript=
class Bullet{
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || 10  //設計的飛彈有大有小時。就傳參數，args
        this.p = args.p || shipP.copy() //createVector(width/2,height/2)  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)  //算出方向，limit-->每次移動5
        this.color = args.color || "#a663cc"
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

```
先定位子彈相對砲台的位置，再繪製火焰。

---
### 4(2) 子彈的其他設定
```javascript=
for(let bullet of bullets){  //只要是陣列的方式，都可使用此方式處理
    bullet.draw()
    bullet.update()
  }
```
---
### 4(3)子彈射出(滑鼠)
#### 滑鼠按下之後，消失不見\發射子彈

```javascript=
function mousePressed(){
  //++++++++++++++++++產生一個物件++++++++++++++++++++++++
  // dog = new Obj({  //在滑鼠按下產生一個新的Obj class元件
  //   p:{x:mouseX,y:mouseY}
  // }) 
  // dogs.push(dog)  //把dog的物件放入到dogs陣列內
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++


  //++++++在物件上按下滑鼠，物件消失不見，分數加一分+++++++
  //   for(let ball of balls){  //檢查每一個物件
  //     if(ball.isBallinRanger(mouseX,mouseY)){
  //       balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
  //       score = score+1
  //     }
  //   }
```
---


---

### 4（4)子彈射出(鍵盤)
```javascript=
function keyPressed(){
  if(key==" "){  //按下空白鍵，發射飛彈，其實跟按下滑鼠的功能一樣
    bullet = new Bullet({r:20})  //在滑鼠按下的地方，產生一個新的Bullet class
    bullets.push(bullet)  //把bullet的物件放入到bullets陣列內(丟到倉庫)
    gun_sound.play()
  }  
  
}
```
---
### 4(5)砲台移動(鍵盤)
```javascript=
//=======按按鈕＝＝＝＝＝＝＝＝
  if(keyIsPressed){
    if(key=="ArrowLeft" || key == "a"){  //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key == "d"){  //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key == "w"){  //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key == "s"){  //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }
  }
```
利用keyispressed設定，使火箭可以隨著鍵盤上的指定字母上下左右移動。

---
## 五、其他程式碼設定
### 5-1 聲音及相片匯入
```javascript=
function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  dog_sound = loadSound("sound/dog.wav")
  gun_sound = loadSound("sound/gun.wav")
  monster_sound = loadSound("sound/monster.wav")
  createImg = loadImage("1.jpg");
  //createImg1 = loadImage("2.jpg");
 // createImg2 = loadImage("3.jpg");
} 
```
利用loadImage匯入圖片，該圖片為背景設定。
利用loudsound匯入音檔，此三音檔分別為「狗狗」、「變異蟲」、「火箭」的聲音。

---
### 5-2 score文字設定
![](https://hackmd.io/_uploads/rJFT8tHL2.png)

```javascript=
fill("#2a3c24")//設定顏色
  textSize(40)//設定文字大小
  text(score,75,75)  //在座標為(50,50)上顯示score分數內容
  if(score<0&&score>-5){
    text("耶你殺死變異蟲了😎",150,125)
  }else if(score<-4 ){
    text("你拯救了狗狗🥺",150,125)
  }
```
設定文字顯示得分。
小於0分即顯示「耶你殺死變異蟲了😎」
小/等於-5分即顯示「你拯救了狗狗🥺」


---
### 繪製火箭（砲台）
![](https://hackmd.io/_uploads/Hy_KIKS8n.png)

```javascript=
//=============畫火箭＝＝＝＝＝＝＝＝＝＝＝
  push()  //重新規劃原點(0,0)
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)  //分子:dy 分母:dx
    translate(shipP.x,shipP.y)
    fill("#C89FA3")
    noStroke()
    rotate(angle)
    // 繪製火箭
  fill("#3f37c9"); // 設定填充顏色為藍色
  noStroke(); // 取消描邊
  rect(-25,-25,-80,50); // 繪製箭身（矩形）
  fill("#f72585"); // 設定填充顏色為粉色
  triangle(50,0,-25,25,-25,-25); // 繪製箭口（三角形）
  fill("#dc2f02"); // 設定填充顏色為紅色
  ellipse(-60.5,0,40,20); // 繪製疫苗液體（橢圓形
  fill("#e85d04")// 設定填充顏色為橘色
  arc(50,-1.-5,40,30,0,-90)// 繪製箭砲口
  arc(50,2.5,40,30,90,0)// 繪製箭砲口

  pop()  //恢復原本設定，原點(0,0)在視窗左上角
}
```


---
### 結尾畫面/ 結束後顯示畫面
![](https://hackmd.io/_uploads/SyRMspr8n.png)

```javascript=
 if (monsters.length == 0) {
            background("#d4a373")
             fill("#ccd5ae")
             textSize(60)
              textAlign(CENTER,CENTER)
              text("遊戲結束啦～",width/2-100,height/2-100)
              text("分數",+score,width/2,50)
               noLoop();noCursor();
    }
    }
```
若monster的數量變成0,則會顯示遊戲結束＆分數。



---
## 補充說明🤩
### 計算得分
在 mousePressed() 函式中，當滑鼠按下時，如果球物件位於滑鼠點擊的範圍內，則將該球物件從 balls 陣列中刪除，並將得分 score 增加 1。
```javascript=
for (let ball of balls) {
  if (ball.isBallinRanger(mouseX, mouseY)) {
    balls.splice(balls.indexOf(ball), 1);
    score = score + 1;
  }
}
```
在 draw() 函式中，有一個迴圈用於處理 balls 陣列中的物件。在該迴圈中，檢查每個球物件是否與飛彈重疊，若是則將該球物件從 balls 陣列中刪除，並將得分 score 增加 1。
```javascript=
for (let ball of balls) {
  ball.draw();
  ball.update();
  for (let bullet of bullets) {
    if (ball.isBallinRanger(bullet.p.x, bullet.p.y)) {
      balls.splice(balls.indexOf(ball), 1);
      bullets.splice(bullets.indexOf(bullet), 1);
      score = score + 1;
      dog_sound.play();
    }
  }
}

```
在這兩段程式碼中，當球物件被滑鼠點擊或與飛彈重疊時，都會執行 balls.splice() 來從 balls 陣列中刪除該物件，並且 score 會增加 1，用於計算得分。

### 物件消失不見
![](https://hackmd.io/_uploads/HkJ9gtBLn.gif)


```javascript=
for (let dog of dogs) {
  dog.draw();
  dog.update();
  for (let bullet of bullets) {
    if (dog.isBallinRanger(bullet.p.x, bullet.p.y)) {
      dogs.splice(dogs.indexOf(dog), 1);
      bullets.splice(bullets.indexOf(bullet), 1);
      score = score + 1;
      dog_sound.play();
    }
  }
}
```
檢查火焰是否與飛彈重疊，若是則使用 dogs.splice() 從 dogs 陣列中刪除火焰（子彈），同時使用 bullets.splice() 從 bullets 陣列中刪除相應的飛彈物件。
 藉由這些操作，球物件在被滑鼠點中並與飛彈重疊時會消失。
 


---
## 完整程式碼
### sketch.js(基礎設定)
```javascript=
// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]
// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];


//let time = 0; // 新增時間計數變數
//let timer; // 計時器
//let customShape;
//let bulletAngle = 0;
let gameover = false;
let points = [[4, 0],[5, -1],[5, 0],[6, 1], [6, 3], [8, 1], [8, 0],[7, 0],[7, -1],[6, -1], [6, -9],[4,-9],[5,-8],[3,-6],[-1,-6],[-3,-8],[-3,-9],[-5,-9],[-4,-8],[-4,-6],[-5,-5],[-5,-2],[-8,-2],[-11,1],[-11,3],[-8,3],[-6,5],[-4,5],[-1,2],[-1,1]]; //list資料，
var fill_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)
var line_colors = "ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a".split("-").map(a=>"#"+a)
var score = 0

//++++++設定畫points所有"點"的物件變數++++++
var dog //目前要處理的物件，暫時放在ball(隨意取)變數內 
var dogs = []  //把產生的"所有"的物件，為物件的倉庫，所有資料都在此

//++++++設定飛彈物件的變數++++++
var bullet  //"目前要處理"的物件，暫時放在bullet變數內
var bullets = []  //把產生"所有"的物件，為物件的倉庫，所有物件資料都在此

//++++++設定怪物物件的變數++++++
var monster  //"目前要處理"的物件，暫時放在monster變數內
var monsters = []  //把產生"所有"的物件，為物件的倉庫，所有物件資料都在此

//++++++設定砲台的位置++++++
var shipP



function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  dog_sound = loadSound("sound/dog.wav")
  gun_sound = loadSound("sound/gun.wav")
  monster_sound = loadSound("sound/monster.wav")
  createImg = loadImage("1.jpg");
  createImg1 = loadImage("2.jpg");
  createImg2 = loadImage("3.jpg");
} 

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台的位置為(width/2,height/2)

  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4......,8,9
    dog = new Obj({})  //產生一個Obj class元件
    dogs.push(dog)  //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<20;i=i+1){  //i=0,1,2,3,4......,8,9
    monster = new Monster({})  //產生一個Monster class元件
    monsters.push(monster)  //把ball的物件放入到monsters陣列內
  }
  startTime = millis();
}

function draw() {
  background(createImg );
  // for(var j=0;j<balls.length;j++){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }
//=======按按鈕＝＝＝＝＝＝＝＝
  if(keyIsPressed){
    if(key=="ArrowLeft" || key == "a"){  //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key == "d"){  //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key == "w"){  //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key == "s"){  //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }
  }
  //========狗狗＝＝＝＝＝＝
  for(let dog of dogs){  //只要是陣列的方式，都可以利用此方式來做
    dog.draw()
    dog.update()
    for(let bullet of bullets){  //檢查每一個物件
      if(dog.isBallinRanger(bullet.p.x,bullet.p.y)){
        dogs.splice(dogs.indexOf(dog),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score +=1
        dog_sound.play()
      }
    }
  }
  //++++++++++飛彈的顯示+++++++++
  for(let bullet of bullets){  //只要是陣列的方式，都可使用此方式處理
    bullet.draw()
    bullet.update()
  }

  //++++++++++怪物的顯示++++++++
  for(let monster of monsters)  //只要是陣列的方式，都可以利用此方式來做
      {
        if(monster.dead == true  && monster.timenum>4 ){
          monsters.splice(monsters.indexOf(monster),1)  //從倉庫monster取出，只取一個
        }
        monster.draw()
        monster.update()
        for(let bullet of bullets){  //檢查每一個物件
          if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
            //monsters.splice(monsters.indexOf(monster),1)  //從倉庫monsters取出，只取1個
            bullets.splice(bullets.indexOf(bullet),1)
            score = score-1
            monster.dead = true //怪物死亡
            monster_sound.play()
        }
       }
    }

    //================
    fill("#2a3c24")//設定顏色
  textSize(40)//設定文字大小
  text(score,75,75)  //在座標為(75,75)上顯示score分數內容
  if(score<0&&score>-5){
    text("耶你殺死變異蟲了😎",150,125)
  }else if(score<-4 ){
    text("你拯救了狗狗🥺",150,125)
  }
//=============畫火箭＝＝＝＝＝＝＝＝＝＝＝
  push()  //重新規劃原點(0,0)
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)  //分子:dy 分母:dx
    translate(shipP.x,shipP.y)
    fill("#C89FA3")
    noStroke()
    rotate(angle)
    // 繪製火箭
  fill("#3f37c9"); // 設定填充顏色為藍色
  noStroke(); // 取消描邊
  rect(-25,-25,-80,50); // 繪製箭身（矩形）
  fill("#f72585"); // 設定填充顏色為粉色
  triangle(50,0,-25,25,-25,-25); // 繪製箭口（三角形）
  fill("#dc2f02"); // 設定填充顏色為紅色
  ellipse(-60.5,0,40,20); // 繪製疫苗液體（橢圓形
  fill("#e85d04")// 設定填充顏色為橘色
  arc(50,-1.-5,40,30,0,-90)// 繪製箭砲口
  arc(50,2.5,40,30,90,0)// 繪製箭砲口

  pop()  //恢復原本設定，原點(0,0)在視窗左上角
}
// if (monsters.length == 0) {
//   dogs.splice(0, dogs.length); // 移除所有球體
//   bullets.splice(0, bullets.length); // 移除所有子彈
//   background(createImg1)
//   fill("#b5179e")
//   rect(width/2-200,height/2-100,400,200)
//   fill("#4361ee")
//   textSize(20)
//   text("你的分數是:",width/2-100,height/2-20)
//   text(score,width/2+60,height/2-20)
//   text("你救了狗狗:)",width/2-125,height/2+40)
//   image(createImg1, mouseX-75, mouseY-75 , 175, 175)




// }else if(dogs.length == 0){
//   monsters.splice(0, dogs.length); // 移除所有球體
//   bullets.splice(0, bullets.length); // 移除所有子彈

//   background("#ced4da")
//   background(createImg3)
//   fill("#cb997e")
//   text("變異蟲贏了",width/2-200,height/2-150)
//   text("分數",width/2-100,height/2-90)
//   text(score,width/2,height/2-90)
//   image(createImg2, mouseX-75, mouseY-75 , 175, 175)

// }


function mousePressed(){
  //++++++++++++++++++產生一個物件++++++++++++++++++++++++
  // dog = new Obj({  //在滑鼠按下產生一個新的Obj class元件
  //   p:{x:mouseX,y:mouseY}
  // }) 
  // dogs.push(dog)  //把dog的物件放入到dogs陣列內
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++


  //++++++在物件上按下滑鼠，物件消失不見，分數加一分+++++++
  //   for(let ball of balls){  //檢查每一個物件
  //     if(ball.isBallinRanger(mouseX,mouseY)){
  //       balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(ball.indexOf(ball)只取1個
  //       score = score+1
  //     }
  //   }

 //++++++按一下產生一個飛彈+++++++
 bullet = new Bullet({r:15})  //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)  //大括號內可以加上參數
 bullets.push(bullet)  //把bullet的物件放入bullets陣列內(放入倉庫)
 //gun_sound.play()
 if (monsters.length == 0) {
  gun_sound.stop()
}else if(dogs.length == 0){
  gun_sound.stop()
}else{
  gun_sound.play()
}

if (monsters.length == 0) {
  dog_sound.play()
}else if(dogs.length == 0){
  dog_sound.play()
}
}
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++

 
function keyPressed(){
  if(key==" "){  //按下空白鍵，發射飛彈，其實跟按下滑鼠的功能一樣
    bullet = new Bullet({r:20})  //在滑鼠按下的地方，產生一個新的Bullet class
    bullets.push(bullet)  //把bullet的物件放入到bullets陣列內(丟到倉庫)
    gun_sound.play()
  }  
  
}


  


  
```
### obj.js(狗狗)
```javascript=
//class:類別，粒子
class Obj{  //宣告一個類別，針對一個畫的圖案
    constructor(args){  //預設值，基本資料(物件的顏色，移動的速度、大小、初始值顯示位置......)
      //this.p = args.p || {x: random(width),y:random(height)}//描述為該物件的初始位置，|| (or)，當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有傳參數，就以||(or)後面設定產出
      this.p = args.p || createVector(random(width),random(height))  //把原本{x:......,y:......}改成"向量"方式
      //this.v = {x: random(-1,1),y:random(-1,1)} //設定一個物件的移動速度
      this.v = createVector(random(-1,1),random(-1,1))  //把原本{x:......,y:......}改成"向量"方式
      this.size = random(10,15)  //一個物件的放大倍率
      this.color = random(fill_colors)  //充滿顏色
      this.stroke = random(line_colors)  //線條外框顏色
    }
    draw(){  //畫出單一個物件形狀
      push()  //執行push()後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)  //依該物件位置為原點
        scale(this.v.x<0?1:-1,-1)  //?為否則(<0=1否則=-1) //x軸的放大倍率，如果this.v.x<0條件成立，值為1，否則為-1，y軸的-1為上下顛倒
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)  //線的粗細
        beginShape()
          for(var k=0;k<points.length;k=k+1){
            //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
            //vertex(points[k][0]*this.size,points[k][1]*this.size)  //只要設定一點，當指令到endShape()，會把所有的點連接再一起
            curveVertex(points[k][0]*this.size,points[k][1]*this.size)
          }
        endShape()
      pop()  //執行pop()後，原點(0,0)設定為回到整個視窗的左上角
    }
    update(){
      // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
      // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
      this.p.add(this.v)  //設定好向量後，使用add，就可以抵上面兩行指令
      //向量sub==> 減號
      //知道滑鼠的位置，並建立一個滑鼠的向量
      // let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
      // let delta = mouseV.sub(this.p).limit(this.v.mag()*2)  //sub計算出滑鼠所在位置的向量(mouseV)到物件向量(this.p)的距離，每次以3的距離
      // //this.v.mag()代表該物件的速度大小(一個向量值有大小和方向)
      // this.p.add(delta)
      
      if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向、速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
        this.v.y = -this.v.y  //把y軸方向、速度方向改變
      }
    }
    isBallinRanger(x,y){  //功能：判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
      if(d<4*this.size){  
        return true  //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回ture的值(碰觸)
      }else{  
        return false  //滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
      }

    }
}

```
### Bullets.js（火箭）
```javascript=
class Bullet{
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || 10  //設計的飛彈有大有小時。就傳參數，args
        this.p = args.p || shipP.copy() //createVector(width/2,height/2)  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)  //算出方向，limit-->每次移動5
        this.color = args.color || "#a663cc"
      }
      draw(){  //繪出物件的程式碼
        push()
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r+2)
        pop()
  
      }
      update(){  //計算出移動後的位置
        // this.p.x = this.p.x + this.v.x  //x軸目前位置加上x軸的移動速度
        // this.p.y = this.p.y + this.v.y  //y軸目前位置加上y軸的移動速度
        this.p.add(this.v)
  
      }
    
  }
```
### monster.js（變異蟲）
```javascript=
var colors1 = "335c67-fff3b0-e09f3e-9e2a2b-540b0e0".split("-").map(a=>"#"+a)

class Monster{  //宣稱一個怪物類別。它稱為Monster
    constructor(args){  //預設值，基本資料(物件的顏色、移動的速度、大小、物件顯示的位置......)
        this.r = args.r || random(50,150)  //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就以100為主
        this.p = args.p || createVector(random(width),random(height))  //建立一個向量，(x:width/2,y:height/2)
        this.v = args.v || createVector(random(-1,1),random(-1,1))  //移動的速度，如果沒有傳參數args，就會利用亂數(-1,1)，抽出x,y軸的移動速度
        this.color = args.color || random(colors1)
        this.mode = random(["happy","bad"])
        this.dead = false  //代表活著
        this.timenum = 0 //延長時間，讓大家看到他死
      }
    draw(){  //畫出元件
        if(this.dead == false ){
       push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color)//填色
           noStroke() //不描邊
           ellipse(0,0,this.r,this.r/2) //畫橢圓(怪物身體)
           if(this.mode=="happy"){
               fill(255)
               ellipse(1,0,this.r/1.5)
               //ellipse(0,0,this.r/2)
               fill("#4cc9f0")
               ellipse(0,0,this.r/2)
               ellipse(1,1,this.r/2)
           }else{
               fill("#cdb4db")
               arc(0,0,this.r,this.r,0,PI)
               fill(0)
               arc(0,0,this.r/3,this.r/2,0,PI)
           }
           stroke(this.color)
           strokeWeight(4)
           noFill()
           //line(this.r/2,0,this.r,0)
        for(var j=0;j<10;j++){
           rotate(PI/4)
           beginShape()
           for(var i=0;i<(this.r/3);i++){
            vertex(this.r/3+i,sin(i/2+frameCount/5)*7)

           }
           endShape()
        }
           pop()  //恢復原點到視窗左上角
        }
    
        else{  //怪物死亡
            this.timenum = this.timenum + 1
        push()  //把原點(0,0)座標移到物件中心位置
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)
           stroke(255)
           line(-this.r/2,0,this.r/2,0)
           stroke(this.color)
           strokeWeight(2)
           noFill()
           for(var j=0;j<5;j++){
              rotate(PI/8)
              line(this.r/2,0,this.r,0)
           }
        pop()
        }
        if (monsters.length == 0) {
            background("#d4a373")
             fill("#ccd5ae")
             textSize(60)
              textAlign(CENTER,CENTER)
              text("遊戲結束啦～",width/2-100,height/2-100)
              text("分數",+score,width/2,50)
               noLoop();noCursor();
    }
    }
    update(){  //計算移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){  //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x  //把x軸方向、速度方向改變
          }
        if(this.p.y<=0 || this.p.y>=height){  //x軸碰到上邊(<=0)，或是碰到下邊(>=height)
            this.v.y = -this.v.y  //把y軸方向、速度方向改變
          }

    }
    isBallInRanger(x,y){  //功能:判斷飛彈是否在怪物範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點之間的距離，放到d變數內
        if(d<this.r/2){  
            return true  //飛彈(x,y)與物件的距離(this)
        }else{  
            return false  //飛彈(x,y)與物件的距離(this)，滑鼠與物件的距離大於物件的寬度，代表碰觸了，則傳回false的值(未碰觸)
        }
    }
}
```
### index
```javascript=
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sketch</title>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <script src="sketch.js"></script>
    <script src="Bullet.js"></script>
    <script src="obj.js"></script>
    <script src="monster.js"></script>
  </body>
</html>

```



---

---

