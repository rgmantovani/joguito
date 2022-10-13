// -------------------------------------------------
// -------------------------------------------------

import BootScene from './scenes/BootScene.js'
import Begin from './scenes/Begin.js'
import WorldScene from './scenes/WorldScene.js'
import SecondScene from './scenes/SecondScene.js'
import ThirdScene from './scenes/ThirdScene.js'
import MenuOp from './scenes/MenuOp.js'


// -------------------------------------------------
// -------------------------------------------------

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true // set to true to view zones
    }
  },
  // all the possible scenes
  scene: [         
    BootScene,      // just load the asses and call the main scene
    Begin,          // start game
    WorldScene,     // the main scene, exploring the map
    SecondScene,    // a second scene to make a transition
    ThirdScene,     // a second scene to make a transition  
    MenuOp,         //  menu options
  ]
};
var game = new Phaser.Game(config);

// -------------------------------------------------
// -------------------------------------------------
