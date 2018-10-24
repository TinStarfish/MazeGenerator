var size = 380;
var radiationType = 'Random';
var color;
var canvas;
var ctx;
var grid;

var MAZE_WIDTH = 500;
var MAZE_HEIGHT = 500;
var BLOCK_SIZE = 20;

var MAZE_TEMP_WIDTH = 25;
var MAZE_TEMP_HEIGHT = 25;

var WALL_COLOR = 'rgb(47,52,64)';
var FOLLOW_COLOR = 'rgb(80,110,130)';
var START_COLOR = 'rgb(248,202,77)';
var END_COLOR = 'rgb(181,74,53)';
var PATH_COLOR = 'rgb(113, 155,184)';
var PLAYER_COLOR = 'rgb(150, 110, 121)';

var StartPoint;
var EndPoint;
var currentNode;
var currentNode_X;
var currentNode_Y;

var playerNode_X;
var playerNode_Y;

var Visited = [];
var Traceback = [];
var TracebackCopy = [];
var TracebackLongest = 0;

function Main () {
    DrawCanvas();
    MazeBase();
    SetNodes();
    DrawStartPoint();
    DepthFirstSearchIterative();
    DrawEndPoint();
    DrawPlayer();
    //DrawAI();
    //PlayerMovement();
    DrawMaze();
    
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyW') {
        PlayerMovement('keyW');
        
    }
     if (event.code == 'KeyS') {
        PlayerMovement('keyS');
        
    }
    
     if (event.code == 'KeyA') {
        PlayerMovement('keyA');
        
    }
     if (event.code == 'KeyD') {
        PlayerMovement('keyD');
        
    }
    
    
})

function DrawCanvas() {
    
    playerNode_X = 1;
    playerNode_Y = 3;
    
    Visited = [];
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
    grid = [];
    canvas.width = MAZE_WIDTH;
    canvas.height = MAZE_HEIGHT;
    
    
}

function DrawSquare(x,y, color) {
    ctx.fillStyle = color;
    ctx.fillRect (x,y,BLOCK_SIZE-1,BLOCK_SIZE-1);
    
    
}

function MazeBase() {
        //CREATE BASE FOR MASE
    for (var i = 0; i < MAZE_TEMP_WIDTH; i++) {
        grid[i] = [];
        for (var j = 0; j < MAZE_TEMP_HEIGHT; j++) {
            grid[i][j] = 1;
            
        }
        
    }
    
}

function DrawMaze() {
   
    for(var y = 0; y<MAZE_TEMP_HEIGHT;y++) {
        for(var x=0; x<MAZE_TEMP_WIDTH;x++) {
    //DRAW WALLS
            if(grid[x][y] == 1) {
                DrawSquare(x*BLOCK_SIZE,y*BLOCK_SIZE, WALL_COLOR);
            }
    //DRAW PATH
            if(grid[x][y] == 0) {
                DrawSquare(x*BLOCK_SIZE,y*BLOCK_SIZE, PATH_COLOR);
                
            }
    //DRAW START
            if(grid[x][y] == 2) {
                DrawSquare(x*BLOCK_SIZE,y*BLOCK_SIZE, START_COLOR);
                
            }
    //DRAW END
            if(grid[x][y] == 3) {
                DrawSquare(x*BLOCK_SIZE,y*BLOCK_SIZE, END_COLOR);
                
            }
    //DRAW FOLLOW
            if(grid[x][y] == 4) {
                DrawSquare(x*BLOCK_SIZE,y*BLOCK_SIZE, FOLLOW_COLOR);
                
            }
    //DRAE PLAYER
            if(grid[x][y] == 5) {
                DrawSquare(x*BLOCK_SIZE, y*BLOCK_SIZE, PLAYER_COLOR);
                
                
            }
            
            
        }
        
    }
    
    
}

function DrawPlayer() {
    
    
    
}

function SetNodes() {
    for(var y = 0; y<MAZE_TEMP_HEIGHT-1;y++) {
        for(var x=0; x<MAZE_TEMP_WIDTH-1;x++) {
            if(x%2!=0 && y%2!=0) {
                grid[x][y] = 0;
                
                
            }       
            
        }
        
    }
    
}

