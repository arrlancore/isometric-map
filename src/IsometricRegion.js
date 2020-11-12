// x = [7] 126px, y = [0] 45px
// x = [7] 144px, y = [1] 54px
// x = [7] 162px, y = [2] 63px
// x = [7] 180px, y = [3] 72px
// x = [7] 198px, y = [4] 81px
// x = [7] 216px, y = [5] 90px
// x = [7] 234px, y = [6] 99px
// x = [7] 252px, y = [7] 108px

// x = [6] 108px, y = [0] 54px
// x = [6] 126px, y = [1] 63px
// x = [6] 144px, y = [2] 72px
// x = [6] 162px, y = [3] 81px
// x = [6] 180px, y = [4] 90px
// x = [6] 198px, y = [5] 99px
// x = [6] 216px, y = [6] 108px
// x = [6] 234px, y = [7] 117px

// x = [5] 90px, y = [0] 63px
// x = [5] 108px, y = [1] 72px
// x = [5] 126px, y = [2] 81px
// x = [5] 144px, y = [3] 90px
// x = [5] 162px, y = [4] 99px
// x = [5] 180px, y = [5] 108px
// x = [5] 198px, y = [6] 117px
// x = [5] 216px, y = [7] 126px

// x = [4] 72px, y = [0] 72px
// x = [4] 90px, y = [1] 81px
// x = [4] 108px, y = [2] 90px
// x = [4] 126px, y = [3] 99px
// x = [4] 144px, y = [4] 108px
// x = [4] 162px, y = [5] 117px
// x = [4] 180px, y = [6] 126px
// x = [4] 198px, y = [7] 135px

// x = [3] 54px, y = [0] 81px
// x = [3] 72px, y = [1] 90px
// x = [3] 90px, y = [2] 99px
// x = [3] 108px, y = [3] 108px
// x = [3] 126px, y = [4] 117px
// x = [3] 144px, y = [5] 126px
// x = [3] 162px, y = [6] 135px
// x = [3] 180px, y = [7] 144px

// x = [2] 36px, y = [0] 90px
// x = [2] 54px, y = [1] 99px
// x = [2] 72px, y = [2] 108px
// x = [2] 90px, y = [3] 117px
// x = [2] 108px, y = [4] 126px
// x = [2] 126px, y = [5] 135px
// x = [2] 144px, y = [6] 144px
// x = [2] 162px, y = [7] 153px

// x = [1] 18px, y = [0] 99px
// x = [1] 36px, y = [1] 108px
// x = [1] 54px, y = [2] 117px
// x = [1] 72px, y = [3] 126px
// x = [1] 90px, y = [4] 135px
// x = [1] 108px, y = [5] 144px
// x = [1] 126px, y = [6] 153px
// x = [1] 144px, y = [7] 162px

// x = [0] 0px, y = [0] 108px
// x = [0] 18px, y = [1] 117px
// x = [0] 36px, y = [2] 126px
// x = [0] 54px, y = [3] 135px
// x = [0] 72px, y = [4] 144px
// x = [0] 90px, y = [5] 153px
// x = [0] 108px, y = [6] 162px
// x = [0] 126px, y = [7] 171px

