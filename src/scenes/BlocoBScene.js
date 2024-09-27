// -------------------------------------------------
// BlocoB Scene
// -------------------------------------------------

import Player from '../players/Player.js'

// -------------------------------------------------
// -------------------------------------------------

var BlocoBScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BlocoBScene ()
    {
        Phaser.Scene.call(this, { key: 'BlocoBScene' });
        this.sceneName = "Bloco B";
    },

    preload: function ()
    {

    },

    create: function ()
    {

      // create the map
      // TODO: change here
      var map = this.make.tilemap({ key: 'blocoB' });

      // first parameter is the name of the tilemap in tiled
      var tiles2 = map.addTilesetImage('poke2');
      var tiles4 = map.addTilesetImage('poke4');

      // creating the layers
      var floorB  = map.createLayer('Floor', tiles2, 0, 0);
      var wallsB  = map.createLayer('Walls', tiles4, 0, 0);
      var doorsB  = map.createLayer('Doors', tiles4, 0, 0);

      //-------------------------------
      // Adding a door to a new scene
      //-------------------------------

      // this door makes the game go to a main scene
        this.doorMain = this.physics.add.sprite(242, 430, '', 0);
        this.doorMain.setImmovable();

      //-------------------------------
      // Adding the main char
      //-------------------------------

      // our player sprite created through the phycis system
      this.player = new Player(this, 242, 440, 'player', 0);
      this.physics.add.existing(this.player, false)
    
      // don't go out of the map
      this.physics.world.bounds.width  = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;
      this.player.setCollideWorldBounds(true);

      // don't walk on walls
      wallsB.setCollisionByExclusion([-1]);
      this.physics.add.collider(this.player, wallsB);
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

      this.text = this.add.text(342, 400, this.sceneName, { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
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
export default BlocoBScene;

// -------------------------------------------------
// -------------------------------------------------
