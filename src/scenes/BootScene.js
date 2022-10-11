// -------------------------------------------------
// An initial scene just to load assets
// -------------------------------------------------

var BootScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function BootScene ()
  {
    Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload: function ()
  {
    console.log(' - BootScene: loading assets');

    // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');
    this.load.image('reduced', 'assets/map/reduced.png');

    // map in json format
    this.load.tilemapTiledJSON('utfmap', 'assets/map/utfmap.json');
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    this.load.tilemapTiledJSON('map2', 'assets/map/map2.json');
    this.load.tilemapTiledJSON('map3', 'assets/map/map3.json');

    // our two characters
    this.load.spritesheet('player', 'assets/student.png', {frameWidth:32, frameHeight:32});
    //this.load.spritesheet('player', 'assets/RPG_assets.png', {frameWidth:32, frameHeight:32});
    this.load.spritesheet('npcs', 'assets/RPG_assets.png', {frameWidth:32, frameHeight:32});

    // tiles for a door
    this.load.spritesheet('door', 'assets/door_assets.png', {frameWidth:32, frameHeight:32});
    this.load.spritesheet('door2', 'assets/door_assets.png', {frameWidth:32, frameHeight:32});

    // load audio -  some browsers don't support mp3 files, so they use ogg
    this.load.audio('backgroundSong', ["assets/audio/OMC_How_Bizarre.mp3",
    "assets/audio/OMC_How_Bizarre.ogg"]);
  },

  create: function ()
  {
    // start the WorldScene
    console.log(' - Starting Wolrd Scene');
    this.scene.start('WorldScene');
  }
});


// exporting variable, this way it is accessed out of this file
export default BootScene;

// -------------------------------------------------
// -------------------------------------------------
