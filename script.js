const canvas = document.querySelector('.canvas')
const player = document.querySelector('.player')
const playerWidth = player.clientWidth
const canvasREC = canvas.getBoundingClientRect()

console.log('canvasREC: ', canvasREC)
let moveVer = player.offsetTop

let moveAmount = 5
let playerInitX = canvas.clientWidth / 2 - player.clientWidth / 2
let playerInitY = canvas.clientHeight - player.clientHeight
let moveHor = playerInitX

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

document.addEventListener('keydown', e => {
    keys[e.key] = true


    const playerX = getPlayerXRelativeToCanvas(player, canvas)
    //space
    if (e.key === ' ') {
        createBullet(playerX)
    }
})


function movePlayer() {
    const canvasWidth = canvas.clientWidth
    const playerWidth = player.clientWidth

    //player x pos
    const playerX = getPlayerXRelativeToCanvas(player, canvas)
    console.log(playerX)
    if (keys['ArrowLeft'] && playerX > 0) {
        moveHor -= moveAmount
    }

    if (keys['ArrowRight'] && playerX + playerWidth < canvasWidth) {
        console.log(111)
        moveHor += moveAmount
    }

    //requestAnimationFrame(movePlayer)

    player.style.transform = `translateX(${moveHor}px)`
}

let bullets = []
let bulletYMove = playerInitY

function moveBullet(bullet) {
    let bTop = parseInt(bullet.style.top)
    bTop -= moveAmount
    bullet.style.top = `${bTop}px`


    if (bTop <= canvasREC.top - canvasREC.top) {
        bullet.remove()
        ///remove bullet
        bullets = bullets.filter(b => b !== bullet)
    } else {
        requestAnimationFrame(() => moveBullet(bullet))
    }
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
            ghostDiv.classList.add('enimie')
            ghostDiv.style.transform = `translate(${60 * index}px, ${25 * j}px)`;

            enimieContainer.appendChild(ghostDiv)

        }
    }
}

let move = 0
let moveEnimiesAmount = 2
let reverse = false

function moveEnimieContainer() {

    const enimieREC = enimieContainer.getBoundingClientRect()

    if (!reverse && enimieREC.left + enimieREC.width < canvasREC.left + canvasREC.width) {
        move += moveEnimiesAmount
        enimieContainer.style.transform = `translateX(${move}px)`
    } else
        reverse = true

    if (reverse && enimieREC.left > canvasREC.left) {

        move -= moveEnimiesAmount
        enimieContainer.style.transform = `translateX(${move}px)`
    } else
        reverse = false
}


createEnimies()


function gameLoop() {
    movePlayer()
    moveEnimieContainer()
    requestAnimationFrame(gameLoop)


}
gameLoop()