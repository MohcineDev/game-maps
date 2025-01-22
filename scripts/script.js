import { moveEnimiesAmount, moveEnimiesDown, movePlayerSpeed } from './speed.js'
const canvas = document.querySelector('.canvas')
const popup = document.querySelector('.popup')
const restart = popup.querySelector('button')
const player = document.querySelector('.player')
const playerWidth = player.clientWidth
const canvasREC = canvas.getBoundingClientRect()

console.log('canvasREC: ', canvasREC)
let moveVer = player.offsetTop
let playerREC = player.getBoundingClientRect()

let playerInitX = canvas.clientWidth / 2 - player.clientWidth / 2
let playerInitY = canvas.clientHeight - player.clientHeight
let moveHor = playerInitX
let bulletSpeed = 20

player.style.transform = `translate(${playerInitX}px)`

function getPlayerXRelativeToCanvas(player, canvas) {
    const playerRect = player.getBoundingClientRect()
    const canvasRect = canvas.getBoundingClientRect()

    return playerRect.left - canvasRect.left
}

let keys = {}

document.addEventListener('keyup', e => {
    keys[e.key] = false
})
let shooting = false
let canShoot = true

document.addEventListener('keydown', e => {
    keys[e.key] = true


    const playerX = getPlayerXRelativeToCanvas(player, canvas)
    //space
    if (e.key === ' ') {

        if (canShoot) {

            createBullet(playerX)

            shooting = true
            canShoot = false
            setTimeout(() => {
                canShoot = true
            }, 150)
        }
    }
})


function movePlayer() {
    const canvasWidth = canvas.clientWidth
    const playerWidth = player.clientWidth

    //player x pos
    const playerX = getPlayerXRelativeToCanvas(player, canvas)

    if (keys['ArrowLeft'] && playerX > 0) {
        moveHor -= movePlayerSpeed
    }

    if (keys['ArrowRight'] && playerX + playerWidth < canvasWidth) {
        moveHor += movePlayerSpeed
    }


    player.style.transform = `translateX(${moveHor}px)`
}

let bullets = []
let bulletYMove = playerInitY

function moveBullet(bullet) {
    let bTop = parseInt(bullet.style.top)
    bTop -= bulletSpeed
    bullet.style.top = `${bTop}px`

    ///the bullet height
    if (bTop <= -25) {
        bullet.remove()
        ///remove the curcreateBulletrent bullet
        bullets = bullets.filter(b => b !== bullet)
    } else {
        requestAnimationFrame(() => moveBullet(bullet))
    }
    checkForCollision_bullet_enimie(bullet)

}

function createBullet(playerX) {
    const bullet = document.createElement('span')
    bullet.classList.add('bullet')
    bullet.style.left = `${playerX + playerWidth / 2}px`
    bullet.style.top = `${playerInitY - 40}px`
    bullet.style.transform = `translate(-50%)`

    canvas.appendChild(bullet)
    bullets.push(bullet)
    moveBullet(bullet)
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
            ghostDiv.id = index + j
            enimieContainer.appendChild(ghostDiv)

        }
    }
}

let moveEnimiesHor = 0
let moveEnimiesVer = 0
let reverse = false

function moveEnimieContainer() {

    const enimieREC = enimieContainer.getBoundingClientRect()

    if (!reverse && enimieREC.right < canvasREC.right) {
        moveEnimiesHor += moveEnimiesAmount
    } else if (!reverse && enimieREC.right == canvasREC.right) {
        reverse = true
        moveEnimiesVer += moveEnimiesDown
    }

    if (reverse && enimieREC.left > canvasREC.left) {
        moveEnimiesHor -= moveEnimiesAmount
    } else if (reverse && enimieREC.left == canvasREC.left) {
        reverse = false
        moveEnimiesVer += moveEnimiesDown
    }

    enimieContainer.style.transform = `translate(${moveEnimiesHor}px,${moveEnimiesVer}px )`
}

function checkForCollision_bullet_enimie(bullet) {
    let enimies = document.querySelectorAll('.enimie')
    let bulletREC = bullet.getBoundingClientRect()
    // console.log("bulletREC : ", bulletREC)
    for (let i = 0; i < enimies.length; i++) {
        let enimieREC = enimies[i].getBoundingClientRect()
        // console.log("enimieREC : ", enimieREC)
        if (enimieREC.left < bulletREC.left && enimieREC.right > bulletREC.right &&
            enimieREC.top < bulletREC.top && enimieREC.bottom > bulletREC.bottom
        ) {
            bullet.remove()
            enimies[i].remove()
            //
        }
    }
}
console.log(playerREC);

let REQID = null

function checkForCollision_player_enimie() {
    let enimies = document.querySelectorAll('.enemy')

    for (let i = 0; i < enimies.length; i++) {
        let enimieREC = enimies[i].getBoundingClientRect()

        if (playerREC.top <= enimieREC.bottom) {

            cancelAnimationFrame(REQID)
            popup.style.display = 'block'
            return;
        }
    }
}

createEnimies()

function gameLoop() {
    console.log('REQID : ', REQID);

    movePlayer()
    moveEnimieContainer()
    checkForCollision_player_enimie()
    REQID = requestAnimationFrame(gameLoop)
}

gameLoop()

restart.onclick = () => restartGAME()

function restartGAME() {
    console.log(1000000000);

    enimieContainer.style.transform = `translate(${0}px,${0}px )`
    popup.style.display = 'none'
    gameLoop()

}