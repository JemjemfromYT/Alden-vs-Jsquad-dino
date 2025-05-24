let drawBut = document.getElementById("drawBut");
let d1Draw = document.getElementById("d1Draw");
let d2Draw = document.getElementById("d2Draw");
let d3Draw = document.getElementById("d3Draw");
let output4 = document.getElementById("output4");
let draw = document.getElementById("draw");
let name = document.getElementById("name");
let d4 = document.getElementById("d4");
let d4Hitbox = document.getElementById("d4Hitbox");
let collisionMessage = document.getElementById("collisionMessage");
let isJumping = false;
let collisionHappened = false;
let ePic = document.getElementById("ePic");
let jumpscare = document.getElementById("jumpscare");
let wait = document.getElementById("wait");
let killed = document.getElementById("killed")
let blood = document.getElementById("blood")
let gun = document.getElementById("gun")
let gunItem = document.getElementById("gunItem")
let f = document.getElementById("f")
let pistolShot = document.getElementById("pistolShot")
let bullet = document.getElementById("bullet")



drawBut.addEventListener('click', function () {
  setTimeout(() => {
  startSpawning();
}, 5500);
  drawFuc();
  spin.play();
  drawBut.style.display = "none";
});

function drawFuc() {
  let draw = Math.random();
  console.log(draw);

  setTimeout(() => {
    if (draw < 0.07) {
      jeffS.play()
      d4Draw.style.background = "violet";
      d1Draw.style.background = "none";
      d2Draw.style.background = "none";
      d3Draw.style.background = "none";
      output4.textContent = "Jeff";
      spin.pause();
      selected2.play();
      d4Draw.classList.add("show");
      d4.style.display = "block";
    } else if (draw < 0.4) {
      jakeS.play()
      d1Draw.style.background = "red";
      d3Draw.style.background = "none";
      output1.textContent = "Jake";
      spin.pause();
      selected.play();
      d1.style.display = "block";
    } else if (draw < 0.7) {
      jorossS.play()
      d2Draw.style.background = "red";
      d1Draw.style.background = "none";
      d3Draw.style.background = "none";
      output2.textContent = "Joross";
      output2.style.color = "orange";
      spin.pause();
      selected.play();
      d2.style.display = "block";
    } else if (draw > 0.7) {
      jebS.play()
      d3Draw.style.background = "red";
      d2Draw.style.background = "none";
      output3.textContent = "Jeb";
      output3.style.color = "brown";
      spin.pause();
      selected.play();
      d3.style.display = "block";
    }
  setTimeout(()=>{
  gunFunc();
  },6000);
  }, 3000);


  let intervalCount = 0;
  let intervalValue = setInterval(() => {
    intervalCount++;
    if (intervalCount > 3) {
      clearInterval(intervalValue);
    }

    setTimeout(() => {
      d1Draw.style.background = "red";
      d3Draw.style.background = "none";
      setTimeout(() => {
        d2Draw.style.background = "red";
        d1Draw.style.background = "none";
        setTimeout(() => {
          d3Draw.style.background = "red";
          d2Draw.style.background = "none";
        }, 50);
      }, 100);
    }, 150);
  }, 300);

  setTimeout(() => {
    drawNone.classList.add("hide");
    name.classList.add("hide");
    output4.classList.add("hide");
    setTimeout(() => {
      start.textContent = "Tap the screen to start!";
      startFunc();
    }, 1000);
  }, 6000);
}

function startFunc() {
  document.addEventListener("click", function startGame() {
    if (collisionHappened) return;
    start.style.display = "none";
    document.removeEventListener("click", startGame);
  });
}

function spawnEnemy() {
  let enemy = document.createElement("img");
  enemy.src = "enemy1.jpg";
  enemy.className = "enemyClone";
  enemy.style.position = "absolute";
  enemy.style.top = "220px";
  enemy.style.left = window.innerWidth + "px";
  enemy.style.height = "50px";
  enemy.style.width = "40px";
  document.body.appendChild(enemy);

  let x = window.innerWidth;
  let moveInterval = setInterval(() => {
    x -= 3;
    enemy.style.left = x + "px";
    if (x < -50) {
      clearInterval(moveInterval);
      enemy.remove();
    }
  }, 10);
}

let spawner;

function startSpawning() {
  spawner = setInterval(() => {
    if (Math.random() < 0.5) {
      spawnEnemy();
      clearInterval(spawner);
      setTimeout(() => {
        startSpawning();
      }, 2000);
    }
  }, 1000);
}



