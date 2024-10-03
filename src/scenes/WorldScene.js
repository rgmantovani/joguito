// -------------------------------------------------
// Scene: Main Scene - World
// -------------------------------------------------

import Player from '../players/Player.js'

// -------------------------------------------------
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
    var tiles1 = map.addTilesetImage('poke1');
    var tiles2 = map.addTilesetImage('poke2');
    var tiles4 = map.addTilesetImage('poke4');
    var tiles5 = map.addTilesetImage('poke5');
    var tiles8 = map.addTilesetImage('poke8');
    
    // creating the layers
    var grass     = map.createLayer('Grass', tiles2, 0, 0);
    var fences    = map.createLayer('Fences', tiles5, 0, 0);
    var paths     = map.createLayer('Paths', tiles4, 0, 0);
    var paths2    = map.createLayer('Paths2', tiles4, 0, 0);
    var trees     = map.createLayer('Trees', tiles1, 0, 0);
    var trees2    = map.createLayer('Trees2', tiles1, 0, 0);
    var objects   = map.createLayer('Objects', tiles5, 0, 0);
    var buildings = map.createLayer('Buildings', tiles8, 0, 0);
   
    // make all tiles in obstacles collidable
    buildings.setCollisionByExclusion([-1]);
    fences.setCollisionByExclusion([-1]);
    trees.setCollisionByExclusion([-1]);
    objects.setCollisionByExclusion([-1]);

    // -------------------------------
    // adding background music
    // -------------------------------
    this.music = this.sound.add('backgroundSong');
    var musicConfig = { 
      mute: false, volume: 1, rate: 1, detune: 0,
      seek:0, loop: true, delay: 0
    }
    // start playing music
    // this.music.play(musicConfig); 

    //-------------------------------
    // Adding the main char
    //-------------------------------

    // Controlling player with the keyboard
    this.cursors = this.input.keyboard.createCursorKeys();

    // our player sprite created through the physics system
    this.player = new Player(this, 520, 880, 'player', 0);
    this.physics.add.existing(this.player, false)
    
    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
   
    this.player.body.setCollideWorldBounds(true);
    this.add.existing(this.player)

    // don't walk on obstacles
    this.physics.add.collider(this.player, buildings);
    this.physics.add.collider(this.player, fences);
    this.physics.add.collider(this.player, trees);
    this.physics.add.collider(this.player, objects);
     
    //-------------------------------
    // Adding doors
    //-------------------------------

    this.doorA = this.physics.add.sprite(363, 855, '', 0);
    this.doorA.setImmovable();
    
    this.doorB = this.physics.add.sprite(363, 565, '', 0);
    this.doorB.setImmovable();
    
    this.doorC = this.physics.add.sprite(675, 530, '', 0);
    this.doorC.setImmovable();

    this.doorD = this.physics.add.sprite(675, 855, '', 0);
    this.doorD.setImmovable();

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
    this.npc1 = this.physics.add.sprite(500, 550, 'npcs', 0).setImmovable();
    this.npc2 = this.physics.add.sprite(330, 850, 'npcs', 0).setImmovable();
    this.npc3 = this.physics.add.sprite(700, 850, 'npcs', 0).setImmovable();

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
    // changing Scenes
    //-------------------------------

    this.physics.add.overlap(this.player, this.doorA, this.callBlocoAScene, false, this);
    this.physics.add.overlap(this.player, this.doorB, this.callBlocoBScene, false, this);
    this.physics.add.overlap(this.player, this.doorC, this.callBlocoCScene, false, this);
    this.physics.add.overlap(this.player, this.doorD, this.callBlocoDScene, false, this);
 
  },

  // TODO: there must be some way to pass parameters/objects to generalize
  // these functions
  callBlocoAScene: function() {
    if(this.cursors.space.isDown) {
      console.log(' - Starting the BlocoA Scene');
        this.scene.switch('BlocoAScene');
    }
  },

  callBlocoBScene: function() {
    if(this.cursors.space.isDown) {
      console.log(' - Starting the BlocoB Scene');
        this.scene.switch('BlocoBScene');
    }
  },

  callBlocoCScene: function() {
    if(this.cursors.space.isDown) {
      console.log(' - Starting the BlocoC Scene');
        this.scene.switch('BlocoCScene');
    }
  },

  callBlocoDScene: function() {
    if(this.cursors.space.isDown) {
      console.log(' - Starting the BlocoD Scene');
        this.scene.switch('BlocoDScene');
    }
  },

  update: function (time, delta)
  {
    this.player.body.setVelocity(0);
    this.player.updatePlayer(this.cursors);
    this.updateNPCs();
  },

  updateNPCs: function()
  {
    this.npc1.anims.play('walkingMode', true);
    this.npc2.anims.play('walkingMode', true);
    this.npc3.anims.play('walkingMode', true);
  },

});

// exporting variable, this way it is accessed out of this file
export default WorldScene;

// -------------------------------------------------
// -------------------------------------------------
