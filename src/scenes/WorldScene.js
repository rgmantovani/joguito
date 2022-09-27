// -------------------------------------------------
// Scene: Main Scene - World
// -------------------------------------------------

var WorldScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function WorldScene ()
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
    var map = this.make.tilemap({ key: 'map' });

    // first parameter is the name of the tilemap in tiled
    var tiles = map.addTilesetImage('spritesheet', 'tiles');

    // creating the layers
    var grass = map.createLayer('Grass', tiles, 0, 0);
    var obstacles = map.createLayer('Obstacles', tiles, 0, 0);

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
    this.music.play(musicConfig); // start playing music
    // -------------------------------
    // -------------------------------

    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
      frameRate: 10,
      repeat: -1
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
      frameRate: 10,
      repeat: -1
    });

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(50, 100, 'player', 2);

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on trees
    this.physics.add.collider(this.player, obstacles);

    //-------------------------------
    // Adding some NPCs
    //-------------------------------

    // NPC animation
    this.anims.create({
      key: 'walkingMode',
      frames: this.anims.generateFrameNumbers('npcs', { frames: [ 21, 27, 21, 33] }),
      frameRate: 5,
      repeat: -1
    });

    // where the NPCs will be placed
    //  setImmovable prevents the npc to be pushed
    // TODO: use array to control NPCs of the same type
    this.npc1 = this.physics.add.sprite(100, 100, 'npcs', 27).setImmovable();
    this.npc2 = this.physics.add.sprite(330, 200, 'npcs', 21).setImmovable();
    this.npc3 = this.physics.add.sprite(180, 300, 'npcs', 21).setImmovable();

    // dont walk on npcs
    // this.npcsGroup = game.add.group();
    // this.npcsGroup.add(this.npc1);
    // this.npcsGroup.add(this.npc2);
    // this.npcsGroup.add(this.npc3);
    // this.game.physics.arcade.collide(this.player, this.npcsGroup);

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

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

    //-------------------------------
    // Adding a door to a new scene
    //-------------------------------

    // this door makes the game go to a scene 2
    this.door = this.physics.add.sprite(9, 150, 'door',0);
    this.door.setImmovable();
    // this.physics.add.collider(this.player, this.door);
    // this.physics.add.overlap(this.player, this.door, this.callNewScene, false, this);
    this.physics.add.collider(this.player, this.door, this.callNewScene, false, this);
  },

  callNewScene: function() {
    console.log(' - Starting the Second Scene');
    // this.cameras.main.shake(150);
    // this.music.stop("backgroundSong");
    this.sound.removeByKey('backgroundSong');
    // calling the second scene
    // setTimeout(() => {
      this.scene.start('SecondScene')
    // }, 150)
  },

  update: function (time, delta)
  {
    // updatePlayer();
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

    // updateNPCs();
    this.npc1.anims.play('walkingMode', true);
    this.npc2.anims.play('walkingMode', true);
    this.npc3.anims.play('walkingMode', true);
  },
});

// exporting variable, this way it is accessed out of this file
export default WorldScene;

// -------------------------------------------------
// -------------------------------------------------