function jumpHandler() {
  if (collisionHappened) {
    location.reload();
    return;
  }

  if (isJumping) return;
  isJumping = true;

  d1.classList.add("jump");
  d2.classList.add("jump");
  d3.classList.add("jump");
  d4.classList.add("jump");
  d4Hitbox.classList.add("jump");
  
  setTimeout(() => {
    d1.classList.remove("jump");
    d2.classList.remove("jump");
    d3.classList.remove("jump");
    d4.classList.remove("jump");
    d4Hitbox.classList.remove("jump");
    isJumping = false;
  }, 600);
}

document.addEventListener("click", jumpHandler);








function checkCollision() {
  if (collisionHappened) return;

  let hb = d4Hitbox.getBoundingClientRect();
  let enemies = document.querySelectorAll(".enemyClone");

  for (let enemy of enemies) {
    let en = enemy.getBoundingClientRect();

    if (
      hb.left < en.right &&
      hb.right > en.left &&
      hb.top < en.bottom &&
      hb.bottom > en.top
    ) {
      killed.play()
      blood.style.opacity="1"
      d1.classList.add("die")
      d2.classList.add("die")
      d3.classList.add("die")
      d4.classList.add("die")
      document.removeEventListener("click", jumpHandler);
      //remove event listener
    setTimeout(()=>{
        document.addEventListener("click", jumpHandler);
     //add event listener after
      },2000)
      jakeS.pause()
      jebS.pause()
      jorossS.pause()
      ePic.classList.add("show2");
      setTimeout(() => {
        ePic.classList.add("show");
      }, 300);
      collisionMessage.style.display = "block";
      jumpscare.play();
      collisionHappened = true;
      clearInterval(collisionInterval);
      break;
    }
  }
}

let collisionInterval = setInterval(checkCollision, 100);





//Clouds & Sun
const cloudPatterns = [
      [
        "00100",
        "01110",
        "11111"
      ],
      [
        "00010",
        "00111",
        "01110"
      ],
      [
        "01000",
        "11100",
        "01110"
      ]
    ];

    function createCloud(top, speed) {
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.style.top = top + "px";
      document.body.appendChild(cloud);

      const pattern = cloudPatterns[Math.floor(Math.random() * cloudPatterns.length)];
      for (let row of pattern) {
        for (let char of row) {
          const pixel = document.createElement("div");
          pixel.className = "pixel" + (char === "0" ? " transparent" : "");
          cloud.appendChild(pixel);
        }
      }

      let left = window.innerWidth + Math.random() * 200;
      function move() {
        left -= speed;
        cloud.style.left = left + "px";
        if (left < -60) {
          left = window.innerWidth + Math.random() * 100;
          cloud.style.top = (50 + Math.random() * 150) + "px";
        }
        requestAnimationFrame(move);
      }
      move();
    }

    for (let i = 0; i < 5; i++) {
      const top = 50 + Math.random() * 150;
      const speed = 0.3 + Math.random() * 0.5;
      createCloud(top, speed);
    }

let i = 0;
function gunFunc(){
setInterval(()=>{
let gunMath = Math.random()
console.log(gunMath)
if (gunMath < 0.07){
  ammoRefill()
  gun.style.display="block"
  shiny.style.display="block"
  gun.classList.add("give")
  shiny.classList.add("give")
  i++
  if(i >= 2){
    gunDefault()
  setTimeout(()=>{
  gunAgain()
  },1000)
  }
}
},1000);
}

function gunDefault(){
  gun.style.left="360px"
  shiny.style.left="360px"
  gun.style.display="block"
  shiny.style.display="block"
}

function gunAgain(){
  gun.classList.add("give2")
}


function isColliding2(d4Hitbox, gun) {
  return !(
    d4Hitbox.left > gun.right ||
    d4Hitbox.right < gun.left ||
    d4Hitbox.top > gun.bottom ||
    d4Hitbox.bottom < gun.top
  );
}

// Get the elements (assuming 'd4Hitbox' and 'gun' are DOM elements)
const d4HitboxElement = document.getElementById('d4Hitbox'); // Replace 'd4Hitbox' with the actual ID
const gunElement = document.getElementById('gun');       // Replace 'gun' with the actual ID

