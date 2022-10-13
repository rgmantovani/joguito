// -------------------------------------------------
// Scene: Menu opções
// -------------------------------------------------

var MenuOp = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function MenuOp() {
    console.log(' - Menu: constructor');
    Phaser.Scene.call(this, { key: 'MenuOp' });
  },

  preload: function () {

  },

  create: function () {

    this.add.text(110, 10, "MENU...");
    this.add.text(110, 70, 'MUTE'); //mute
    this.add.text(110, 100, '<'); // controle volume (-)
    this.add.text(130, 100, '>'); // controle volmue (+)
    this.add.text(110, 160, 'EXIT').setInteractive().on('pointerdown', () => this.scene.switch('Begin')); //sair para inicio  
    this.add.text(110, 130, 'VOLTAR').setInteractive().on('pointerdown', () => this.scene.switch('WorldScene')); //voltar para scene map

  },


});

// exporting variable, this way it is accessed out of this file 
export default MenuOp;

