const gameTiles=document.querySelectorAll('.tile');
const gameBoard=document.querySelector('#board');
const gameStart=document.querySelector('.game-start');
const gameState=[
    [gameTiles[0], gameTiles[1], gameTiles[2]],
    [gameTiles[3], gameTiles[4], gameTiles[5]],
    [gameTiles[6], gameTiles[7], gameTiles[8]]
]
let timerInterval
function render( gameBoard, gameState){
    gameState.forEach((row, rowIndex)=>{
      row.forEach((column, columnIndex)=>{
        column.style.top=`${rowIndex*100}px`
        column.style.left=`${columnIndex*100}px`
       gameBoard.appendChild(column) 
       column.style['background-position-y']=`-${rowIndex*100}px`
       column.style['background-position-x']=`-${columnIndex*100}px`
      });
    });
};
function moveElemnet(element1, element2){
  
 const tempTop=element1.style.top;
 const tempLeft=element1.style.left;
  element1.style.top=element2.style.top;
  element1.style.left=element2.style.left;
  element2.style.top=tempTop;
  element2.style.left=tempLeft;
 
}
render(gameBoard, gameState);

gameBoard.addEventListener('click',(e)=>{
    const target = e.target;
    let x, y;
gameState.forEach((row, rowIndex)=>{
    row.forEach((column, columnIndex)=>{
      if(column===target){
        x=rowIndex;
        y=columnIndex;
      };
    });
    
});

let emptyX, emptyY;

gameState.forEach((row, rowIndex)=>{
    row.forEach((column, columnIndex)=>{
      if(column.innerText===''){
        emptyX=rowIndex;
        emptyY=columnIndex;
      };
    });
    
});

if((y===emptyY && (x+1===emptyX|| x-1===emptyX)) 
|| (x===emptyX &&(y+1===emptyY||y-1===emptyY))){
  moveElemnet(gameState[x][y],gameState[emptyX][emptyY])
  const temp=gameState[x][y];
gameState[x][y]=gameState[emptyX][emptyY];
gameState[emptyX][emptyY]=temp;
};

});
function randomElements() {
  for (let i = 0; i < 10; i++) { 
      const randomRowIndex1 = Math.floor(Math.random() * gameState.length);
      const randomColumnIndex1 = Math.floor(Math.random() * gameState[0].length);
      const randomRowIndex2 = Math.floor(Math.random() * gameState.length);
      const randomColumnIndex2 = Math.floor(Math.random() * gameState[0].length);

      moveElemnet(gameState[randomRowIndex1][randomColumnIndex1], gameState[randomRowIndex2][randomColumnIndex2]);
      const temp = gameState[randomRowIndex1][randomColumnIndex1];
      gameState[randomRowIndex1][randomColumnIndex1] = gameState[randomRowIndex2][randomColumnIndex2];
      gameState[randomRowIndex2][randomColumnIndex2] = temp;
  };
};

gameStart.addEventListener('click',()=>{
  randomElements();
  startTimer();
  

});
function startTimer() {
  let startTime = Date.now();
   timerInterval = setInterval(() => {
      let elapsedTime = Date.now() - startTime;
      let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
      document.querySelector('.stopwatch').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}


