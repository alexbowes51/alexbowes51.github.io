// StartOfGame
const canvas = document.getElementById("GamePlay");
const ctx = canvas.getContext("2d");
const playerNameInput = document.getElementById("PlayerName");
const startButton = document.getElementById("StartGame");
const introSection = document.getElementById("intro");
const gameSection = document.getElementById("Game");
const scoreDisplay = document.getElementById("score");
const nameDropdown = document.getElementById("savedNames");

let playerName;
let score = 0;
let level = 0;

// Load saved names from localStorage
const savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];

// Use stored player name, score, and level on page load
window.addEventListener('load', (event) => {
    playerName = getPlayerName();
    score = parseInt(localStorage.getItem("PlayerScore")) || 0;
    level = parseInt(localStorage.getItem("PlayerLevel")) || 1;

    // If there's a stored player name, display it
    if (playerName) {
        playerNameInput.value = playerName;
    }

    // Update dropdown list with saved names
    updateDropdownList();
    renderLeaderboard();
});

// ===== Leaderboard =====
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

let gameRunning = false;

function gameOver() {
    gameRunning = false;
    // Update leaderboard and save before alert
    updateLeaderboard(playerName, score);
    // Force a save to ensure persistence
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    
    const finalScore = score;
    alert(`Game Over, ${playerName}! Your final score is ${finalScore}.`);
    
    score = 0;
    level = 1;
    MaxEnemys = 5;
    MaxMeteors = 1;
    Player.Health = 100;
    val = 100;
    lastHitTime = 0;
    meteors = [];
    enemybullets = [];
    playerbullets = [];
    
    // Return to main menu
    gameSection.style.display = "none";
    introSection.style.display = "flex";
    
    // Reload leaderboard from storage to ensure it's up-to-date
    leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    renderLeaderboard();
}

function updateLeaderboard(name, currentScore) {
    const existing = leaderboard.find(e => e.name === name);
    if (existing) {
        if (currentScore > existing.score) existing.score = currentScore;
    } else {
        leaderboard.push({ name: name, score: currentScore });
    }
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    renderLeaderboard();
}

function renderLeaderboard() {
    const list = document.getElementById("leaderboard-list");
    if (!list) return;
    list.innerHTML = "";
    if (leaderboard.length === 0) {
        const li = document.createElement("li");
        li.innerHTML = "<span>No scores yet!</span><span></span>";
        list.appendChild(li);
        return;
    }
    leaderboard.slice(0, 10).forEach((entry, i) => {
        const li = document.createElement("li");
        const rank = document.createElement("span");
        rank.textContent = `${i + 1}. ${entry.name}`;
        const pts = document.createElement("span");
        pts.textContent = entry.score;
        li.appendChild(rank);
        li.appendChild(pts);
        list.appendChild(li);
    });
}

// ===== Canvas resize =====
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// ===== Saved name dropdown =====
function selectSavedName() {
    const selected = nameDropdown.value;
    if (selected) playerNameInput.value = selected;
}

startButton.addEventListener("click", startGame);

function startGame() {
    const newName = playerNameInput.value.trim();
    if (!newName) {
        alert("Please enter your name first!");
        return;
    }

    if (newName !== playerName) {
        // New player — reset progress
        score = 0;
        level = 1;
        MaxEnemys = 5;
        MaxMeteors = 1;

        // Save name if not already stored
        if (!savedNames.includes(newName)) {
            savedNames.push(newName);
            localStorage.setItem("savedNames", JSON.stringify(savedNames));
        }
    }

    playerName = newName;

    // Resize canvas to fill the screen
    resizeCanvas();

    // Reset and populate the level (don't advance level count on first start)
    resetGameLevel(false);

    // Hide the intro and show the game
    introSection.style.display = "none";
    gameSection.style.display = "block";

    // Update dropdown list with saved names
    updateDropdownList();

    // Start the game loop
    gameRunning = true;
    gameloop();
}

