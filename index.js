const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 5; // Scale for the snake and apple
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let apple;

(function setup() {
    snake = new Snake();
    apple = new Apple();
    apple.pickLocation();

    window.setInterval(() => {
        if (!snake.snakeCollision()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            apple.draw();
            snake.update();
            snake.draw();

            if (snake.eat(apple)) {
                apple.pickLocation();
            }
        }
    }, 100); // Decreasing the timer will make the game go faster
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function() {
        ctx.fillStyle = "#33cc33";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = { x: this.x, y: this.y };
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Prevent the snake from moving outside the canvas
        this.x = this.x >= canvas.width ? 0 : this.x < 0 ? canvas.width : this.x;
        this.y = this.y >= canvas.height ? 0 : this.y < 0 ? canvas.height : this.y;
    };

    this.changeDirection = function(direction) {
        switch (direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                                      this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    };

    this.eat = function(apple) {
        if (this.x === apple.x && this.y === apple.y) {
            this.total++;
            return true;
        }
        return false;
    };

    this.snakeCollision = function() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                return true;
            }
        }
        return false;
    };
}

function Apple() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    };
    
    this.draw = function() {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}
