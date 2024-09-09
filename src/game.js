// -------------------------------------------------
// -------------------------------------------------

import BootScene from './scenes/BootScene.js'
import WorldScene from './scenes/WorldScene.js'
import BlocoAScene from './scenes/BlocoAScene.js'
import BlocoBScene from './scenes/BlocoBScene.js'
import BlocoCScene from './scenes/BlocoCScene.js'
import BlocoDScene from './scenes/BlocoDScene.js'

// -------------------------------------------------
// -------------------------------------------------

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width:  640,
  height: 480,
  zoom: 1,
  pixelArt: true,
  physics: {
    default: 'arcade', 
    arcade: {
      gravity: { y: 0 },
      debug: false // set to true to view zones
    }
  },
  // all the possible scenes
  scene: [
    BootScene,      // just load the asses and call the main scene
    WorldScene,     // the main scene, exploring the map
    BlocoAScene,    // 
    BlocoBScene,    //  
    BlocoCScene,    //  
    BlocoDScene,    //  
  ]
};
var game = new Phaser.Game(config);

// -------------------------------------------------
// -------------------------------------------------