function getPlayerName() {
    const storedName = localStorage.getItem("PlayerName");
    return storedName || "Player"; // Default name if not found
}

function updateScoreWithPlayerName() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    localStorage.setItem("PlayerScore", score);
    localStorage.setItem("PlayerName", playerName);
    localStorage.setItem("PlayerLevel", level);
}

// Save player data when the tab is closed
window.addEventListener('beforeunload', () => {
    localStorage.setItem("PlayerScore", score);
    localStorage.setItem("PlayerName", playerName);
    localStorage.setItem("PlayerLevel", level);
});

function updateDropdownList() {
    // Clear existing options
    nameDropdown.innerHTML = '<option value="" selected>Select a saved name</option>';

    // Add names to the dropdown
    savedNames.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.text = name; // Add this line to set the display text
        nameDropdown.add(option);
    });
}

/////////////////
//Score counter//
let val = 100;
let lastHitTime = 0;         // timestamp of last damage taken
const HIT_COOLDOWN = 800;    // ms of invincibility after a hit

function playerTakeDamage(amount) {
    const now = Date.now();
    if (now - lastHitTime < HIT_COOLDOWN) return; // still invincible
    lastHitTime = now;
    Player.Health -= amount;
    val = Player.Health;
    if (Player.Health <= 0) {
        gameOver();
    }
}
 function Score(){
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.fillText("SCORE : " + score ,canvas.width - 10,30);
 }

//////////////////////////////////////////
function drawHUD() {
    // Display Lives
    ctx.font = "20px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "left";
    ctx.fillText(`Levels: ${level}`, 10, 30);

    // Display Score
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);

    // Display Health Bar
    ctx.textAlign = "right";
    ctx.fillText(`Health: ${val}`, canvas.width - 10, 30);
}
///////////////////////////////////////////////
let BackGround = new Image();
BackGround.src = "assets/Images/BackGround.png";

 let PlayerSprite = new Image();
 PlayerSprite.src = "assets/Images/PlayerShip.png";
 let Player = new GameObject(PlayerSprite,100,300,200,75,100);
 let PlayerShoot = false;
 
 let Boss = new GameObject();

//Constructors player / enemy / boss / meteors
 function GameObject(sprite,x,y,width,height,Health){
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.Health = Health;
 }

 //Bullets constructor enemys/playes
function Bullets(Sprite,x,y,speed,r,hit){
    this.Sprite = Sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.r = r;
    this.hit = hit;
}

 //Enemys variables
 let MaxEnemys = 5;
 let enemies = [];
 let EnemySprite = new Image();
EnemySprite.src = "assets/Images/UFO.png";

//meteor variables
 let MaxMeteors = 1;
 let meteors = [];
 let MeteorSprite = new Image();
MeteorSprite.src = "assets/Images/meteor.png";
 
//Bullets array 
let enemybullets = [];
let playerbullets = [];

//Reset level function 
function resetGameLevel(advanceLevel = true){

enemies = [];
meteors = [];
enemybullets = [];
playerbullets = [];

Player.x = 100;
Player.y = Math.floor(canvas.height / 2);

//makes enemy and puts it into array enemies
for(let i = 0; i< MaxEnemys;i++){
    let enemyX = Math.random() * (canvas.width * 0.4) + canvas.width * 0.55;
    let enemyY = Math.random() * (canvas.height - 200) + 1;
    let enemyWidth = 150;
    let enemyHeight = 200;
    let enemyHealth = 100;

    let enemy = new GameObject(EnemySprite,enemyX,enemyY,enemyWidth,enemyHeight,enemyHealth);
    enemies.push(enemy);
}

//makes meteor and puts it into array meteors
for(let i = 0; i < MaxMeteors; i++){
    let meteorX = Math.random() * (canvas.width * 0.4) + canvas.width * 0.25;
    let meteorY = Math.random() * (canvas.height * 0.6) + 1;
    let meteorWidth = 100;
    let meteorHeight = 100;
    let meteorHealth = 200;

    let meteor = new GameObject(MeteorSprite,meteorX + 85,meteorY + 45 ,meteorWidth,meteorHeight,meteorHealth);
    meteors.push(meteor);
}

for(let i = 0;i < MaxBullets;i++)
{
 if(enemies[i]){
   let Bulletx = enemies[i].x + 50;
   let Bullety = enemies[i].y + 65 ;
   let Bulletspeed = 10;
   let BulletR = 20;
   let hit = false;

   let bullet = new Bullets(bulletSprite,Bulletx,Bullety,Bulletspeed,BulletR,hit);
   enemybullets.push(bullet);
 }
}

   if (advanceLevel) {
       level++;
       if(MaxEnemys <= 15) MaxEnemys++;
       if(MaxMeteors <= 4) MaxMeteors++;
   }
}

