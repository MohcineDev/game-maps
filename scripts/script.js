const moveEnimiesX = 4
const moveEnimiesY = 20
const movePlayerSpeed = 6
const bulletSpeed = 6

const canvas = document.querySelector('.canvas')
const optionsScore = document.querySelector('.options-score span')
const countDown = document.querySelector('.count-down')
const player = document.querySelector('.player')

const livesHeart = document.querySelectorAll(`.options-lives svg`)
const winScore = document.querySelector('.game-win-popup h1 span')
let heartbeat = document.querySelector('.options-lives svg:last-child')

////------ popups -----

///game over
const restartPopup = document.querySelector('.restart-popup')
const restartBtn = restartPopup.querySelector('button')
const gameWinBtn = document.querySelector('.game-win-popup button')
const restartScore = restartPopup.querySelector('span')

//start Popup
const startPopup = document.querySelector('.start-popup')
const startBtn = startPopup.querySelector('button')

//pause Popup
const pausePopup = document.querySelector('.pause-popup')
const pauseRestartBtn = pausePopup.querySelector('button:nth-of-type(1)')
const pauseResumeBtn = pausePopup.querySelector('button:nth-of-type(2)')

startBtn.onclick = () => {
    init()
    document.body.classList.add('playing')
    // heartbeat.style.animationPlayState = "running";
}

pauseResumeBtn.onclick = () => {
    gameSetting.canShoot = true
    gameLoop()
    handleCountDown()
    enemiesShooting()
    document.body.classList.add('playing')
    document.body.classList.remove('paused')
    heartbeat = document.querySelector('.options-lives svg:last-child')
    // heartbeat.style.animationPlayState = "running";

}

pauseRestartBtn.onclick = () => restartGAME()
restartBtn.onclick = () => restartGAME()
gameWinBtn.onclick = () => restartGAME()

function restartGAME() {
    cancelAnimationFrame(REQID)

    enimieContainer.innerHTML = ''
    createEnimies()
    document.body.classList.remove('over')
    ///remove wwin if exist
    document.body.classList.remove('win')

    ///remove paused if exist
    document.body.classList.remove('paused')

    init()
}
///save pressed keys
let keys = {}

document.addEventListener('keyup', e => {
    keys[e.key] = false

    if (e.key === ' ') {
        if (startPopup.checkVisibility()) {
            startBtn.click()
            console.log('start btn')
        }
    }
})
////-----------
const playerWidth = player.clientWidth
let canvasREC = canvas.getBoundingClientRect()

addEventListener('resize', (e) => canvasREC = canvas.getBoundingClientRect())

let Score = 0
let REQID = null
let playing = false
let isGameOver = false

let lives = 3
let playerREC = player.getBoundingClientRect()

let playerInitX = canvas.clientWidth / 2 - player.clientWidth / 2
let playerInitY = canvas.clientHeight - player.clientHeight

///center the player
player.style.transform = `translate(${playerInitX}px)`

let moveHor = playerInitX
let moveEnimiesHor = 0
let moveEnimiesVer = 0

let lastTime = performance.now();
let counter = 0

let fpsDisplay = document.querySelector('.fps')

let playerRectCache = null;

function getPlayerXRelativeToCanvas(player, canvas) {
    if (!playerRectCache) {
        playerRectCache = player.getBoundingClientRect().left
    }
    const canvasRect = canvas.getBoundingClientRect().left
    return playerRectCache - canvasRect
}

 
let gameSetting = {
    canShoot: true
}
let playerX = null
document.addEventListener('keydown', e => {
    keys[e.key] = true

    playerX = getPlayerXRelativeToCanvas(player, canvas)
    //space
    if (e.key === ' ' && playing) {
        if (gameSetting.canShoot) {

            createBullet(playerX)

            gameSetting.canShoot = false
            setTimeout(() => {
                gameSetting.canShoot = true
            }, 200)
        }
    } else if ((e.key === 'p' || e.key === 'P' || e.key === 'Escape') && !gameWinBtn.checkVisibility()) {

        if (playing) {
            gameSetting.canShoot = false
            document.body.classList.add('paused')
            document.querySelector('.pause-popup span').textContent = countDown.textContent

            cancelAnimationFrame(REQID)
        }
    }
})

function movePlayer() {
    const canvasWidth = canvas.clientWidth
    const playerWidth = player.clientWidth

    //get player x pos
    const playerX = getPlayerXRelativeToCanvas(player, canvas)

    if (keys['ArrowLeft'] && playerX > 0) {
        moveHor -= movePlayerSpeed
        playerRectCache = null
    }

    if (keys['ArrowRight'] && playerX + playerWidth < canvasWidth) {
        moveHor += movePlayerSpeed
        playerRectCache = null
    }

    player.style.transform = `translateX(${moveHor}px)`
}

let bullets = []
let bTop = null

