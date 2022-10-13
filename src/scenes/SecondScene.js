// -------------------------------------------------
// Second Scene
// -------------------------------------------------

var SecondScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function SecondScene ()
    {
        Phaser.Scene.call(this, { key: 'SecondScene' });
    },

    preload: function ()
    {

    },

    create: function ()
    {

      // create the map
      var map = this.make.tilemap({ key: 'map2' });

      // first parameter is the name of the tilemap in tiled
      var tiles = map.addTilesetImage('spritesheet', 'tiles');

      // creating the layers
      var grass = map.createLayer('Field', tiles, 0, 0);
      var trees = map.createLayer('Trees', tiles, 0, 0);

      // -------------------------------
      // -------------------------------

      // make all tiles in obstacles collidable
      trees.setCollisionByExclusion([-1]);

      //-------------------------------
      // Adding a door to a new scene
      //-------------------------------

      // this door makes the game go to a scene 2
      this.door = this.physics.add.sprite(134, 150, 'door', 0);
      this.door.setImmovable();

      //-------------------------------
      // Adding the main char
      //-------------------------------

      // our player sprite created through the phycis system
      this.player = this.physics.add.sprite(134, 150, 'player', 0);

      // don't go out of the map
      this.physics.world.bounds.width = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;
      this.player.setCollideWorldBounds(true);

      // don't walk on trees
      this.physics.add.collider(this.player, trees);

      //-------------------------------
      // Limit camera to map
      //-------------------------------

      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
      this.cameras.main.roundPixels = true; // avoid tile bleed

      //-------------------------------
      // Controlling player with the keyboard
      //-------------------------------

      // user input
      this.cursors = this.input.keyboard.createCursorKeys();

      //-------------------------------
      // Changing Scenes
      //-------------------------------
      this.physics.add.overlap(this.player, this.door, this.callWorldScene, false, this);

      this.add.image(20, 20, 'menu',).setInteractive().on('pointerdown', () => this.scene.switch('MenuOp'));

    },

    callWorldScene: function() {
      if(this.cursors.space.isDown) {
        console.log(' - Starting the World Scene');
          // this.scene.start('WorldScene');
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
        this.player.body.setVelocityX(-80);
      }
      else if (this.cursors.right.isDown)
      {
        this.player.body.setVelocityX(80);
      }

      // Vertical movement
      if (this.cursors.up.isDown)
      {
        this.player.body.setVelocityY(-80);
      }
      else if (this.cursors.down.isDown)
      {
        this.player.body.setVelocityY(80);
      }

      // Update the animation last and give left/right animations
      // precedence over up/down animations
      if (this.cursors.left.isDown)
      {
        this.player.anims.play('left', true);
        this.player.flipX = true;
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
export default SecondScene;


// -------------------------------------------------
// -------------------------------------------------
