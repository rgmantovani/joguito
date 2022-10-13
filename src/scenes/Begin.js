// -------------------------------------------------
// Scene: Tela inicial
// -------------------------------------------------

var Begin = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Begin() {
    console.log(' - Begin: constructor');
    Phaser.Scene.call(this, { key: 'Begin' });
  },

  preload: function () {

  },

  create: function () {



    // -------------------------------------------------
    // tela inicial só pra ter uma ideia 
    // -------------------------------------------------

    this.add.text(130, 100, 'START...').setInteractive().on('pointerdown', () => this.scene.start('WorldScene'))

  },


});

// exporting variable, this way it is accessed out of this file 
export default Begin;

