const canvas = document.querySelector('.parent')
const player = document.querySelector('.player')

let moveHor = player.offsetLeft
let moveVer = player.offsetTop

console.log(player.offsetLeft)
let moveAmount = 5

parent.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        moveHor -= moveAmount
        player.style.left = `${moveHor}px`
    } else if (e.key === 'ArrowRight') {
        moveHor += moveAmount
        player.style.left = `${moveHor}px`

    } else if (e.key === 'ArrowUp') {
        moveVer -= moveAmount
        player.style.top = `${moveVer}px`

    } else if (e.key === 'ArrowDown') {
        moveVer += moveAmount
        player.style.top = `${moveVer}px`
    }
    
    console.log(e.key)
})