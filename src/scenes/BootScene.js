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
    // this.load.image('poke32', 'assets/maps/pokemon_tileset_from_public_tiles_32x32_by_chaoticcherrycake_dab2byf.png');
    this.load.image('poke1', 'assets/maps/poke1.png');
    this.load.image('poke2', 'assets/maps/poke2.png');
    this.load.image('poke4', 'assets/maps/poke4.png');
    this.load.image('poke5', 'assets/maps/poke5.png');
    this.load.image('poke8', 'assets/maps/poke8.png');
    
    // map(s) in json format
    this.load.tilemapTiledJSON('utfmap', 'assets/maps/mainMapSmall.json');
    this.load.tilemapTiledJSON('blocoA', 'assets/maps/blockA.json');
    this.load.tilemapTiledJSON('blocoB', 'assets/maps/blockB.json');
    this.load.tilemapTiledJSON('blocoC', 'assets/maps/blockC.json');
    this.load.tilemapTiledJSON('blocoD', 'assets/maps/blockD.json');
   
    // our two characters
    this.load.spritesheet('player', 'assets/chars/student.png', {frameWidth:32, frameHeight:32});
    this.load.spritesheet('npcs',   'assets/chars/npc.png',     {frameWidth:32, frameHeight:32});
    
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
