export async function drawImage(canvas, sources) {
  try {
    const startd = Date.now();
    this.canvas = canvas;
    this.sources = Object.keys(sources).length ? sources : { map: [] };
    this.Xtiles = this.sources.map.length;
    this.Ytiles = this.sources.map[0] ? this.sources.map[0].length : 0;
    // create a canvas
    this.context = this.canvas.getContext("2d");
    // update canvas
    this.context.canvas.width = this.sources.canvasWidth;
    this.context.canvas.height = this.sources.canvasHeight;
    // init param
    this.tileColumnOffset = this.sources.tileWidth; // pixels
    this.tileRowOffset = this.sources.tileHeight; // pixels
    this.originX =
      this.sources.canvasWidth / 2 - (this.Xtiles * this.tileColumnOffset) / 2;
    this.originY = this.sources.canvasHeight / 2;
    this.additionalTiles = [];
    this.tileImages = this.sources.tileImages;

    const drawTile = (Xi, Yi) => {
      var offX =
        (Xi * this.tileColumnOffset) / 2 +
        (Yi * this.tileColumnOffset) / 2 +
        this.originX;
      var offY =
        (Yi * this.tileRowOffset) / 2 -
        (Xi * this.tileRowOffset) / 2 +
        this.originY;
      const imageIndex = this.sources.map[Xi][Yi];
      const isArrayOnIndex = Array.isArray(imageIndex);
      const image = this.tileImages[
        isArrayOnIndex ? imageIndex[0] : imageIndex
      ];
      this.context.drawImage(image, offX, offY);

      // save rest image to temporary variables (additionalTiles)
      const restTile = isArrayOnIndex ? imageIndex.slice(1) : [];
      restTile.length &&
        this.additionalTiles.push({ x: Xi, y: Yi, images: restTile });
    };

    const drawAdditionalTile = () => {
      const temps = [...this.additionalTiles];
      this.additionalTiles = [];
      for (let i = 0; i < temps.length; i++) {
        const additionalTile = temps[i];
        var offX =
          (additionalTile.x * this.tileColumnOffset) / 2 +
          (additionalTile.y * this.tileColumnOffset) / 2 +
          this.originX;
        var offY =
          (additionalTile.y * this.tileRowOffset) / 2 -
          (additionalTile.x * this.tileRowOffset) / 2 +
          this.originY;
        const images = additionalTile.images;
        const idx = images.shift();
        this.context.drawImage(this.tileImages[idx], offX, offY);
        if (images.length) {
          this.additionalTiles.push({
            x: additionalTile.x,
            y: additionalTile.y,
            images: images
          });
        }
      }
      // re run if we still have the additional tile
      if (this.additionalTiles.length) {
        drawAdditionalTile();
      }
    };

    const draw = () => {
      for (var Xi = this.Xtiles - 1; Xi >= 0; Xi--) {
        for (var Yi = 0; Yi < this.Ytiles; Yi++) {
          drawTile(Xi, Yi);
        }
      }
      if (this.additionalTiles.length) {
        drawAdditionalTile();
      }
    };

    draw();
    console.log(`image generated in: ${Date.now() - startd}ms`);
    return this.canvas;
  } catch (error) {
    console.log("[drawImage Error]: ", error.message);
  }
}
