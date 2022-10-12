// -------------------------------------------------
// -------------------------------------------------

import BootScene from './scenes/BootScene.js'
import WorldScene from './scenes/WorldScene.js'
import SecondScene from './scenes/SecondScene.js'
import ThirdScene from './scenes/ThirdScene.js'
import PauseMenu from './scenes/PauseMenu.js'

// -------------------------------------------------
// -------------------------------------------------

function getZoomValue() {
  var w = window.innerWidth
  var h = window.innerHeight

  var zoom = 2;

  switch (true) {
    case (((w/1920 > 1) && (w/1920 < 2)) && ((h/1280 > 1) && (h/1280 < 2))):
      zoom = 3
      break
    case ((w/1920 > 2) && (h/1280 > 2)):
      zoom = 4
      break
  }
  
  return zoom
}

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: window.innerWidth,
  height: window.innerHeight,
  zoom: getZoomValue(),
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
    SecondScene,    // a second scene to make a transition
    ThirdScene,     // a second scene to make a transition  
    PauseMenu,      // the pause menu with basic functionalities
  ]
};

var game = new Phaser.Game(config);

// -------------------------------------------------
// -------------------------------------------------
