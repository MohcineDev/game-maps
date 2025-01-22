export const moveEnimiesAmount = 2
export const moveEnimiesDown = 10
export const movePlayerSpeed = 5
export const bulletSpeed = 10

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