function moveBullet() {

    for (let i = 0; i < bullets.length; i++) {
        // console.log(parseInt(bullets[i].style.transform));

        // let bTop = parseInt(bullets[i].style.top)
        bTop = bullets[i].y - bulletSpeed
        // bullets[i].style.top = `${bTop}px`
        //  bullets[i].b.style.transform = `translateY(${bTop}px)`
        bullets[i].b.style.transform = `translate(${bullets[i].x}px, ${bTop}px)`
        bullets[i].y = bTop
        ///the bullet height
        if (bTop <= -25) {
            bullets[i].b.remove()
            ///remove the curcreateBulletrent bullet
            bullets = bullets.filter(b => b !== bullets[i])
        }
        if (bullets[i]) {
            checkForCollision_bullet_enimie(bullets[i].b)
        }
    }
}
let xPos = null

function createBullet(playerX) {
    const bullet = document.createElement('span')
    bullet.classList.add('bullet')
    xPos = playerX + playerWidth / 2 - 4
    bullet.style.transform = `translate(${xPos}px, ${playerInitY - 40}px)`
    // bullet.style.left = `${playerX + playerWidth / 2}px`
    // bullet.style.top = `${playerInitY - 40}px`
    // bullet.style.transform = `translate(-50%)`

    let bulletObj = {
        b: bullet,
        x: xPos,
        y: playerInitY - 40
    }
    canvas.appendChild(bullet)
    bullets.push(bulletObj)
    // bullets.push(bullet)
}

const enimieContainer = document.createElement('div')
enimieContainer.style.width = `${5 * 60}px`
enimieContainer.classList.add('enimieContainer')
canvas.appendChild(enimieContainer)

function createEnimies() {

    for (let index = 0; index < 5; index++) {
        for (let j = 0; j < 3; j++) {
            const ghostDiv = document.createElement('div')
            ghostDiv.classList.add('enemy')
            ghostDiv.style.transform = `translate(${60 * index}px, ${35 * j}px)`;

            enimieContainer.appendChild(ghostDiv)
        }
    }
}
createEnimies()

let reverse = false
////get new container edge
function containerEdge() {
    const invaders = document.querySelectorAll('.enemy')

    let left = canvasREC.right
    let right = canvasREC.left

    invaders.forEach(elem => {

        const enemyREC = elem.getBoundingClientRect()

        if (enemyREC.left < left)
            left = enemyREC.left
        if (enemyREC.right > right)
            right = enemyREC.right

    })
    return { left, right }
}

function moveEnimieContainer() {

    const { left, right } = containerEdge()

    if (!reverse && right < canvasREC.right) {
        moveEnimiesHor += moveEnimiesX
    } else if (!reverse && right >= canvasREC.right) {
        reverse = true
        moveEnimiesVer += moveEnimiesY
    }
    if (reverse && left > canvasREC.left) {
        moveEnimiesHor -= moveEnimiesX
    } else if (reverse && left <= canvasREC.left) {
        reverse = false
        moveEnimiesVer += moveEnimiesY
    }

    enimieContainer.style.transform = `translate(${moveEnimiesHor}px,${moveEnimiesVer}px)`
}


///collision between player bullet and the invader
function checkForCollision_bullet_enimie(bullet) {

    let invaders = document.querySelectorAll('.enemy')
    let bulletREC = bullet.getBoundingClientRect()

    for (let i = 0; i < invaders.length; i++) {
        let enimieREC = invaders[i].getBoundingClientRect()

        if (enimieREC.left < bulletREC.left && enimieREC.right > bulletREC.right &&
            enimieREC.top < bulletREC.top && enimieREC.bottom > bulletREC.bottom
        ) {
            Score += 10
            optionsScore.textContent = Score
            bullet.remove()
            invaders[i].remove()
        }
    }
    if (invaders.length === 0) {
        gameWin()
    }
}

let howManyEnimiesCanShot = 0

///collision between enemies and the player
function checkForCollision_player_enimie() {
    let invaders = document.querySelectorAll('.enemy')
    let invadersLength = invaders.length

    for (let i = 0; i < invadersLength; i++) {
        let enimieREC = invaders[i].getBoundingClientRect().bottom

        if (playerREC.top <= enimieREC) {
            gameOver('killed')
        }
    }
}

function enemiesShooting() {
    let invaders = document.querySelectorAll('.enemy')

    howManyEnimiesCanShot = Math.floor(Math.random() * 4)
    if (howManyEnimiesCanShot === 0) {
        howManyEnimiesCanShot++
    }

    let chosenEnimies = new Set()
    if (invaders) {

        while (chosenEnimies.size < Math.min(howManyEnimiesCanShot, invaders.length)) {

            const enemy = Math.floor(Math.random() * invaders.length)
            chosenEnimies.add(enemy)
        }
        if (invadersBullet.length < 2) { // limit bullets on screenn
            chosenEnimies.forEach(enemy => createEnimiesBullet(invaders[enemy]))
        }

    }
}


///collisoin between player and invaders bullet
let player_invaderBullet = false