function DepthFirstSearchIterative() {
    
    Visited.push({x:currentNode_X, y:currentNode_Y});
    Traceback.push({x:currentNode_X, y:currentNode_Y});
    
    for(var i = 0; i < MAZE_TEMP_HEIGHT*MAZE_TEMP_WIDTH;i++) {
        
        if(Traceback.length>TracebackLongest){
            TracebackCopy=Traceback.slice();
            TracebackLongest=Traceback.length;
            
        }
             
        //console.log(TracebackCopy);
        var possibleDirections = "";
        var previousDirection = "";

        
        //check below node
        if(currentNode_Y+2>0 && currentNode_Y+2<MAZE_TEMP_HEIGHT && grid[currentNode_X][currentNode_Y+2] == 0) { 
            possibleDirections += "D";
            
        }
        //check above node
        if(currentNode_Y-2>0 && currentNode_Y-2<MAZE_TEMP_HEIGHT && grid[currentNode_X][currentNode_Y-2] == 0) {
            possibleDirections += "U";
            
        }
        //check left node
        if(currentNode_X-2>0 && currentNode_X-2<MAZE_TEMP_WIDTH && grid[currentNode_X-2][currentNode_Y] == 0) {
            possibleDirections += "L";
            
        }
        //check right node
         if(currentNode_X+2>0 && currentNode_X+2<MAZE_TEMP_WIDTH && grid[currentNode_X+2][currentNode_Y] == 0) {
            possibleDirections += "R";
            
        }
        
        //console.log("Possible directions- " + possibleDirections);
    
        
        if(possibleDirections){
             var randomDir = Math.floor(Math.random()*(possibleDirections.length));
        switch (possibleDirections[randomDir]) {
            case "U":
                if(previousDirection!="U"){
                    grid[currentNode_X][currentNode_Y-2] = 4;
                    grid[currentNode_X][currentNode_Y-1] = 4;
                    currentNode_Y+=-2;
                    
                    previousDirection="U";
                   
                   } else {
                        
                      //console.log("previous direction was 'UP', choosing another direction.");
                       
                   }
               
               break;
            case "D":
                if(previousDirection!="D"){
                    grid[currentNode_X][currentNode_Y+2] = 4;
                    grid[currentNode_X][currentNode_Y+1] = 4;
                    currentNode_Y+=2;

                    previousDirection="D";
                          
                } else {
                    
                    //console.log("previous direction was 'DOWN', choosing another direction.");
                    break;
                    
                }
                
                break;
            case "L":
                if(previousDirection!="L"){
                    grid[currentNode_X-2][currentNode_Y] = 4;
                    grid[currentNode_X-1][currentNode_Y] = 4;
                    currentNode_X+=-2;

                    previousDirection="L";
                    
                } else {
                    
                     //console.log("previous direction was 'LEFT', choosing another direction.");
                    
                }
                     
                     
                break;
            case "R":
                if(previousDirection!="R") {
                    grid[currentNode_X+2][currentNode_Y] = 4;
                    grid[currentNode_X+1][currentNode_Y] = 4;
                    currentNode_X+=2;
                    previousDirection="R";
                    
                }
                     
                else {
                    
                     //console.log("previous direction was 'RIGHT', choosing another direction.");
                    
                }
               
                break;
            
            
            }
            Visited.push({x:currentNode_X, y:currentNode_Y});
            //console.log(Visited);
            Traceback.push({x:currentNode_X, y:currentNode_Y});  
           
        } else {
            if(Traceback.length > 0) {
                currentNode_X = Traceback[Traceback.length-1].x;
                currentNode_Y = Traceback[Traceback.length-1].y;
               
            }
            
            Traceback.pop();
            
            
        }      
                    
        
    }  
    
}

function DrawStartPoint() {
    var randSide = Math.floor(Math.random()*4);
    var randX;
    var randY;
    
    if(randSide==0 || randSide==2){
        randX = (Math.floor(Math.random()*(MAZE_TEMP_WIDTH-1)/2))*2+1;
        randY = 1;
        grid[randX][randY] = 2;
        StartPoint = grid[randX][randY];
        currentNode_X = randX;
        currentNode_Y = randY;
        
    
        
    }
    else if(randSide==1 || randSide==3){
        randX = 1;
        randY = (Math.floor(Math.random()*(MAZE_TEMP_HEIGHT-1)/2))*2+1;
        grid[randX][randY] = 2;
        StartPoint = grid[randX][randY];
        currentNode_X = randX;
        currentNode_Y = randY;
       
         
    }
}

