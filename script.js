var size = 380;
var radiationType = 'Random';
var color;
var canvas;
var ctx;
var grid;

var MAZE_WIDTH = 500;
var MAZE_HEIGHT = 500;
var BLOCK_SIZE = 20;

var WALL_COLOR = 'rgb(47,52,64)';
var PATH_COLOR = 'rgb(63,86,102)';
var START_COLOR = 'rgb(248,202,77)';
var END_COLOR = 'rgb(181,74,53)';
var FOLLOW_COLOR = 'rgb(245,229,192)';

var StartPoint;
var EndPoint;

var Visited = [];
var Traceback = [];

function Main () {
    DrawCanvas();
    DrawMaze();
    DepthFirstSearchIterative();
    
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

function DrawMaze() {
    //CREATE BASE FOR MASE
    for (var i = 0; i < MAZE_WIDTH; i++) {
        grid[i] = [];
        for (var j = 0; j < MAZE_HEIGHT; j++) {
            grid[i][j] = 1;
            
        }
        
    }
    
    //CREATE START AND END POINTS RANDOMLY
    SetNodes();
    DrawStartAndEndPoints();
   
    for(var y = 0; y<MAZE_HEIGHT;y++) {
        for(var x=0; x<MAZE_WIDTH;x++) {
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
            
            
        }
        
    }
    
    
}

function SetNodes() {
    for(var y = 0; y<MAZE_HEIGHT-2;y++) {
        for(var x=0; x<MAZE_WIDTH-2;x++) {
            if(x%2!=0 && y%2!=0) {
                grid[x][y] = 0;
                
                
            }       
            
        }
        
    }
    
}

//function FindNearestNeighbors(){



//}

function DepthFirstSearchIterative() {
    
    Visited.push(StartPoint);
    Traceback.push(StartPoint);
    console.log(Visited);
    
    
    
    
}

function DrawStartAndEndPoints() {
    var randSide = Math.floor(Math.random()*4);
    var boolean = true;
    var randX;
    var randY;
    /*
    b = Math.floor(Math.Random(MW-1)/2);
    c = b*2+1
    randX = c;
    */
    if(randSide==0 || randSide==2){
        randX = Math.floor(Math.random(MAZE_WIDTH-1)/2) * 2 + 1;
        randY = 1;
        grid[randX][randY] = 2;
        
    }
    if(randSide==1 || randSide==3){
        randX = 1;
        randY = Math.floor(Math.random(MAZE_HEIGHT-1)/2) * 2 + 1;
        grid[randX][randY] = 2;
        
        
    }
    
    
    
    
    
}

Main();