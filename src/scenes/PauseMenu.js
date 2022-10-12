var PauseMenu = new Phaser.Class({
	Extends: Phaser.Scene,

	cursors: null,

	buttons: Phaser.GameObjects.Image = [],
	selectedButtonIndex: 0,
	buttonSelector: Phaser.GameObjects.Image,

	initialize: function PauseMenu() {
		Phaser.Scene.call(this, { key: 'PauseMenu' });
	},

	preload() {
		this.load.image('glass-panel', 'assets/glassPanel.png')
		this.load.image('cursor-hand', 'assets/cursor_hand.png')
	},

	init(data) {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.backScene = data.backScene;
	},

	create() {
		const { width, height, zoom } = this.scale;

		const resumeButton = this.add.image((width/zoom)* 0.5, (height/zoom) * 0.5, 'glass-panel')
										.setName('resumeButton')
										.setDisplaySize(150, 50);
		this.add.text(resumeButton.x, resumeButton.y, 'Resume').setOrigin(0.5);

		const settingsButton = this.add.image(resumeButton.x, resumeButton.y + resumeButton.displayHeight + 10, 'glass-panel')
										.setName('settingsButton')
										.setDisplaySize(150, 50);
		this.add.text(settingsButton.x, settingsButton.y, 'Settings').setOrigin(0.5);

		this.buttons.push(resumeButton);
		this.buttons.push(settingsButton);

		this.buttonSelector = this.add.image(0, 0, 'cursor-hand');

		this.selectButton(0);

		resumeButton.on('selected', () => {
			this.scene.stop(this);
			this.scene.resume(this.backScene);
		}, this);
	},

	selectButton(index) {
		if (index < 0 || index > this.buttons.length) return;

		const button = this.buttons[index];

		this.buttons.forEach((button) => { button.clearTint(); });
		button.setTint(0x66ff7f);

		this.buttonSelector.x = button.x + button.displayWidth * 0.5;
		this.buttonSelector.y = button.y + 10;

		this.selectedButtonIndex = index;
	},

	selectNextButton(change = 1) {
		this.selectButton((this.selectedButtonIndex + change) % this.buttons.length);
	},

	confirmSelection() {
		const button = this.buttons[this.selectedButtonIndex];

		button.emit('selected');
	},

	update() {
		const upButtonPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
		const downButtonPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down);
		const spaceButtonPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

		if (upButtonPressed) this.selectNextButton(-1);
		if (downButtonPressed) this.selectNextButton(1);
		if (spaceButtonPressed) this.confirmSelection();
	}
});

export default PauseMenu;