//Player Bullets Variables
let MaxBullets = 20;
let MaxplayerBullets = 10;

let playerbulletSprite = new Image();
let bulletSprite = new Image();

bulletSprite.src = "assets/Images/UFObullet.png";
playerbulletSprite.src = "assets/Images/UFObullet2.png";

//creates player bullets 
function createPlayerBullet() {
    if (playerbullets.length < MaxplayerBullets && spaceKeyPressed) {
        let BulletPx = Player.x + Player.width;
        let BulletPy = Player.y + Player.height / 2;
        let BulletPspeed = 5;
        let bulletPR = 10;
        let hitP = false;

        let BulletP = new Bullets(playerbulletSprite, BulletPx, BulletPy, BulletPspeed, bulletPR, hitP);
        playerbullets.push(BulletP);

        PlayerShoot = true;
    }
}

//Meteors//Animation//
let M_frames = 8;
let currentMFrame = 0;
let M_initial = new Date().getTime();

function AnimateMeteor(_meteors) {
    if (_meteors && _meteors.x !== undefined && _meteors.y !== undefined) {
        current = new Date().getTime();

        if (current - M_initial >= 100) {
            currentMFrame = (currentMFrame + 1) % M_frames;
            M_initial = current;
        }

        ctx.drawImage(
            MeteorSprite,
            (MeteorSprite.width / 8) * currentMFrame,
            0,
            100,
            100,
            _meteors.x,
            _meteors.y,
            100,
            100
        );
    }
}
//Enemy//Animation//
let E_frames = 5;
let currentEneFrame = 0;
let E_initial = new Date().getTime();

function AnimateEnemy(_enemy){
   current = new Date().getTime();

    if(current - E_initial >= 750){
        currentEneFrame = (currentEneFrame + 1) % E_frames;
        E_initial = current;
    }

   
    ctx.drawImage(EnemySprite, (EnemySprite.width / 5) * currentEneFrame,0,100,100,_enemy.x,_enemy.y,150,200);
    
}

//EnemyMoving//
function EnemyMoveBounds(_enemy) {
    const X = (Math.random() - 0.5) * 5;
    const Y = (Math.random() - 0.5) * 5;

    _enemy.x += X;
    _enemy.y += Y;

    // Keep enemies strictly within the right half of the canvas
    const minX = Math.floor(canvas.width * 0.45);
    const maxX = canvas.width - _enemy.width;
    const minY = 0;
    const maxY = canvas.height - _enemy.height;

    _enemy.x = Math.min(maxX, Math.max(minX, _enemy.x));
    _enemy.y = Math.min(maxY, Math.max(minY, _enemy.y));
}

//Bullets//Animation//
let B_frames = 4;
let B_currentFrame = 0;
let B_initial = new Date().getTime();
let B_current;

