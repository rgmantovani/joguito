// -------------------------------------------------
// BlocoA Scene
// -------------------------------------------------

var BlocoAScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function SecondScene ()
    {
        Phaser.Scene.call(this, { key: 'BlocoAScene' });
        this.sceneName = "Bloco A";
    },

    preload: function ()
    {

    },

    create: function ()
    {

      // create the map
      var map = this.make.tilemap({ key: 'blocoA' });

      // first parameter is the name of the tilemap in tiled
      var tiles2 = map.addTilesetImage('poke2');
      var tiles4 = map.addTilesetImage('poke4');


      // creating the layers
      var floorsA = map.createLayer('Floor', tiles2, 0, 0);
      var wallsA  = map.createLayer('Walls', tiles4, 0, 0);
      var doorsA  = map.createLayer('Doors', tiles4, 0, 0);

      //-------------------------------
      // Adding a door to a new scene
      //-------------------------------

      // this door makes the game go to a main scene
      this.doorMain = this.physics.add.sprite(242, 440, '', 0);
      this.doorMain.setImmovable();

      //-------------------------------
      // Adding the main char
      //-------------------------------

      // our player sprite created through the phycis system
      this.player = this.physics.add.sprite(242, 440, 'player', 0);

      // don't go out of the map
      this.physics.world.bounds.width = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;
      this.player.setCollideWorldBounds(true);

      // don't walk on walls
      wallsA.setCollisionByExclusion([-1]);
      this.physics.add.collider(this.player, wallsA);

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

    update: function (time, delta)
    {
      this.player.body.setVelocity(0);
      this.updatePlayer();
    },

    // this function updates the player's position
    updatePlayer: function()
    {
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
          this.player.body.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown)
        {
          this.player.body.setVelocityX(160);
        }

        // Vertical movement
        if (this.cursors.up.isDown)
        {
          this.player.body.setVelocityY(-160);
        }
        else if (this.cursors.down.isDown)
        {
          this.player.body.setVelocityY(160);
        }

        // Update the animation last and give left/right animations
        // precedence over up/down animations
        if (this.cursors.left.isDown)
        {
          this.player.anims.play('left', true);
          this.player.flipX = false;
        }
        else if (this.cursors.right.isDown)
        {
          this.player.anims.play('right', true);
          this.player.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
          this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
          this.player.anims.play('down', true);
        }
        else
        {
          this.player.anims.stop();
        }
    },
});

// exporting variable, this way it is accessed out of this file
export default BlocoAScene;

// -------------------------------------------------
// -------------------------------------------------
