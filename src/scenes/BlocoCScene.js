// -------------------------------------------------
// BlocoC Scene
// -------------------------------------------------

import Player from '../players/Player.js'

// -------------------------------------------------
// -------------------------------------------------

var BlocoCScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BlocoCScene ()
    {
        Phaser.Scene.call(this, { key: 'BlocoCScene' });
        this.sceneName = "Bloco C";
    },

    preload: function ()
    {

    },

    create: function ()
    {

      // create the map
      // TODO: change here
      var map = this.make.tilemap({ key: 'blocoC' });

      // first parameter is the name of the tilemap in tiled
      var tiles2 = map.addTilesetImage('poke2');
      var tiles4 = map.addTilesetImage('poke4');

      // creating the layers
      var floorC  = map.createLayer('Floor', tiles2, 0, 0);
      var wallsC  = map.createLayer('Walls', tiles4, 0, 0);
      var doorsC  = map.createLayer('Doors', tiles4, 0, 0);

      //-------------------------------
      // Adding a door to a new scene
      //-------------------------------

      // this door makes the game go to a main scene
        this.doorMain = this.physics.add.sprite(20, 495, '', 0);
        this.doorMain.setImmovable();

      //-------------------------------
      // Adding the main char
      //-------------------------------

      // our player sprite created through the phycis system
      this.player = new Player(this, 20, 495, 'player', 0);
      this.physics.add.existing(this.player, false)

      // don't go out of the map
      this.physics.world.bounds.width  = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;
      this.player.setCollideWorldBounds(true);

      // don't walk on walls
      wallsC.setCollisionByExclusion([-1]);
      this.physics.add.collider(this.player, wallsC);
      this.add.existing(this.player)

      //-------------------------------
      // Limit camera to map
      //-------------------------------

      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
      // avoid tile bleed
      this.cameras.main.roundPixels = true; 
      
      //-------------------------------
      // Controlling player with the keyboard
      //-------------------------------

      // user input
      this.cursors = this.input.keyboard.createCursorKeys();

      //-------------------------------
      // Changing Scenes
      //-------------------------------
      this.physics.add.overlap(this.player, this.doorMain, this.callWorldScene, false, this);

      //-------------------------------
      // Debug configurations   
      //-------------------------------
      // show the current scene name

      this.text = this.add.text(350, 545, this.sceneName, { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
      this.timedEvent = this.time.delayedCall(4000, this.fadeSceneName, [], this);

    },

    // ---------------------
    // Scene methods
    // ---------------------

    fadeSceneName: function() {
        console.log("fading scene name")
        this.tweens.add({
            targets: this.text,
            alpha: { from: 1, to: 0 },
            ease: 'Linear',
            duration: 500,
            repeat: 0,
            yoyo: false
        });
    },

    callWorldScene: function() {
      if(this.cursors.space.isDown) {
        console.log(' - Starting the World Scene');
        this.scene.switch('WorldScene');
      }
    },

    update: function (time, delta) {
      this.player.body.setVelocity(0);
      this.player.updatePlayer(this.cursors);
    },
});

// exporting variable, this way it is accessed out of this file
export default BlocoCScene;

// -------------------------------------------------
// -------------------------------------------------
