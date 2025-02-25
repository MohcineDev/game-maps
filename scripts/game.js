function renderMap(map, img) {
  const mapContainer = document.getElementById('mapContainer')

  mapContainer.innerHTML = ''

  for (let row = 0; row < map.rows; row++) {
    for (let col = 0; col < map.columns; col++) {

      const tileDiv = document.createElement('div')
      tileDiv.classList.add('tile')
      
      tileDiv.style.backgroundImage = img
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
  ///4,5 => 5 *9+4 index 49=50
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