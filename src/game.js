// -------------------------------------------------
// -------------------------------------------------

import BootScene from './scenes/BootScene.js'
import WorldScene from './scenes/WorldScene.js'
import SecondScene from './scenes/SecondScene.js'
import ThirdScene from './scenes/ThirdScene.js'

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
    WorldScene,     // the main scene, exploring the map
    SecondScene,    // a second scene to make a transition
    ThirdScene,     // a second scene to make a transition  
  ]
};
var game = new Phaser.Game(config);

// -------------------------------------------------
// -------------------------------------------------