//Enemy Bullets Animation 
function AnimateBullet(_newBullets){
   B_current = new Date().getTime();

    if(B_current - B_initial >= 750){
        B_currentFrame = (B_currentFrame + 1) % B_frames;
        B_initial = B_current;
    }
    
    ctx.drawImage(
        bulletSprite,
        (bulletSprite.width / 4) * B_currentFrame,
        0,
        100,
        100,
        _newBullets.x,
        _newBullets.y,
        _newBullets.r * 2,
        _newBullets.r * 2
    );
        
    
}

let PB_frames = 4;
let PB_currentFrame = 0;
let PB_initial = new Date().getTime();
let PB_current;

function AnimatePlayerBullet(_playerbullets){
 PB_current = new Date().getTime();

 if(PB_current - PB_initial >= 750){
    PB_currentFrame = (PB_currentFrame + 1) % PB_frames;
    PB_initial = PB_current;
 }

 ctx.drawImage(
    playerbulletSprite,
    (playerbulletSprite.width / 4) * PB_currentFrame,
    0,
    100,
    100,
    _playerbullets.x,
    _playerbullets.y,
    _playerbullets.r * 2,
    _playerbullets.r * 2,
 );
}
//////////
//Player//Animation//
let P_frames = 3;
let currentFrame = 0;
let initial = new Date().getTime();
let current;

 function AnimationPlayer(){

 current = new Date().getTime();

if(current - initial >= 750){
    currentFrame = (currentFrame + 1) % P_frames;
    initial = current;
}
 ctx.drawImage(PlayerSprite,(PlayerSprite.width / 3) * currentFrame,0,100,100,Player.x,Player.y,200,75);
}

//////////////////
//input function//
function GamerInput(input){
    this.action = input;
}


let gamerInput = new GamerInput("none");
let spaceKeyPressed;

//checks input events 
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    console.log(event);
    console.log("Event type: " + event.type);
    // console.log("Keycode: " + event.key);

    if (event.type === "keydown") {
        switch (event.key.toLowerCase()) {
            case "a": // Left
                gamerInput = new GamerInput("Left");
                event.preventDefault();
                break; //Left key
            case "w": // Up
                gamerInput = new GamerInput("Up");
                event.preventDefault();
                break; //Up key
            case "d": // Right
                gamerInput = new GamerInput("Right");
                event.preventDefault();
                break; //Right key
            case "s": // Down
                gamerInput = new GamerInput("Down");
                event.preventDefault();
                break; //Down key
            case " ":
                gamerInput = new GamerInput("Shoot");
                if (!spaceKeyPressed) {
                    gamerInput = new GamerInput("Shoot");
                    event.preventDefault();
                    spaceKeyPressed = true; // Set the variable to true only if it was false
                }
                break;
            case "Control":
                gamerInput = new GamerInput("Heal");
                event.preventDefault();
            break;
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None");
    }if(event.type === "keyup") {
    switch (event.key) {
        case " ":
            spaceKeyPressed = false; // Reset the variable when the space key is released
            break;
    }
}
}


//Moving enemys bullets
function BulletMoving(_newBullets, _enemy) {
    if (_newBullets && _newBullets.x !== undefined) {
        _newBullets.x -= 1.5;

        // If bullet goes off the left edge, move it off-screen right (will be reset next spawn)
        if (_newBullets.x <= 0) {
            if (_enemy && _enemy.x !== undefined) {
                _newBullets.x = _enemy.x;
                _newBullets.y = _enemy.y + 65;
            }
            _newBullets.hit = false;
        }

        if (_newBullets.hit === true) {
            if (_enemy && _enemy.x !== undefined) {
                _newBullets.x = _enemy.x;
                _newBullets.y = _enemy.y + 65;
            }
            _newBullets.hit = false;
        }
    }
}

