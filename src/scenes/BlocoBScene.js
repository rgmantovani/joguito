// -------------------------------------------------
// BlocoB Scene
// -------------------------------------------------

var BlocoBScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BlocoBScene ()
    {
        Phaser.Scene.call(this, { key: 'BlocoBScene' });
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
      var tiles = map.addTilesetImage('reduced', 'reduced');

      // creating the layers
      var floorB  = map.createLayer('Floor', tiles, 0, 0);
      var wallsB  = map.createLayer('Walls', tiles, 0, 0);
      var doorsB  = map.createLayer('Doors', tiles, 0, 0);

      
      //-------------------------------
      // Adding a door to a new scene
      //-------------------------------

      // this door makes the game go to a main scene
        this.doorMain = this.physics.add.sprite(470, 650, '', 0);
        this.doorMain.setImmovable();

      //-------------------------------
      // Adding the main char
      //-------------------------------

      // our player sprite created through the phycis system
      this.player = this.physics.add.sprite(470, 650, 'player', 0);

      // don't go out of the map
      this.physics.world.bounds.width  = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;
      this.player.setCollideWorldBounds(true);

      // don't walk on walls
      wallsB.setCollisionByExclusion([-1]);
      this.physics.add.collider(this.player, wallsB);

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
export default BlocoBScene;

// -------------------------------------------------
// -------------------------------------------------
