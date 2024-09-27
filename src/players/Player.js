
export default class Player extends Phaser.Physics.Arcade.Sprite {
   
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // this.setSize(2, 2);
        // this.setOffset(15, 15);
        this.name = "main char"
        this.createAnims()
        //this.enableBody()
        
        // collected itens (?)
        // this.hasBag = false
    }

    createAnims() {
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
    }

    // this function updates the player's position (movement)
    updatePlayer(cursors)
    {
        // Horizontal movement
        if (cursors.left.isDown) {
            this.body.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(160);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.body.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(160);
        }

        // Update the animation last and give left/right animations
        // precedence over up/down animations
        if (cursors.left.isDown) {
            this.anims.play('left', true);
            this.flipX = false;
        } else if (cursors.right.isDown) {
            this.anims.play('right', true);
            this.flipX = false;
        } else if (cursors.up.isDown) {
            this.anims.play('up', true);
        } else if (cursors.down.isDown) {
            this.anims.play('down', true);
        } else {
            this.anims.stop();
        }
    }

}