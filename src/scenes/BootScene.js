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

    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    this.load.tilemapTiledJSON('map2', 'assets/map/map2.json');
    this.load.tilemapTiledJSON('map3', 'assets/map/map3.json');

    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', {frameWidth:16, frameHeight:16});
    this.load.spritesheet('npcs', 'assets/RPG_assets.png', {frameWidth:16, frameHeight:16});

    // tiles for a door
    this.load.spritesheet('door', 'assets/door_assets.png', {frameWidth:16, frameHeight:16});
    this.load.spritesheet('door2', 'assets/door_assets.png', {frameWidth:16, frameHeight:16});

    //image for menu
    this.load.image('menu', 'assets/menu_list.png');
    this.load.image('voltar', 'assets/return.png' );

    // load audio -  some browsers don't support mp3 files, so they use ogg
    this.load.audio('backgroundSong', ["assets/audio/OMC_How_Bizarre.mp3",
    "assets/audio/OMC_How_Bizarre.ogg"]);
  },

  create: function ()
  {
    // start the WorldScene
    console.log(' - Starting Wolrd Scene');
    this.scene.start('Begin');
  }
});


// exporting variable, this way it is accessed out of this file
export default BootScene;

// -------------------------------------------------
// -------------------------------------------------
