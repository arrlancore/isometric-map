import "./styles.css";
import IsometricRegion from "./IsometricRegion";
import { drawImage } from "./mapEditor";

/**
 * ####################################
 * An example operation
 * ####################################
 */
const assets = {
  sand: {
    id: 1,
    name: "Sand",
    type: "",
    tags: ["terrain"],
    traversable: true,
    dimensions: {
      // 1x1
      width: 1, // block
      height: 1 // block
    },
    url: "assets/sand.png"
  },
  grass: {
    id: 2,
    name: "Grass",
    type: "",
    tags: ["terrain"],
    traversable: true,
    dimensions: {
      width: 1, // block
      height: 1 // block
    },
    url: "assets/grass7.png"
  },
  flower: {
    id: 3,
    name: "Flower Red",
    type: "",
    tags: ["props"],
    traversable: true,
    dimensions: {
      width: 1, // block
      height: 1 // block
    },
    url: "assets/flowerRed.png"
  }
};

// create a new region or world map
const wordFishing = new IsometricRegion("World Fishing");

// create a location or a map
wordFishing.createLocation("Green Lake", 36, 18, "L101");
// select a location to manipulate the tiles
wordFishing.selectLocation("Green Lake");
// add or update tile (x, y,z, assets)
wordFishing.addTile(0, 0, 0, [assets.grass]);
wordFishing.addTile(0, 1, 0, [assets.grass]);
wordFishing.addTile(0, 2, 0, [assets.grass]);
wordFishing.addTile(0, 3, 0, [assets.grass]);
wordFishing.addTile(0, 4, 0, [assets.grass]);
wordFishing.addTile(0, 5, 0, [assets.grass]);
wordFishing.addTile(0, 6, 0, [assets.grass]);
wordFishing.addTile(0, 7, 0, [assets.grass]);

wordFishing.addTile(1, 0, 0, [assets.grass, assets.flower]);
wordFishing.addTile(1, 1, 0, [assets.grass]);
wordFishing.addTile(1, 2, 0, [assets.grass]);
wordFishing.addTile(1, 3, 0, [assets.grass]);
wordFishing.addTile(1, 4, 0, [assets.grass, assets.flower]);
wordFishing.addTile(1, 5, 0, [assets.grass]);
wordFishing.addTile(1, 6, 0, [assets.grass]);
wordFishing.addTile(1, 7, 0, [assets.grass]);

wordFishing.addTile(2, 0, 0, [assets.grass, assets.flower]);
wordFishing.addTile(2, 1, 0, [assets.grass]);
wordFishing.addTile(2, 2, 0, [assets.grass]);
wordFishing.addTile(2, 3, 0, [assets.grass]);
wordFishing.addTile(2, 4, 0, [assets.grass, assets.flower]);
wordFishing.addTile(2, 5, 0, [assets.grass]);
wordFishing.addTile(2, 6, 0, [assets.grass]);
wordFishing.addTile(2, 7, 0, [assets.grass]);

wordFishing.addTile(3, 0, 0, [assets.grass, assets.flower]);
wordFishing.addTile(3, 1, 0, [assets.grass]);
wordFishing.addTile(3, 2, 0, [assets.grass]);
wordFishing.addTile(3, 3, 0, [assets.grass]);
wordFishing.addTile(3, 4, 0, [assets.grass, assets.flower]);
wordFishing.addTile(3, 5, 0, [assets.grass]);
wordFishing.addTile(3, 6, 0, [assets.grass]);
wordFishing.addTile(3, 7, 0, [assets.grass]);

wordFishing.addTile(4, 0, 0, [assets.grass, assets.flower]);
wordFishing.addTile(4, 1, 0, [assets.grass]);
wordFishing.addTile(4, 2, 0, [assets.grass]);
wordFishing.addTile(4, 3, 0, [assets.grass]);
wordFishing.addTile(4, 4, 0, [assets.grass, assets.flower]);
wordFishing.addTile(4, 5, 0, [assets.grass]);
wordFishing.addTile(4, 6, 0, [assets.grass]);
wordFishing.addTile(4, 7, 0, [assets.grass]);

wordFishing.addTile(5, 0, 0, [assets.grass, assets.flower]);
wordFishing.addTile(5, 1, 0, [assets.grass]);
wordFishing.addTile(5, 2, 0, [assets.grass]);
wordFishing.addTile(5, 3, 0, [assets.grass]);
wordFishing.addTile(5, 4, 0, [assets.grass, assets.flower]);
wordFishing.addTile(5, 5, 0, [assets.grass]);
wordFishing.addTile(5, 6, 0, [assets.grass]);
wordFishing.addTile(5, 7, 0, [assets.grass]);

wordFishing.addTile(6, 0, 0, [assets.grass, assets.flower]);
wordFishing.addTile(6, 1, 0, [assets.grass]);
wordFishing.addTile(6, 2, 0, [assets.grass]);
wordFishing.addTile(6, 3, 0, [assets.grass]);
wordFishing.addTile(6, 4, 0, [assets.grass, assets.flower]);
wordFishing.addTile(6, 5, 0, [assets.grass]);
wordFishing.addTile(6, 6, 0, [assets.grass]);
wordFishing.addTile(6, 7, 0, [assets.grass]);

wordFishing.addTile(7, 0, 0, [assets.grass]);
wordFishing.addTile(7, 1, 0, [assets.grass]);
wordFishing.addTile(7, 2, 0, [assets.grass]);
wordFishing.addTile(7, 3, 0, [assets.grass]);
wordFishing.addTile(7, 4, 0, [assets.grass]);
wordFishing.addTile(7, 5, 0, [assets.grass]);
wordFishing.addTile(7, 6, 0, [assets.grass]);
wordFishing.addTile(7, 7, 0, [assets.grass]);

/**
 * ####################################
 *
 * ####################################
 */

document.getElementById("app").innerHTML = `
<canvas id="canvasiso"></canvas>
<h2>JSON:</h2>
<div>
<pre>
${JSON.stringify(wordFishing.retrieveAll(), null, 3)}
</pre>
</div>
`;

/**
 * drawing into canvas
 */
wordFishing
  .convertLocationToCanvasSources("L101", Object.values(assets))
  .then((canvasSources) => {
    const canvas = document.getElementById("canvasiso");
    if (canvas) {
      drawImage(canvas, canvasSources);
    }
  });