export default function IsometricRegion(regionName, opts = {}) {
  this.region = null;
  const locations = [];
  const tileMap = [[]];
  let selectedLocation = null;
  let selectedLocationIndex = null;

  if (regionName) {
    // create region
    const id = "ABC111";
    const region = {
      id,
      locationWidth: opts.locationWidth || 8,
      locationHeight: opts.locationHeight || 8,
      regionName: regionName
    };
    this.region = region;
  }

  const load = (regionId) => {
    // action to retrieve data region & meta data
    // const region = {};
    // this.regionName = region.regionName;
    // this.metaData = region.metaData;
    // // action to retrieve data location
    // const locations = [];
    // locations = locations;
  };

  // to retrieve all location
  const getLocations = () => {
    return locations;
  };

  const getLocationById = (id) => {
    // an action to retrieve a location by id
    const location = locations.filter((loc) => loc.id === id)[0];
    return location;
  };

  // handle create a location
  // *REQUIRED AT CONFIG:
  // name
  // tileWidth
  // tileHeight
  const createLocation = (...args) => {
    const newLocation = {};
    newLocation.name = args[0];
    newLocation.tileWidth = args[1];
    newLocation.tileHeight = args[2];
    newLocation.id = args[3];
    newLocation.region = this.region.id;
    newLocation.tileMap = Array.from({
      length: this.region.locationWidth
    }).map(() => []);
    newLocation.tiles = [];
    // when create the firs location, coordinate always 0,0
    if (locations.length === 0) {
      newLocation.coordinate = { x: 0, y: 0 };
    }

    // persist data
    locations.push(newLocation);

    return newLocation;
  };

  const deleteLocation = (id) => {
    // handle create a location
    return true;
  };

  const addTile = (x, y, z = 0, assets) => {
    // temporary validation
    // todo: need specify how max n allowed above or below of width/height
    if (
      x < 0 ||
      x > this.region.locationWidth - 1 ||
      y < 0 ||
      y > this.region.locationHeight - 1 ||
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      throw new Error("Coordinate is not valid");
    }
    // handle create a tile
    // local id represent index position in the array
    const localId = getIndexByTileCoordinate(x, y);
    const tile = {
      localId,
      coordinate: { x, y },
      position: getPositionInLocation(x, y, z), // px
      assets
    };
    const locationOnSelected = selectedLocation;
    locationOnSelected.tileMap[x][y] = assets.map((i) => i.id);
    if (locationOnSelected) {
      let existIndex = locationOnSelected.tiles.findIndex(
        (tile) => tile.localId === localId
      );
      if (existIndex >= 0) {
        locationOnSelected.tiles[existIndex] = tile;
      } else {
        locationOnSelected.tiles.push(tile);
      }
      // persist to locations
      selectedLocation = locationOnSelected;
      locations[selectedLocationIndex] = locationOnSelected;
    } else {
      console.error("please select a location");
    }

    return tile;
  };

  const retrieveAll = () => {
    const location = locations[0];
    const canvasWidth =
      location && this.region.locationWidth * location.tileWidth;
    const canvasHeight = location && 0.75 * canvasWidth;
    const region = {
      ...this.region,
      canvasWidth, // px
      canvasHeight, //px
      locations: locations.map((itm) => ({ ...itm, tileMap: undefined })),
      locationCount: locations.length
    };
    return region;
  };

  const selectLocation = (location) => {
    selectedLocation = locations.filter((loc, idx) => {
      selectedLocationIndex = loc.name === location && idx;
      return loc.name === location;
    })[0];
    return !!selectLocation;
  };
  const getPositionInLocation = (Xi, Yi, Zi = 0) => {
    const location = locations[0];
    const canvasWidth = this.region.locationWidth * location.tileWidth;
    const canvasHeight = 0.75 * canvasWidth;
    const originX =
      canvasWidth / 2 - (this.region.locationWidth * location.tileWidth) / 2;
    const originY = canvasHeight / 2;
    const x =
      (Xi * location.tileWidth) / 2 + (Yi * location.tileWidth) / 2 + originX;
    let y =
      (Yi * location.tileHeight) / 2 - (Xi * location.tileHeight) / 2 + originY;
    // handle height, if Zi specified
    // on the screen we only know x position and y postion
    // so we need to translate z => x,y axes
    // this kind of idea is taken from ISOMER:
    // http://jdan.github.io/isomer/playground/
    if (Zi) {
      y = y - location.tileHeight * Zi;
    }

    return { x, y };
  };
  const getCoordinateByTileIndex = (xLength, yLength, i) => {
    const x = Math.floor(i / xLength);
    const y = i % yLength;
    return { x, y };
  };
  const getIndexByTileCoordinate = (x, y) => {
    return x * this.region.locationWidth + y;
  };

  const convertLocationToCanvasSources = async (id, assets = []) => {
    const location = getLocationById(id);
    const canvasWidth =
      location && this.region.locationWidth * location.tileWidth;
    const canvasHeight = location && 0.75 * canvasWidth;
    const assetImage = await Promise.all(
      assets.map((asset) => {
        const img = new Image();
        img.src = asset.url;
        img.onload = () => console.log("img loadded");
        return { id: asset.id, img };
      })
    );
    const tileImages = assetImage.reduce((acc, item) => {
      acc[item.id] = item.img;
      return acc;
    }, {});

    const locationMap = {
      map: location.tileMap,
      tileWidth: location.tileWidth,
      tileHeight: location.tileHeight,
      tileImages,
      canvasHeight,
      canvasWidth
    };
    return locationMap;
  };

  // make some of method to be public
  this.load = load;
  this.getLocations = getLocations;
  this.getLocationById = getLocationById;
  this.createLocation = createLocation;
  this.deleteLocation = deleteLocation;
  this.addTile = addTile;
  this.retrieveAll = retrieveAll;
  this.selectLocation = selectLocation;
  this.getCoordinateByTileIndex = getCoordinateByTileIndex;
  this.convertLocationToCanvasSources = convertLocationToCanvasSources;
}
