export let moveEnimiesX = 10
export let moveEnimiesY = 10
export const movePlayerSpeed = 5
export const bulletSpeed = 10

const HorInput = document.querySelector('.settings #hor input')
const VerInput = document.querySelector('.settings #ver input')
const minHor = document.querySelector('.settings #hor span:nth-of-type(1)')
const maxHor = document.querySelector('.settings #hor span:nth-of-type(2)')
const minVer = document.querySelector('.settings #ver span:nth-of-type(1)')
const maxVer = document.querySelector('.settings #ver span:nth-of-type(2)')
const horValue = document.querySelector('[for="hor"] em')
const verValue = document.querySelector('[for="ver"] em')

minHor.textContent = HorInput.min
maxHor.textContent = HorInput.max

minVer.textContent = VerInput.min
maxVer.textContent = VerInput.max

HorInput.oninput = (e) => {
    console.log(e);
    horValue.textContent = e.target.value
    moveEnimiesX = parseInt(e.target.value)
}
VerInput.oninput = (e) => {
    console.log(e);
    verValue.textContent = e.target.value
    moveEnimiesY = parseInt(e.target.value)

}
let index = 0
export const writeTitle = (elem, txt) => {
    let a = txt.length

    if (index < a) {

        elem.textContent += txt.charAt(index)
        index++
        setTimeout(() => {
            writeTitle(elem, txt)
        }, 80)

    }
}

