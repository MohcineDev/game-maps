import { writeTitle } from './speed.js'
import { init, enimieContainer, createEnimies, gameLoop, handleCountDown , enemiesShooting} from './script.js'

///game over
const restartPopup = document.querySelector('.restart-popup')
const restartBtn = restartPopup.querySelector('button')
export const restartScore = restartPopup.querySelector('span')

//start Popup
const startPopup = document.querySelector('.start-popup')
const startBtn = startPopup.querySelector('button')

//pause Popup
const pausePopup = document.querySelector('.pause-popup')
const resumeBtn = pausePopup.querySelector('button')

writeTitle(startPopup.querySelector('h1'), 'Space invader #')

startBtn.onclick = () => {
    init()
    document.body.classList.add('playing')
}

resumeBtn.onclick = () => {
    gameLoop()
    handleCountDown()
    enemiesShooting()
    document.body.classList.add('playing')
    document.body.classList.remove('paused')

}

restartBtn.onclick = () => restartGAME()


function restartGAME() {
    enimieContainer.innerHTML = ''
    createEnimies()
    document.body.classList.remove('over')
    init()
}


document.addEventListener('keyup', e => {

    if (e.key === ' ') {
        if (startPopup.checkVisibility()) {
            startBtn.click()
            console.log('start btn')
        }
        else if (restartPopup.checkVisibility()) {
            console.log('restart btn')
            restartBtn.click()
        } else if (pausePopup.checkVisibility()) {
            console.log('resume btn')
            resumeBtn.click()
        }

    }
})