//Move Meoteors
function MoveMeteors(_meteors) {
    for (let i = 0; i < meteors.length; i++) {
        let meteor = meteors[i];
        let speedX = meteor.speedX || 0.5; // Use existing speedX or default to 2
        let speedY = meteor.speedY || 0.5; // Use existing speedY or default to 2
         
    
        if (meteor) {

            meteor.y += speedY;
            meteor.x += speedX;

            // Bounce off the left and right edges
            if (meteor.x <= 0 || meteor.x >= canvas.width - meteor.width) {
                meteor.speedX = -speedX; // Change the direction on collision
            }

            // Bounce off the top and bottom edges
            if (meteor.y <= 0 || meteor.y >= canvas.height - meteor.height) {
                meteor.speedY = -speedY; // Change the direction on collision
            }
        }
    }
}

//Collisons EnemysBullets with player//
function Checkhit(_newBullets, _player) {
    if (_newBullets.hit) return; // already processed this bullet

    const bulletRadius = _newBullets.r;
    const playerRadiusX = Player.width / 5;
    const playerRadiusY = Player.height / 5;

    const dx = Math.abs(_newBullets.x - (Player.x + playerRadiusX));
    const dy = Math.abs(_newBullets.y - (Player.y + playerRadiusY));

    if (dx < (bulletRadius + playerRadiusX) && dy < (bulletRadius + playerRadiusY)) {
        _newBullets.hit = true;
        playerTakeDamage(5);
    }
}
//checks Collisions player with meteors
function checkMeteorCollision(_player, _meteors) {
    for (let i = 0; i < meteors.length; i++) {

        let meteor = meteors[i];
        const playerRadiusX = Player.width / 4;
        const playerRadiusY = Player.height / 4;

        const dx = Math.abs(meteor.x - (Player.x + playerRadiusX));
        const dy = Math.abs(meteor.y - (Player.y + playerRadiusY));

        if (dx < (meteor.width / 2 + playerRadiusX) && dy < (meteor.height / 2 + playerRadiusY)) {
            playerTakeDamage(5);

            // Move the meteor to a new random position
            meteor.x = Math.random() * (canvas.width * 0.4) + canvas.width * 0.25;
            meteor.y = Math.random() * (canvas.height * 0.6) + 1;
        }
    }
}

function Shoot() {
    for (let i = 0; i < playerbullets.length; i++) {

    if(playerbullets[i]){
        let bullet = playerbullets[i];

        if (PlayerShoot) {
            bullet.x += bullet.speed;

            // Check collision with enemies
            for (let j = 0; j < enemies.length; j++) {
                let enemy = enemies[j];
                if (checkCollisionPlayerBulletEnemy(bullet, enemy)) {
                    // Remove the bullet
                    playerbullets.splice(i, 1);
                    i--;

                    if (enemy.Health <= 0) {
                        // Remove enemy if health is 0 or below
                        enemies.splice(j, 1);
                        j--; // Adjust index after removing the enemy
                    }

                    break; // Exit the loop after handling collision
                }
            }

            // Check collision with meteors
            for (let j = 0; j < meteors.length; j++) {
                let meteor = meteors[j];
                if (checkCollisionPlayerBulletMeteor(bullet, meteor)) {
                    // Remove the bullet
                    playerbullets.splice(i, 1);
                    i--;

                    if (meteor.Health <= 0) {
                        // Remove meteor if health is 0 or below
                        meteors.splice(j, 1);
                        j--; // Adjust index after removing the meteor
                    }

                    break; // Exit the loop after handling collision
                }
            }
        }

        if (bullet.x >= canvas.width || bullet.hit) {
            // Remove the bullet from the playerbullets array
            playerbullets.splice(i, 1);
            i--;

            if (playerbullets.length === 0) {
                PlayerShoot = false;
            }
        }
    }
}
}



function checkCollisionPlayerBulletEnemy(bullet, enemy) {
    const dx = bullet.x - (enemy.x + enemy.width / 2); // Adjusted calculation for enemy's center
    const dy = bullet.y - (enemy.y + enemy.height / 2); // Adjusted calculation for enemy's center
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < bullet.r + Math.max(enemy.width, enemy.height) / 2) {
        enemy.Health -= 5;
        score += 10; // Increment the score
        return true;
    }
    return false;
}

