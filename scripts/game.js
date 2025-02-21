function renderMap(map) {
  const mapContainer = document.getElementById('mapContainer');
  // mapContainer.innerHTML = '';  // Clear the map before rendering a new one

  const visibleColumns = 16;  // Number of columns that fit within the 500px width
  const visibleRows = 21;     // Number of rows that fit within the 670px height

  // Loop through the rows and columns of the visible map area
  for (let row = 0; row < visibleRows; row++) {
    for (let col = 0; col < visibleColumns; col++) {
      const tileIndex = map.getTile(col, row);  // Get the tile from the map
      const tileDiv = document.createElement('div');
      tileDiv.classList.add('tile');

      // Add the appropriate class for the tile index (background position in tileset)
      // Calculate the position of the tile (in pixels)
      const xPos = col * map.size;  // Horizontal position (col * tile width)
      const yPos = row * map.size;  // Vertical position (row * tile height)

  

      const xOffset = 80
      const yOffset = 80;  // Assuming all tiles are in a single row of the tileset
      tileDiv.style.backgroundPosition = `-${xOffset}px -${yOffset}px`;

      // Append the tile to the map container
      mapContainer.appendChild(tileDiv);
    }
  }
}

let map1 = {
  columns: 500 / 40,
  rows: 670 / 40,
  size: 40,
  tiles: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  getTile: function (col, row) {
    return this.tiles[row * this.columns + col];
  }
};

renderMap(map1);
