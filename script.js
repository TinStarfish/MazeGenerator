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
var PATH_COLOR = 'rgb(63,86,102)';
var START_COLOR = 'rgb(248,202,77)';
var END_COLOR = 'rgb(181,74,53)';
var FOLLOW_COLOR = 'rgb(245,229,192)';

var StartPoint;
var EndPoint;
var currentNode;
var currentNode_X;
var currentNode_Y;

var Visited = [];
var Traceback = [];

function Main () {
    DrawCanvas();
    MazeBase();
    SetNodes();
    DrawStartAndEndPoints();
    DepthFirstSearchIterative();
    DrawMaze();
    
}

function DrawCanvas() {
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
            
            
        }
        
    }
    
    
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
        
//        console.log(Visited);
        
        var possibleDirections = "";

        
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
        
        console.log("Possible directions- " + possibleDirections);
    
        
        if(possibleDirections){
             var randomDir = Math.floor(Math.random()*(possibleDirections.length-1)+0);
//                console.log("Random direction- " + randomDir);
             switch (possibleDirections[randomDir]) {
            case "U":
                grid[currentNode_X][currentNode_Y-2] = 4;
                grid[currentNode_X][currentNode_Y-1] = 4;
                currentNode_Y+=-2;
                break;
            case "D":
                grid[currentNode_X][currentNode_Y+2] = 4;
                grid[currentNode_X][currentNode_Y+1] = 4;
                currentNode_Y+=2;
                break;
            case "L":
                grid[currentNode_X-2][currentNode_Y] = 4;
                grid[currentNode_X-1][currentNode_Y] = 4;
                currentNode_X+=-2;
                break;
            case "R":
                grid[currentNode_X+2][currentNode_Y] = 4;
                grid[currentNode_X+1][currentNode_Y] = 4;
                currentNode_X+=2;
                break;
            
            
            }
            Visited.push({x:currentNode_X, y:currentNode_Y});
            console.log(Visited);
            //Traceback.push({x:currentNode_X, y:currentNode_Y});
           
        } else {
            if(Visited.length > 0) {
                currentNode_X = Visited[Visited.length-1].x;
                currentNode_Y = Visited[Visited.length-1].y;
            }
            Visited.pop();
            
            
        }      
                    
        
    }  
    
}

function DrawStartAndEndPoints() {
    var randSide = Math.floor(Math.random()*4);
    console.log("random side: " + randSide);
    var randX;
    var randY;
    /*
    b = Math.floor(Math.Random(MW-1)/2);
    c = b*2+1
    randX = c;
    */
    if(randSide==0 || randSide==2){
        randX = (Math.floor(Math.random()*(MAZE_TEMP_WIDTH-1)/2))*2+1;
        randY = 1;
        grid[randX][randY] = 2;
        StartPoint = grid[randX][randY];
        currentNode_X = randX;
        currentNode_Y = randY;
        console.log("Ran:"+randSide + " X:" + randX + " Y:" + randY);
    
        
    }
    else if(randSide==1 || randSide==3){
        randX = 1;
        randY = (Math.floor(Math.random()*(MAZE_TEMP_HEIGHT-1)/2))*2+1;
        grid[randX][randY] = 2;
        StartPoint = grid[randX][randY];
        currentNode_X = randX;
        currentNode_Y = randY;
        console.log("Ran:"+randSide + " X:" + randX + " Y:" + randY);
         
    }
}

Main();