function checkForCollision_player_invaderBullet(bullet) {


    let bulletREC = bullet.getBoundingClientRect()
    let playerREC = player.getBoundingClientRect()

    if (playerREC.top < bulletREC.bottom && playerREC.right > bulletREC.right && playerREC.left < bulletREC.left) {
        bullet.remove()

        player_invaderBullet = true
        updateLives()
    }
}

let invadersBullet = []

function moveInvadersBullet() {

    for (let i = 0; i < invadersBullet.length; i++) {

        let bTop = parseInt(invadersBullet[i].style.top)
        bTop += bulletSpeed
        invadersBullet[i].style.top = `${bTop}px`

        ///the bullet height
        if (bTop >= canvasREC.height) {
            invadersBullet[i].remove()
            ///remove the current bullet if it reaches canvas end
            // invadersBullet = invadersBullet.filter(b => b !== invadersBullet[i])
            invadersBullet.splice(i, 1)
            i--
            continue
        }
        if (invadersBullet[i])
            checkForCollision_player_invaderBullet(invadersBullet[i])

    }
}

function createEnimiesBullet(invader) {
    if (invader) {
        let invaderREC = invader.getBoundingClientRect()
        const bullet = document.createElement('span')
        bullet.classList.add('invader-bullet')
        bullet.style.left = `${invaderREC.left - canvasREC.left + (invaderREC.width / 2)}px`
        bullet.style.top = `${invaderREC.top - canvasREC.top + invaderREC.height - 5}px`

        canvas.appendChild(bullet)
        invadersBullet.push(bullet)
    }
}


function updateLives() {
    if (player_invaderBullet) {

        lives--
        if (lives === 0) {
            isGameOver = true
            document.querySelector(`.options-lives svg:nth-of-type(${lives + 1})`).classList.remove('heartbeat')
            document.querySelector(`.options-lives svg:nth-of-type(${lives + 1})`).style.display = 'none'
            gameOver('0 lives ...')
        }
        if (lives > 0) {
            document.querySelector(`.options-lives svg:nth-of-type(${lives + 1})`).style.display = 'none'
            document.querySelector(`.options-lives svg:nth-of-type(${lives + 1})`).classList.remove('heartbeat')

            document.querySelector(`.options-lives svg:nth-of-type(${lives})`).classList.add('heartbeat')
        }

        player_invaderBullet = false

    }
}

function updateFPS() {
    const currentTime = performance.now();
    const fps = Math.round(1000 / (currentTime - lastTime));
    lastTime = currentTime;

    fpsDisplay.textContent = `${fps}`;
}

function gameLoop() {

    if (!isGameOver) {
        counter++
        if (counter == 60) {
            handleCountDown()
              enemiesShooting()

            counter = 0
        }

        movePlayer()
        moveBullet()
        updateFPS()
        moveInvadersBullet()
          moveEnimieContainer()
        checkForCollision_player_enimie()
        REQID = requestAnimationFrame(gameLoop)
    }

}
function removeDOMBullets() {
    const DOM_bullets = document.querySelectorAll('.bullet, .invader-bullet')
    DOM_bullets.forEach(elem => {
        elem.remove()
    })

    bullets = []
    invadersBullet = []
}

function init() {
    playing = true
    moveEnimiesHor = 0
    isGameOver = false
    moveEnimiesVer = 0
    lives = 3
    enimieContainer.style.transform = `translate(0px,0px)`
    gameSetting.canShoot = true

    countDown.textContent = '01:10'

    restartScore.textContent = 0

    livesHeart.forEach(elem => elem.style.display = 'block')

    removeDOMBullets()
    ////////options
    optionsScore.textContent = 0
    Score = 0

    Array.from(document.querySelectorAll(`.options-lives svg.heartbeat`), elem =>
        elem.classList.remove('heartbeat')
    )
    if (playing) {

        requestAnimationFrame(gameLoop);
    }

let radio = document.querySelector('input[type="radio"]:checked')
renderMap(map1, `url("../imgs/tilef${radio.id.substring(3)}.png")`)

}

///count-down
function handleCountDown() {

    let startCount = countDown.textContent.split(':')

    let minutes = parseInt(startCount[0])
    let seconds = parseInt(startCount[1])

    if (seconds === 0 && minutes > 0) {
        minutes--
        seconds = 59
    }

    if (seconds > 0) {
        console.log(`${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`);
        seconds--

    } else if (minutes > 0) {

        minutes--
        seconds = 59
    }
    countDown.textContent = `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`

    if (seconds === 0 && minutes === 0) {
        gameOver('time\'s up')
    }
}

function gameOver(calledFrom) {
    playing = false
    gameSetting.canShoot = false
    isGameOver = true
    restartScore.textContent = Score + "."
    document.body.classList.add('over')
    document.querySelector('.restart-popup p').textContent = calledFrom
}

function gameWin() {
    isGameOver = true

    gameSetting.canShoot = false

    winScore.textContent = Score + "."
    document.body.classList.add('win')
}