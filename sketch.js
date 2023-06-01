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
 //if (monsters.length == 0) {
//   dogs.splice(0, dogs.length); // 移除所有球體
//   bullets.splice(0, bullets.length); // 移除所有子彈
 // background("#d4a373")
   //fill("#ccd5ae")
//   rect(width/2-200,height/2-100,400,200)
//   fill("#4361ee")
 // textSize(30)
//   text("你的分數是:",width/2-100,height/2-20)
//   text(score,width/2+60,height/2-20)
//   text("你救了狗狗:)",width/2-125,height/2+40)
//   image(createImg1, mouseX-75, mouseY-75 , 175, 175)
//textAlign(CENTER,CENTER)



// }else if(dogs.length == 0){
//   monsters.splice(0, dogs.length); // 移除所有球體
//   bullets.splice(0, bullets.length); // 移除所有子彈

//   background("#ced4da")
//   background(createImg3)
//   fill("#cb997e")
  // text("遊戲結束啦～",width/2,height/2)
  // textSize(12)
  // fill("#a8dadc")
  //  text("分數",+score,width/2,50)
  //  noLoop();
  //  noCursor();
//   text(score,width/2,height/2-90)
//   image(createImg2, mouseX-75, mouseY-75 , 175, 175)

 //}


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


  