// Function to check for collision and handle the result
function checkCollision2() {
  let div1Bound = d4HitboxElement.getBoundingClientRect();
  let div2Bound = gunElement.getBoundingClientRect();

  if (isColliding2(div1Bound, div2Bound)) {
    gun.style.display="none"
    shiny.style.display="none"
    f.style.display="block"
    gunItem.style.display="block"
  }
}

// Call checkCollision() whenever you need to check for collision (e.g., on animation frames)
// Example: Check every 100ms
setInterval(checkCollision2, 100);

// Or, if you want to check on specific events (e.g., mousemove)
// d4HitboxElement.addEventListener('mousemove', checkCollision);
// gunElement.addEventListener('mousemove', checkCollision);







let currentAmmo = 0;

function ammoRefill(){
  currentAmmo += 3
}


f.addEventListener("click", function (event){
  event.stopPropagation()
  currentAmmo--;
  if (currentAmmo < 1) {
    console.log("NO AMMO");
    f.style.display="none"
setTimeout(()=>{
    gunItem.style.display="none"
},300)
    //gunItemRemove()
  }
  if(currentAmmo > 1){
    console.log("AMMO REFILLED")
  }
/*
let ammoPistol = 5;
ammoPistol -= 1
if (ammoPistol < 0){
  gunItemRemove()
  gunFunc()
  gunItemRemoveBack()
  ammoPistol+=5
  console.log("NO AMMO")
}
*/
explode.classList.add("show")
gunItem.classList.add("fire")
setTimeout(()=>{
  gunItem.classList.remove("fire")
  explode.classList.remove("show")
},500)
  ''
  // Create a new bullet element
  let newBullet = document.createElement("div");
  newBullet.classList.add("bullet");

  // Set the initial position of the bullet (based on gunItem or d4Hitbox)
  let gunRect = gunItem.getBoundingClientRect();
  newBullet.style.position = "absolute";
  newBullet.style.left = gunRect.left + 80 + "px"; // start a bit to the right of gun
  newBullet.style.top = gunRect.top + 30 + "px";
  newBullet.style.width = "30px";
  newBullet.style.height = "10px";
  newBullet.style.background = "white";
  newBullet.style.border = "3px solid whitesmoke";
  newBullet.style.zIndex = 3;

  document.body.appendChild(newBullet);

  // Animate the bullet moving to the right
  let bulletInterval = setInterval(() => {
    let left = parseInt(newBullet.style.left);
    newBullet.style.left = (left + 10) + "px";

    // Remove bullet if off screen
    if (left > window.innerWidth) {
      clearInterval(bulletInterval);
      newBullet.remove();
    }
  }, 10);

  // Play shot sound
  pistolShot.currentTime = 0;
  pistolShot.play();
});







function checkCollision3() {
  
  const enemies = document.querySelectorAll(".enemyClone");
  const bullets = document.querySelectorAll(".bullet");

  bullets.forEach(bullet => {
    const bulletRect = bullet.getBoundingClientRect();

    enemies.forEach(enemy => {
      const enemyRect = enemy.getBoundingClientRect();

      if (
        bulletRect.left < enemyRect.right &&
        bulletRect.right > enemyRect.left &&
        bulletRect.top < enemyRect.bottom &&
        bulletRect.bottom > enemyRect.top
      ) {
        console.log("enemy killed")
        bullet.remove();
        enemy.remove();
      }
    });
  });
}


setInterval(checkCollision3, 50);


setInterval(()=>{
  console.log(Math.random())
},300);



//ROCKS

  function createRock() {
    const rock = document.createElement("div");
    rock.className = "rock";
    rock.style.top = (Math.random() * 300 + 300) + "px";
    rock.style.left = window.innerWidth + "px";
    document.body.appendChild(rock);

    const pattern = [
      "0110",
      "1111",
      "1111",
      "0110"
    ];

    for (let row of pattern) {
      for (let char of row) {
        const pixel = document.createElement("div");
        pixel.className = "rock-pixel" + (char === "0" ? " transparent" : "");
        rock.appendChild(pixel);
      }
    }

    let left = window.innerWidth;
    function moveRock() {
      left -= 6;
      rock.style.left = left + "px";
      if (left > -60) {
        requestAnimationFrame(moveRock);
      } else {
        rock.remove();
      }
    }
    moveRock();
  }

  // Spawn rocks repeatedly
  setInterval(() => {
    createRock();
  }, 1000); // 1 rock per second (adjust if needed)

  // Start with 3 rocks instantly
  createRock();
  setTimeout(createRock, 500);
  setTimeout(createRock, 1000);

