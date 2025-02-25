function renderMap(map, img) {
  const mapContainer = document.getElementById('mapContainer')

  mapContainer.innerHTML = ''
  const tileSize = 60
  const spriteSheetWidth = 300

  for (let row = 0; row < map.rows; row++) {
    for (let col = 0; col < map.columns; col++) {
      const tileIndex = map.getTile(col, row)
      const tileDiv = document.createElement('div')
      tileDiv.classList.add('tile')

      const tilesPerRow = spriteSheetWidth / tileSize
      const tileRow = Math.floor(tileIndex / tilesPerRow)
      const tileCol = tileIndex % tilesPerRow

      tileDiv.style.backgroundImage = img
      console.log(`-${tileCol * tileSize}px -${tileRow * tileSize}px`)

      tileDiv.style.backgroundPosition = `-${tileCol * tileSize}px -${tileRow * tileSize}px`
      mapContainer.appendChild(tileDiv)
    }
  }

  document.querySelector('.player').style.backgroundImage = img
  document.querySelectorAll('.enemy').forEach(elem => elem.style.backgroundImage = img)
}


let map1 = {
  columns: 9,
  rows: 12,
  size: 60,
  tiles: [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,

  ],
  getTile: function (col, row) {
    return this.tiles[row * this.columns + col]
  }
}

let radio = document.querySelector('input[type="radio"]:checked')
renderMap(map1, `url("../imgs/tilef${radio.id.substring(3)}.png")`)

let radios = document.querySelectorAll('input[type="radio"]')
radios.forEach(elem => elem.addEventListener('change', () => {
  renderMap(map1, `url("../imgs/tilef${elem.id.substring(3)}.png")`)

}))
