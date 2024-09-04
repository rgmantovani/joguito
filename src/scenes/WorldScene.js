// -------------------------------------------------
// Scene: Main Scene - World
// -------------------------------------------------

var WorldScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function WorldScene ()
  {
    console.log(' - WorldScene: constructor');
    Phaser.Scene.call(this, { key: 'WorldScene' });
  },

  preload: function ()
  {

  },

  create: function ()
  {
    // create the map
    var map = this.make.tilemap({ key: 'utfmap' });

    // first parameter is the name of the tilemap in tiled
    var tiles = map.addTilesetImage('reduced', 'reduced');

    // creating the layers
    var grassMainMap = map.createLayer('Grass', tiles, 0, 0);
    var obstaclesMainMap = map.createLayer('Buildings', tiles, 0, 0);

    // make all tiles in obstacles collidable
    obstaclesMainMap.setCollisionByExclusion([-1]);

    // -------------------------------
    // adding background music
    // -------------------------------
    this.music = this.sound.add('backgroundSong');
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek:0,
      loop: true,
      delay: 0
    }
    // start playing music
    this.music.play(musicConfig); 

    // -------------------------------
    // -------------------------------

   
    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [3, 4, 5, 4]}),
      frameRate: 10,
      repeat: -1
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 7] }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [9, 10, 11, 10]}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2, 1 ] }),
      frameRate: 10,
      repeat: -1
    });

    //-------------------------------
    // Adding the main char
    //-------------------------------

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(50, 100, 'player', 0);

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on obstacles
    this.physics.add.collider(this.player, obstaclesMainMap);

    //-------------------------------
    // Adding the main char
    //-------------------------------

    // Adding door
    this.door = this.physics.add.sprite(240, 205, '', 0);
    this.door.setImmovable();

    //-------------------------------
    // Adding some NPCs
    //-------------------------------

    // NPC animation
    this.anims.create({
      key: 'walkingMode',
      frames: this.anims.generateFrameNumbers('npcs', { frames: [ 0, 1, 2, 1] }),
      frameRate: 5,
      repeat: -1
    });

    // where the NPCs will be placed
    // setImmovable prevents the npc to be pushed
    // TODO: use array to control NPCs of the same type
    this.npc1 = this.physics.add.sprite(100, 100, 'npcs', 0).setImmovable();
    this.npc2 = this.physics.add.sprite(330, 200, 'npcs', 0).setImmovable();
    this.npc3 = this.physics.add.sprite(180, 300, 'npcs', 0).setImmovable();

    // dont walk on npcs
    this.physics.add.collider(this.player, this.npc1);
    this.physics.add.collider(this.player, this.npc2);
    this.physics.add.collider(this.player, this.npc3);

    //-------------------------------
    // Limit camera to map
    //-------------------------------

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    //-------------------------------
    // Controlling player with the keyboard
    //-------------------------------
    this.cursors = this.input.keyboard.createCursorKeys();

    //-------------------------------
    // changing Scenes
    //-------------------------------

    // this door makes the game go to a scene 2
    this.physics.add.overlap(this.player, this.door, this.callBlocoASecene, false, this);
    // this door makes the game go to a scene 3
    // this.physics.add.overlap(this.player, this.door2, this.callThirdScene, false, this);
  },

  // TODO: there must be some way to pass parameters/objects to generalize
  // these functions
  callBlocoASecene: function() {
    if(this.cursors.space.isDown) {
      console.log(' - Starting the BlocoA Scene');
      // this.music.stop("backgroundSong");
        this.scene.switch('BlocoAScene');
    }
  },

  update: function (time, delta)
  {
    this.player.body.setVelocity(0);
    this.updatePlayer();
    this.updateNPCs();
  },

  updateNPCs: function()
  {
    this.npc1.anims.play('walkingMode', true);
    this.npc2.anims.play('walkingMode', true);
    this.npc3.anims.play('walkingMode', true);
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
export default WorldScene;

// -------------------------------------------------
// -------------------------------------------------
