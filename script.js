const score = document.querySelector('.score');
        const startScreen = document.querySelector('.startScreen');
        const gameArea = document.querySelector('.gameArea');

        let music = new Audio("music.mp3");

        startScreen.addEventListener('click', start);

        let player = { speed: 5, score: 0};
        let keys = {
            ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
            a: false, w: false, s: false, d: false, A: false, S: false, D: false, W: false
        };

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        function keyDown(e) {
            e.preventDefault();
            keys[e.key] = true;
            // console.log(keys);
            // console.log(e.key);
        }

        function keyUp(e) {
            e.preventDefault();
            keys[e.key] = false;
            // console.log(keys);
            // console.log(e.key);
        }

                                    /*finding the exact collision time spot*/
        function isCollide(a, b) {
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();

            return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || 
                    (aRect.left > bRect.right))
        }

        function moveLines() {
            let lines = document.querySelectorAll('.lines');
            lines.forEach(function (item) {
                if (item.y >= 750) {
                    item.y -= 755;
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';
            })
        }

        function endGame() {
            player.start = false;
            startScreen.classList.remove('hide');
            startScreen.innerHTML = '<big><b>💥Game over💥</b></big> <br> Your Score is <big><b>' + player.score + '</b></big><br><big><b>Click here</b></big> to restart the game!!'
            music.pause();
            music = " ";
            music = new Audio("music.mp3");
        }

        function moveEnemy(car) {
            let enemy = document.querySelectorAll('.enemy');
            enemy.forEach(function (item) {
                if(isCollide(car, item)){console.log('Boom HIT!!'); endGame();}
                if (item.y >= 750) {
                    item.y -= 900;
                    item.style.left = Math.floor(Math.random() * 350) + 'px';
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';
            })
        }

        function randomEnemy() {
            let ran = Math.floor((Math.random()*6));
        }

        let ranEnemy;

        function gamePlay() {
            // console.log('Hello I am clicked');
            let car = document.querySelector('.car');
            let road = gameArea.getBoundingClientRect();
            let enemyCar = document.querySelector('.enemy');



            // enemyCar.style.backgroundImage = "url('mycar"+ranEnemy+".png')";
            // console.log(road);
            // player.score = 0;

            if (player.start) {
                moveLines();
                moveEnemy(car);
                                            /*moving the supercar*/
                if (keys.ArrowUp || keys.W || keys.w && player.y > road.top + 100) {
                    player.y -= player.speed + 2;
                    // car.style.top = player.y + "px";
                }
                if (keys.ArrowDown || keys.S || keys.s && player.y < road.bottom - 125) {
                    player.y += player.speed + 2;
                    // car.style.top = player.y + "px";
                }
                if (keys.ArrowLeft || keys.A || keys.a && player.x > 0) {
                    player.x -= player.speed + 3;
                    // car.style.left = player.x + "px";
                }
                if (keys.ArrowRight || keys.D || keys.d && player.x < road.width - 70) {
                    player.x += player.speed + 3;
                    // car.style.left = player.x + "px";
                }

                //writing like this is better but earlier one was also correct
                car.style.top = player.y + "px";
                car.style.left = player.x + "px";

                window.requestAnimationFrame(gamePlay);

                player.score++;
                let ps = player.score - 1;
                score.innerText = "Score: " + ps;
            }
        }

        function start() {
            // gameArea.classList.remove('hide');
            music.play();
            startScreen.classList.add('hide');
            gameArea.innerHTML = '';
            console.log(gameArea.innerHTML);
            player.start = true;
            player.score = 0;
            window.requestAnimationFrame(gamePlay);
                                        /*creating the lines of road in middle*/
            for (x = 0; x < 5; x++) {
                let roadLine = document.createElement('div');
                roadLine.setAttribute('class', 'lines');
                roadLine.y = x * 150;
                roadLine.style.top = roadLine.y + 'px';
                gameArea.appendChild(roadLine);
            }

                                    /*creating our super car for the player*/
            let car = document.createElement('div');
            car.setAttribute('class', 'car');
            // car.innerText = "Hey I'm your car.";
            gameArea.appendChild(car);

                            /*getting the distance of car from the game area boundaries*/
            player.x = car.offsetLeft;
            player.y = car.offsetTop;

                                        /*creating the enemy cars*/
            for (x = 0; x < 3; x++) {
                let enemyCar = document.createElement("div");
                enemyCar.setAttribute("class", "enemy");
                // enemyCar.y = x*180;
                enemyCar.y = ((x + 1) * 350) - 1;
                enemyCar.style.top = enemyCar.y + "px";
                // enemyCar.style.backgroundColor = 'blue';
                let ranArr = ["url('mycar1.png')", "url('mycar2.png')", "url('mycar3.png')",
                              "url('mycar4.png')", "url('mycar5.png')"];
                enemyCar.style.backgroundImage = ranArr[Math.floor(Math.random()*5)];
                enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
                gameArea.append(enemyCar);
            }

            // console.log("Top: "+player.y);
            // console.log("Left: " + car.offsetLeft);
        }
