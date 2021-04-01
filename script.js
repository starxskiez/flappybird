/* 
Flappy Bird:

SPACE to jump
Any other key to pause and unpause

My Highscore: 63

*/

// canvas
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// font
context.font = "18.5px PressStart2P";

// variables
var bird_y = 0;
var bird_dy = 0;
var bird_img = new Image(51.2, 28.4);
var pipe_x = 500;
var pipe_height = 200;
var score = 0;
var highscore = 0;
var paused = false;

bird_img.src = "flappy.png";

function random_pipe() {
    pipe_height = Math.random() * 125 + 50;
    pipe_x = 500;
    score = score + 1;
    console.log(score)
    if (score > highscore) {
        highscore = score;
    }
};

function game() {
    // background
    context.fillStyle = "skyblue";
    context.fillRect(0, 0, 500, 500);

    // pipe
    context.fillStyle = "green";
    context.fillRect(pipe_x, 0, 50, 500);
    context.fillStyle = "skyblue";
    context.fillRect(pipe_x, pipe_height, 50, 200);

    // score
    context.fillStyle = "black"
    context.fillText("Score: " + score + "    Highscore: " + highscore, 30, 40)

    // bird
    context.drawImage(bird_img, 20, bird_y);

    // logic
    bird_y -= bird_dy -= 0.5;
    pipe_x -= Math.min(Math.max(score * 1.5, 3), 15);
    if (pipe_x < -100) {
        random_pipe();
    }

    if (pipe_x > 20 && pipe_x < 80 && (bird_y < pipe_height || bird_y > pipe_height + 200) || (bird_y < -50 || bird_y > 500)) {
        kill_bird();
    }
};

function keypress(event) {
    if (event.key === " ") {
        bird_dy = 9;
    }
    else {
        if (paused) {
            game_loop = setInterval(game, 24);
            paused = false;
        }
        else {
            // pause the game
            clearInterval(game_loop)
            paused = true;
        }
    }
};

function kill_bird() {
    random_pipe();
    bird_dy = 0;
    bird_y = 0;
    score = 0;
};

window.addEventListener("keypress", keypress);
var game_loop = setInterval(game, 24);