function checkCollisionPlayerBulletMeteor(bullet, meteor) {
    const dx = bullet.x - (meteor.x + meteor.width / 2); // Adjusted calculation for meteor's center
    const dy = bullet.y - (meteor.y + meteor.height / 2); // Adjusted calculation for meteor's center
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < bullet.r + Math.max(meteor.width, meteor.height) / 2) {
        meteor.Health -= 5;
        score += 10; // Increment the score
        return true;
    }
    return false;
}

//update funtion//
function update() {
    // console.log("Update");
    // Check Input
    if (gamerInput.action === "Up") {
        console.log("Move Up");
        Player.y -= 2; // Move Player Up
    }  if (gamerInput.action === "Down") {
        console.log("Move Down");
        Player.y += 2; // Move Player Down
    }  if (gamerInput.action === "Left") {
        console.log("Move Left");
        Player.x -= 2; // Move Player Left
    }  if (gamerInput.action === "Right") {
        console.log("Move Right");
        Player.x += 2; // Move Player Right
    }  if (gamerInput.action === "Shoot") {
        console.log("Space")
       createPlayerBullet();
    }
       if(!gamerInput.action === "Shoot"){
        PlayerShoot = false;
    }  if (gamerInput.action === "Control"){
        Player.Health += 10;
    }

    if (Player.x <= 0) Player.x = 0;
    if (Player.y <= 0) Player.y = 0;
    if (Player.x >= canvas.width - Player.width) Player.x = canvas.width - Player.width;
    if (Player.y >= canvas.height - Player.height) Player.y = canvas.height - Player.height;

for(let i = 0; i < enemies.length;i++){
    EnemyMoveBounds(enemies[i],enemybullets[i]);
}

for(let i =0;i < enemybullets.length;i++)
{
    BulletMoving(enemybullets[i],enemies[i]);
    Checkhit(enemybullets[i],Player);
}

for(let i = 0;i < meteors.length;i++){
    MoveMeteors(meteors[i]);
    checkMeteorCollision(Player,meteors[i]);
}

        Shoot();

        if (enemies.length === 0 && meteors.length === 0) {
            // Advance when player reaches the right edge
            if (Player.x >= canvas.width - Player.width) {
                resetGameLevel(true);
            }
        }

        if (Player.Health <= 0) {
            gameOver();
            return;
        }
}

////////
//Draw//
function draw() {
    // clears the canvas before drawing
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(BackGround, 0, 0, canvas.width, canvas.height);

    for(let i = 0; i < MaxMeteors; i++){
        AnimateMeteor(meteors[i]);
    }

    for (let i = 0; i < enemies.length; i++) {
        AnimateBullet(enemybullets[i]);
        AnimateEnemy(enemies[i]);
    }
  

    AnimationPlayer();
    
    for(let i = 0; i < playerbullets.length;i++){
        AnimatePlayerBullet(playerbullets[i]);
    }

    drawHUD();
}

function gameloop() {
    if (!gameRunning) return;
    draw();
    update();
    window.requestAnimationFrame(gameloop);
   
}

window.addEventListener('keydown', input);
window.addEventListener('keyup', input);

// ===== Touch controls for mobile =====
function setupTouchControls() {
    const bindings = [
        ['btn-up',    'Up'],
        ['btn-down',  'Down'],
        ['btn-left',  'Left'],
        ['btn-right', 'Right'],
        ['btn-shoot', 'Shoot'],
    ];
    bindings.forEach(([id, action]) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            gamerInput = new GamerInput(action);
            if (action === 'Shoot') spaceKeyPressed = true;
        }, { passive: false });
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            gamerInput = new GamerInput('None');
            if (action === 'Shoot') spaceKeyPressed = false;
        }, { passive: false });
    });
}
setupTouchControls();
//////////////

