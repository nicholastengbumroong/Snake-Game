
let snake = [
    {x: 300, y: 300}, 
    {x: 285, y: 300}, 
    {x: 270, y: 300}, 
    {x: 255, y: 300}, 
    {x: 240, y: 300}
];

let foodX;
let foodY; 
let dx = 15; 
let dy = 0;
let score = 0; 
const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");
 
document.addEventListener("keydown", changeDirection);

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen'; 
    ctx.fillRect(snakePart.x, snakePart.y, 15, 15);
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(snakePart.x, snakePart.y, 15, 15); 
}

function drawSnake() {
    snake.forEach(drawSnakePart);
    
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    snake.unshift(head);
    const snakeAteFood = head.x == foodX && head.y == foodY; 
    if (snakeAteFood){
        createFood();
        score += 1; 
        document.getElementById("score").innerHTML = score; 
    }
    else {
        snake.pop();
    }
}


function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function changeDirection(event){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39; 
    const UP_KEY = 38;
    const DOWN_KEY = 40; 
     

    switch (event.keyCode) {
        case LEFT_KEY:
            if (dx == 15)
                break;
            else {
                dx = -15;
                dy = 0;
            }
            break;
        case RIGHT_KEY:
            if (dx == -15)
                break;
            else {
                dx = 15;
                dy = 0;
            }
            break;
        case UP_KEY:
            if (dy == 15)
                break;
            else {
                dx = 0;
                dy = -15;
            }
            break;
        case DOWN_KEY:
            if (dy == -15)
                break;
            else {
                dx = 0;
                dy = 15;
            }
            break; 
    } 
    
}

function createFood() {
    foodX = (Math.floor(Math.random() * 38) * 15) + 15;
    foodY = (Math.floor(Math.random() * 38) * 15) + 15;
    snake.forEach(function isFoodOnSnake(snakePart) {
        foodIsOnSnake = snakePart.x == foodX && snakePart.y == foodY; 
        if (foodIsOnSnake){
            createFood(); 
        }
    });
}

function drawFood() {
     
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred'; 
    ctx.fillRect(foodX, foodY, 15, 15);
    ctx.strokeRect(foodX, foodY, 15, 15); 
}
 
function isGameOver() {
    for (let i = 4; i < snake.length; i++){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            return true; 
    }

    if (snake[0].x < 0 || snake[0].x > gameCanvas.width - 15 || snake[0].y < 0 || snake[0].y > gameCanvas.height - 15){
        return true;
    }

    return false; 
}


function main() {
    if (isGameOver()){
        return; 
    }
    
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake(); 
        drawSnake();
        main(); 
    }, 100);  
     
}