function DrawEndPoint() {
    
    var newXValue = TracebackCopy[TracebackCopy.length-1].x;
    var newYValue = TracebackCopy[TracebackCopy.length-1].y;
    console.log("End Point X- " + newXValue);
    console.log("End Point Y- " + newYValue);
    grid[newXValue][newYValue]=3;
    
}

function DrawAI() {
    for (var i = 0; i < TracebackCopy.length; i++) {
        setInterval(AnimateAI(i), 1000);
       
               
    }  
        
}

function AnimateAI(x) {
      
    var newXValue = TracebackCopy[x].x;
    var newYValue = TracebackCopy[x].y;
    
    if(grid[newXValue][newYValue]==2 || grid[newXValue][newYValue]==3) {
        //console.log("That's the start point.");
        
    } else {
        grid[newXValue][newYValue] = 0;
        
    }
    
    //console.log("animate frame- "+x);
    //DrawMaze();   
    
    
    
}

function PlayerMovement(direction) {
    
       //grid[playerNode_X][playerNode_Y] = 5;
    
   
       
       if (direction=='keyW') {
            //Up
            if (grid[playerNode_X][playerNode_Y-1]==4) {
                grid[playerNode_X][playerNode_Y-1] = 5;
                
            
            } 
           
           console.log("Up");
       
       
       }
       
    /*
       if (direction=='keyS') {
           
           if (grid[playerNode_X][playerNode_Y+1]!=null && grid[playerNode_X][playerNode_Y+1]!=1) {
               grid[playerNode_X][playerNode_X] = 4; 
               grid[playerNode_X][playerNode_Y+1] = 5;
                
                
                playerNode_X = grid[playerNode_X][playerNode_Y-1].x;
                playerNode_Y = grid[playerNode_X][playerNode_Y-1].y;
                
            
            } else {
                console.log("That's a wall mate");
                
            }
           
            console.log("Down");
       
       
       }
       
       if (direction=='keyA') {
           
           if (grid[playerNode_X-1][playerNode_Y]!=null && grid[playerNode_X][playerNode_Y+1]!=1) {
               grid[playerNode_X][playerNode_X] = 4; 
               grid[playerNode_X][playerNode_Y+1] = 5;
                
                
                playerNode_X = grid[playerNode_X-1][playerNode_Y].x;
                playerNode_Y = grid[playerNode_X-1][playerNode_Y].y;
                
            
            } else {
                console.log("That's a wall mate");
                
            }
           
        console.log("Left");
       
       
       }
       
       if (direction=='keyD') {
           
           if (grid[playerNode_X][playerNode_Y+1]!=null && grid[playerNode_X][playerNode_Y+1]!=1) {
               grid[playerNode_X][playerNode_X] = 4; 
               grid[playerNode_X][playerNode_Y+1] = 5;
                
                
                playerNode_X = grid[playerNode_X][playerNode_Y-1].x;
                playerNode_Y = grid[playerNode_X][playerNode_Y-1].y;
                
            
            } else {
                console.log("That's a wall mate");
                
            }
           
        console.log("Right");
       
       
       }
       
    */
    
     DrawMaze();
    
}
/*
function moveBox(){
    console.log(path[currentStop+1]);
    temp = path[currentStop+1];
    if(boxX < temp.x*BLOCK_SIZE) boxX += 5;
    if(boxX > temp.x*BLOCK_SIZE) boxX -= 5;

    if(boxY < temp.y*BLOCK_SIZE) boxY += 5;
    if(boxY > temp.y*BLOCK_SIZE) boxY -= 5;
    if(boxX == temp.x*BLOCK_SIZE && boxY==temp.y*BLOCK_SIZE){
        currentStop++;
    }
    if(currentStop >= path.length-1) currentStop = 0;
    ctx.clearRect(0,0,500,500);

    drawSquare(boxX,boxY);
    //boxX+=5;
    //if(boxX>500) boxX=0-BLOCK_SIZE;
}
*/
Main();