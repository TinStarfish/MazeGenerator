var size = 380;
var radiationType = 'Random';
var color;
var canvas;
var ctx;
var grid;

var MAZE_WIDTH = 400;
var MAZE_HEIGHT = 400;
var BLOCK_SIZE = 20;


function Main () {
    DrawCanvas();
    DrawMaze();
    
}

function DrawCanvas() {
    
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
    grid = [];
    canvas.width = MAZE_WIDTH;
    canvas.height = MAZE_HEIGHT;
    
    
}

function DrawSquare(x,y) {
    ctx.fillStyle = 'rgb(255,0,255)';
    ctx.fillRect (x,y,BLOCK_SIZE,BLOCK_SIZE);
    

    
    
    
}

function DrawMaze() {
    for (var i = 0; i < MAZE_WIDTH; i++) {
        grid[i] = [];
        for (var j = 0; j < MAZE_HEIGHT; j++) {
            grid[i][j] = 1;
            
        }
        
    }
    for(var y = 0; y<MAZE_HEIGHT;y++) {
        for(var x=0; x<MAZE_WIDTH;x++) {
            if(grid[x][y] == 1) {
                DrawSquare(x*BLOCK_SIZE,y*BLOCK_SIZE);
            }
            
        }
        
    }
    
    
}

Main();