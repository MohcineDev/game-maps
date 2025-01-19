const canvas = document.querySelector('.parent')
const player = document.querySelector('.player')

let moveHor = player.offsetLeft
let moveVer = player.offsetTop

let moveAmount = 4
let leftId = null
let rightId = null
let upId = null
let downId = null
let leftMove = true
let rightMove = true
let upMove = true
let downMove = true

let beforePause = null

parent.addEventListener('keydown', e => {

    if (e.key === 'ArrowLeft') {
        checkforpause()

        if (leftMove) {
            moveElementLeft()
        }
        leftMove = false

    } else if (e.key === 'ArrowRight') {
        checkforpause()
        if (rightMove) {
            moveElementRight()
        }
        rightMove = false
    } else if (e.key === 'ArrowUp') {
        checkforpause()
        if (upMove) {
            moveElementUp()
        }
        upMove = false
    } else if (e.key === 'ArrowDown') {
        checkforpause()

        if (downMove) {
            moveElementDown()
        }
        downMove = false
    }

    ///PAUSE
    else if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        console.log('pause');
//        player.classList.add('pause')
        pause()
    }
    console.log(e);

})

function checkforpause() {
    if (player.classList.contains('pause')) {
        player.classList.remove('pause')
    }
}

function moveElementRight() {
    moveHor += moveAmount
    player.style.left = `${moveHor}px`
    null_id_and_cancel(leftId)
    null_id_and_cancel(upId)
    null_id_and_cancel(downId)
    rightId = requestAnimationFrame(moveElementRight)


    leftMove = true
    upMove = true
    downMove = true
}
function moveElementLeft() {
    moveHor -= moveAmount
    player.style.left = `${moveHor}px`
    null_id_and_cancel(rightId)
    null_id_and_cancel(upId)
    null_id_and_cancel(downId)
    leftId = requestAnimationFrame(moveElementLeft)
    rightMove = true

    upMove = true
    downMove = true
}
function moveElementUp() {
    moveVer -= moveAmount
    player.style.top = `${moveVer}px`
    null_id_and_cancel(leftId)
    null_id_and_cancel(rightId)
    null_id_and_cancel(downId)
    upId = requestAnimationFrame(moveElementUp)
    rightMove = true
    leftMove = true

    downMove = true
}
function moveElementDown() {
    moveVer += moveAmount
    player.style.top = `${moveVer}px`
    null_id_and_cancel(leftId)
    null_id_and_cancel(rightId)
    null_id_and_cancel(upId)

    downId = requestAnimationFrame(moveElementDown)
    rightMove = true
    leftMove = true
    upMove = true
}


function null_id_and_cancel(a) {

    if (a) {
        cancelAnimationFrame(a)
        a = null
    }
}

function pause() {
    null_id_and_cancel(leftId)
    null_id_and_cancel(rightId)
    null_id_and_cancel(upId)
    null_id_and_cancel(downId)

}