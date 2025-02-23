function renderMap(map, imgID) {
  const mapContainer = document.getElementById('mapContainer')

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

      tileDiv.style.backgroundImage = `url("../imgs/t1.png")` 
      console.log(`-${tileCol * tileSize}px -${tileRow * tileSize}px`)

      tileDiv.style.backgroundPosition = `-${tileCol * tileSize}px -${tileRow * tileSize}px`

      mapContainer.appendChild(tileDiv)
    }
  }
}

let map1 = {
  columns: 9,
  rows: 12,
  size: 60,
  tiles: [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,

  ],
  getTile: function (col, row) {
    return this.tiles[row * this.columns + col]
  }
}

renderMap(map1, 1)
