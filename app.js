//pass through an event and then function
document.addEventListener('DOMContentLoaded', () => {

    //picking elements here; saved as a const so can use again later
    var dora = document.querySelector('.doraemon');
    const gameDisplay = document.querySelector('.game-container');
    const sky = document.querySelector('.sky');
   


    //some variables; adding space between skys left side and dora's left side to center dora in the sky
    let doraLeft = 300;
    let doraBottom = 350;
    let gravity = 2.5;
    let isGameOver = false;
    let gap = 350;
 
    //function to start the game where dora starts dropping out aka moving
    function startGame() {

        if (doraBottom <= 0 || doraBottom >= 650 || 
            doraLeft <= 0 || doraLeft >= 1265) {
            gameOver();
        }
        doraBottom -= gravity; 
        dora.style.bottom = doraBottom + 'px';
        dora.style.left = doraLeft + 'px';//add 100 px to left of dora element

        checkCollision();
    }

    let gameTimerId = setInterval(startGame, 20); //passing through a function and time, so basically invoke every 20ms
    
    //only use enter bar to jump
    function control(e){
        if(e.keyCode === 13){ //32 is code for space bar, 13 is for enter 
            jump();
        }
    }

    //make dora jump 
    function jump(){
        if(doraBottom < 500) doraBottom +=60; //eachtime jump is invoked adds 50 to wtv dorabottom alr is, also to make dora not jump off the sky LMAO
        dora.style.bottom = doraBottom + 'px';  
        console.log(doraBottom);
    }
    //each time key is on keyboard, invoke jump
    document.addEventListener('keyup', control);

    //create obstacles
    function generateObstacle(){
        let obstacleLeft = 700;
        let randomHeight = Math.random() * 5; //randomize height - 5
        let obstacleBottom = randomHeight; //adjust the height of the obstacles
        const obstacle = document.createElement('div'); //gonna create divs like this 
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle); //putting this div into the game container created in html
        gameDisplay.appendChild(topObstacle);

        //give our obstacles a pattern
        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        //topObstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px'; //add the gap in between

        //make obstacles move 
        function moveObstacle() {
            obstacleLeft -=2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            //make obstacles disappear if out of game display
            if(obstacleLeft === -88) { //230
                cancelAnimationFrame(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }  
            //make game stop if bird reaches bottom, hits obstacle on the sides, or lands on top of obstacle
            //not in the last 300 pixels that its traveled, and its in the middle of the grid, and 
            if 
            (
            obstacleLeft < (doraLeft + 40) && //50
            obstacleLeft > (doraLeft - 88) && //111
            (doraBottom < (obstacleBottom + 240) || //240
            doraBottom > (obstacleBottom + gap - 55)) //75
            ) 
            { gameOver(); 
                cancelAnimationFrame(timerId);
            } else {
                requestAnimationFrame(moveObstacle);
            }
        }
        
        let timerId = requestAnimationFrame(moveObstacle);
        if (!isGameOver) setTimeout(generateObstacle, 4000);
    }
    generateObstacle();

    //make game over
    function gameOver() {
        clearInterval(gameTimerId) 
        console.log('GAME OVER')
        isGameOver = true;
        document.removeEventListener('keyup', control);
        /*
        setTimeout(() => {
            location.reload(); // reload the page to start again
        }, 2000);
        */
        
    }
    
    function checkCollision() {
        let obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => {
            if (doraLeft + 40 >= parseInt(obstacle.style.left) && //50
                doraLeft <= parseInt(obstacle.style.left) + 88 && //111
                doraBottom <= parseInt(obstacle.style.bottom) + 240 && //240
                doraBottom + 53 >= parseInt(obstacle.style.bottom)) { //72
                 gameOver();
            }
        });
            
    }

    
})
