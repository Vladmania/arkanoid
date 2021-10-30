const field = document.querySelector('.field')
let counterDisplay = document.querySelector('.counter')
let counter = 0
let lifeDisplay = document.querySelector('.life');
let life = 3;
let levelDisplay = document.querySelector('.level');
let level = 1;
let button = document.querySelector('.btn');
let blockWidth = 105;
let blockHeight = 25;
let bollDiameter = 20;
let startPosition = [350, 30];
let bollStartPosition = [startPosition[0] + 40 , 50];
let x;
let y = 2;
let timer;
let block;
let block1;
let block2;
let allBlocks;
let allBlocks1;
let allBlocks2;
let gameOver = document.createElement('div')
let textGameOver = document.createElement('h1')
textGameOver.classList.add("textGameOver")
textGameOver.innerHTML = "Ты Проиграл"
gameOver.classList.add('gameOver')
gameOver.appendChild(textGameOver)
field.appendChild(gameOver)

function ret() {
  x = Math.floor(Math.random() * 10 % 2)
  if(x === 1){
      return x=2
  }else if( x === 0){
      return x = -2
  }
}
ret()

class Block {
  constructor(xAxis , yAxis){
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}


let blocks = [
  new Block(10,570), 
  new Block(120,570), 
  new Block(230,570), 
  new Block(340,570), 
  new Block(450,570), 
  new Block(560,570), 
  new Block(670,570),
  new Block(10,540), 
  new Block(120,540), 
  new Block(230,540), 
  new Block(340,540), 
  new Block(450,540), 
  new Block(560,540), 
  new Block(670,540), 
]
let blocks1 = [
  new Block(10,510), 
  new Block(120,510), 
  new Block(230,510), 
  new Block(340,510), 
  new Block(450,510), 
  new Block(560,510), 
  new Block(670,510),
  new Block(10,480), 
  new Block(120,480), 
  new Block(230,480), 
  new Block(340,480), 
  new Block(450,480), 
  new Block(560,480), 
  new Block(670,480), 
]
let blocks2 = [
  new Block(12,572), 
  new Block(122,572), 
  new Block(232,572), 
  new Block(342,572), 
  new Block(452,572), 
  new Block(562,572), 
  new Block(672,572),
  new Block(12,542), 
  new Block(122,542), 
  new Block(232,542), 
  new Block(342,542), 
  new Block(452,542), 
  new Block(562,542), 
  new Block(672,542), 
]

function addBlock () {
  for(let i = 0; i < 14; i++){
  block = document.createElement("div")
  block.classList.add('block')
  block.style.left =  blocks[i].bottomLeft[0] + 'px'
  block.style.bottom = blocks[i].bottomLeft[1] + 'px'
  field.appendChild(block)

 }
 for(let i = 0; i < 14; i++){
  block1 = document.createElement("div")
  block1.classList.add('block1')
  block1.style.left =  blocks1[i].bottomLeft[0] + 'px'
  block1.style.bottom = blocks1[i].bottomLeft[1] + 'px'
  field.appendChild(block1) 
}
for(let i = 0; i < 14; i++){
  block2 = document.createElement("div")
  block2.classList.add('block2')
  block2.style.left =  blocks2[i].bottomLeft[0] + 'px'
  block2.style.bottom = blocks2[i].bottomLeft[1] + 'px'
  field.appendChild(block2) 
}
}

addBlock ()

let user = document.createElement('div');
user.classList.add('user');
user.style.left = startPosition[0] + 'px'
user.style.bottom = startPosition[1] + 'px'
user.style.width = 100 + 'px'
field.appendChild(user);


function moveUser(e) {
    switch (e.key){
      case 'ArrowLeft':
        if(startPosition[0] > 0){
        startPosition[0] -= 20
        user.style.left = startPosition[0] + 'px'
        user.style.bottom = startPosition[1] + 'px'
        }
        break;
      case 'ArrowRight':
        if(startPosition[0] < 680 ){
          startPosition[0] += 20
          user.style.left = startPosition[0] + 'px'
          user.style.bottom = startPosition[1] + 'px'
        }  
        break;
    }
}
function moveboll(e) {
  switch (e.key){
    case 'ArrowLeft':
      if(bollStartPosition[0] > 30){
      bollStartPosition[0] -= 20
      boll.style.left = bollStartPosition[0] + 'px'
      boll.style.bottom = bollStartPosition[1] + 'px'
      }
      break;
    case 'ArrowRight':
      if(bollStartPosition[0] < 720 ){
        bollStartPosition[0] += 20
        boll.style.left = bollStartPosition[0] + 'px'
        boll.style.bottom = bollStartPosition[1] + 'px'
      }  
      break;
  }
  if(bollStartPosition[1] > 50){
    document.removeEventListener('keydown', moveboll)
  }
}
document.addEventListener('keydown', moveUser)
document.addEventListener('keydown', moveboll)

function startboll() {
  boll.style.left = bollStartPosition[0] + 'px'
  boll.style.bottom = bollStartPosition[1] + 'px'
}

let boll = document.createElement("div")
boll.classList.add('boll')
startboll()
field.appendChild(boll)


function moveBoll() {
  bollStartPosition[0] += x;
  bollStartPosition[1] += y;
  startboll();
  collisions();
  
}

button.addEventListener('click', () => timer = setInterval(moveBoll, 10))



function collisions(){
  for( let i = 0; i < blocks.length; i++){
    if( (bollStartPosition[0] > blocks[i].bottomLeft[0] && bollStartPosition[0] < blocks[i].bottomRight[0] ) &&
     ((bollStartPosition[1] + bollDiameter) > blocks[i].bottomLeft[1] && bollStartPosition[1] < blocks[i].topLeft[1])
     ){
      allBlocks = document.querySelectorAll(".block")
      allBlocks[i].classList.remove('block')
      blocks.splice(i, 1)
       trajectoryBoll()
       counter++ + counter++
       counterDisplay.innerHTML = counter
     }
         
  } 
  for( let i = 0; i < blocks1.length; i++){
    if( (bollStartPosition[0] > blocks1[i].bottomLeft[0] && bollStartPosition[0] < blocks1[i].bottomRight[0] ) &&
     ((bollStartPosition[1] + bollDiameter) > blocks1[i].bottomLeft[1] && bollStartPosition[1] < blocks1[i].topLeft[1])
     ){
      allBlocks1 = document.querySelectorAll(".block1")
      allBlocks1[i].classList.remove('block1')
        blocks1.splice(i, 1)
       trajectoryBoll()
       counter++
       counterDisplay.innerHTML = counter    
    }      
  } 
  for( let i = 0; i < blocks2.length; i++){
    if( (bollStartPosition[0] > blocks2[i].bottomLeft[0] && bollStartPosition[0] < blocks2[i].bottomRight[0] ) &&
     ((bollStartPosition[1] + bollDiameter) > blocks2[i].bottomLeft[1] && bollStartPosition[1] < blocks2[i].topLeft[1])
     ){
      allBlocks2 = document.querySelectorAll(".block2")
      allBlocks2[i].classList.remove('block2')
        blocks2.splice(i, 1)
       trajectoryBoll()
       counter++
       counterDisplay.innerHTML = counter    
    }      
  } 
  
  if( bollStartPosition[0] >= field.clientWidth - 15 ||
     bollStartPosition[1] >= field.clientHeight|| 
     bollStartPosition[0] <= 0){
    trajectoryBoll()
  }
  

   if(
    (bollStartPosition[0] > startPosition[0] && bollStartPosition[0] < startPosition[0] + 100) &&
    (bollStartPosition[1] > startPosition[1] && bollStartPosition[1] < startPosition[1] + 20)
   ){
    trajectoryBoll()
   }
   if(blocks.length === 0 && blocks1.length === 0){
    level++
    levelDisplay.innerHTML = level
    startPosition[0] = 350;
    startPosition[1] = 30;
    user.style.left = startPosition[0] + 'px';
    user.style.bottom = startPosition[1] + 'px';
    bollStartPosition[0] = 390;
    bollStartPosition[1] = 50;
    boll.style.left = bollStartPosition[0] + 'px';
    boll.style.bottom = bollStartPosition[1] + 'px';
    document.addEventListener('keydown', moveboll)
    blocks = [
      new Block(10,570), 
      new Block(120,570), 
      new Block(230,570), 
      new Block(340,570), 
      new Block(450,570), 
      new Block(560,570), 
      new Block(670,570),
      new Block(10,540), 
      new Block(120,540), 
      new Block(230,540), 
      new Block(340,540), 
      new Block(450,540), 
      new Block(560,540), 
      new Block(670,540), 
    ]
    blocks1 = [
      new Block(10,510), 
      new Block(120,510), 
      new Block(230,510), 
      new Block(340,510), 
      new Block(450,510), 
      new Block(560,510), 
      new Block(670,510),
      new Block(10,480), 
      new Block(120,480), 
      new Block(230,480), 
      new Block(340,480), 
      new Block(450,480), 
      new Block(560,480), 
      new Block(670,480), 
    ]
    blocks2 = [
      new Block(12,572), 
      new Block(122,572), 
      new Block(232,572), 
      new Block(342,572), 
      new Block(452,572), 
      new Block(562,572), 
      new Block(672,572),
      new Block(12,542), 
      new Block(122,542), 
      new Block(232,542), 
      new Block(342,542), 
      new Block(452,542), 
      new Block(562,542), 
      new Block(672,542), 
    ]
    addBlock ()
    clearInterval(timer)
    
  }
  if(level >= 10){
    levelDisplay.innerHTML = "Победа"
  }
 
  
  if(bollStartPosition[1] <= 0){
    life--
    lifeDisplay.innerHTML = life
    startPosition[0] = 350;
    startPosition[1] = 30;
    user.style.left = startPosition[0] + 'px';
    user.style.bottom = startPosition[1] + 'px';
    bollStartPosition[0] = 390;
    bollStartPosition[1] = 50;
    boll.style.left = bollStartPosition[0] + 'px';
    boll.style.bottom = bollStartPosition[1] + 'px';
    document.addEventListener('keydown', moveboll)
    trajectoryBoll()  
    clearInterval(timer)
 }

 if (life <= 0){
  lifeDisplay.innerHTML = 'Лошара'
  user.style.left = 350 + 'px'
  user.style.bottom = 30 + 'px'
  gameOver.style.display = 'block'
  button.addEventListener('click', () => clearInterval(timer))
 }
 
}


function trajectoryBoll() {
  if(x === 2 && y === 2){
    
    return y = -2
  }
  if (x === 2 && y === -2){
   
    return x = -2
  }
  if(x === -2 && y === -2){
    
    return y = 2
  }
  if( x === -2 && y === 2){
    
    return x = 2
  }

}