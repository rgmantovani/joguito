// -------------------------------------------------
// Second Scene
// -------------------------------------------------

var SecondScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SecondScene ()
    {
        Phaser.Scene.call(this, { key: 'SecondScene' });
    },

    preload: function ()
    {

    },

    create: function ()
    {
      // create the map
      var map = this.make.tilemap({ key: 'map' });

      // first parameter is the name of the tilemap in tiled
      var tiles = map.addTilesetImage('spritesheet', 'tiles');

      // creating the layers
      var grass = map.createLayer('Grass', tiles, 0, 0);
      var obstacles = map.createLayer('Obstacles', tiles, 0, 0);

      // -------------------------------
      // -------------------------------

      // make all tiles in obstacles collidable
      obstacles.setCollisionByExclusion([-1]);

      // our player sprite created through the phycis system
      this.player = this.physics.add.sprite(49, 150, 'player', 2);

      // don't go out of the map
      this.physics.world.bounds.width = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;
      this.player.setCollideWorldBounds(true);

      // don't walk on trees
      this.physics.add.collider(this.player, obstacles);

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
      // Adding a door to a new scene
      //-------------------------------

      // this door makes the game go to a scene 2
      this.door = this.physics.add.sprite(150, 150, 'door',0);
      this.door.setImmovable();
      // this.physics.add.overlap(this.player, this.door, this.callNewScene, false, this);
      this.physics.add.collider(this.player, this.door, this.callNewScene, false, this);
    },

    callNewScene: function() {
      console.log(' - Starting the World Scene');
      // this.cameras.main.shake(150);
      // calling the first scene
      // setTimeout(() => {
        this.scene.start('WorldScene')
      // }, 150)
    },

    update: function (time, delta)
    {
      this.player.body.setVelocity(0);
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
