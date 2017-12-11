/* global game phaser game_state Phaser*/
/* global localStorage */

/*
To Do:
Add custom textures (unlocked at levels)
Mouse clicking
MOAR LEVELS
shooting maybe
keys to change mode, go through certain blocks
music
*/
game_state.title = function () {};
game_state.title.prototype = {

	preload: function() {

	},

    create: function() {
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        game.stage.backgroundColor = '#1cafff';

        if (localStorage.level === undefined) {
            localStorage.level = 1;
        }

        this.selectedLevel = localStorage.level;

        this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
				this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
				this.down2 = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.up2 = game.input.keyboard.addKey(Phaser.Keyboard.UP);
				this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
				this.left2 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right2 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.zero = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        this.t = game.input.keyboard.addKey(Phaser.Keyboard.T);

        if (localStorage.skinOn !== "On" && localStorage.skinOn !== "Off") {
            localStorage.skinOn = "Off";
        }
        if (localStorage.finished !== "true") {
            localStorage.skinOn = "Off";
        }
        this.words;

        var style = {
            font: "bold 32px Arial", fill: "#ffffff", align: "center",
        };
        this.text = game.add.text(200, 200, "You're not supposed to see this ._." , style);
        this.text.position.x = 400 - this.text.width / 2;
        this.text.position.y = 300 - this.text.height / 2;
        // text.setTextBounds(0, 100, 800, 100);
    },

    update: function() {
        if (this.enter.isDown) {
            localStorage.playingLevel = this.selectedLevel;
            game.state.start('play');
        }
        if (this.up.isDown || this.up2.isDown || this.right.isDown || this.right2.isDown) {
            if (this.upWasDown === false) {
                this.selectedLevel++;
                this.upWasDown = true;
            }
        }
        if (this.down.isDown || this.down2.isDown || this.left.isDown || this.left2.isDown) {
            if (this.downWasDown === false) {
                this.selectedLevel--;
                this.downWasDown = true;
            }
        }
        if (this.up.isUp && this.up2.isUp && this.right.isUp && this.right2.isUp) {
            this.upWasDown = false;
        }
        if (this.down.isUp && this.down2.isUp && this.left.isUp && this.left2.isUp) {
            this.downWasDown = false;
        }
        if (this.t.isDown && localStorage.finished === "true") {
            if (this.TWasDown === false && localStorage.skinOn === "Off") {
                localStorage.skinOn = "On";
                this.TWasDown = true;
            } else
            if (this.TWasDown === false && localStorage.skinOn === "On") {
                localStorage.skinOn = "Off";
                this.TWasDown = true;
            }
        }
        if (this.t.isUp) {
            this.TWasDown = false;
        }
        if (this.zero.isDown && localStorage.finished === "true") {
            localStorage.finished = false;
            localStorage.level = 1;
            localStorage.skinOn = false;
        }
        if (this.selectedLevel < 1) {
            this.selectedLevel = 1;
        }
        if (this.selectedLevel > localStorage.level) {
            this.selectedLevel = localStorage.level;
        }
				if (localStorage.finished === "true") {
            this.text.text = "Press enter to start level "  + this.selectedLevel + "\nWASD or Arrow Keys to change level \nPress 0 to reset the game. \nToggle Skin with T. \nChallenge Skin: " + localStorage.skinOn + "\n\nMade by Louis";
            this.text.position.y = 75;
        } else {
            this.text.text = "Press enter to start level "  + this.selectedLevel + "\nWASD or Arrow Keys to change level \n\nMade by Louis";
            this.text.position.x = 400 - this.text.width / 2;
            this.text.position.y = 300 - this.text.height / 2;
        }
    },
};
game.state.add('title', game_state.title);
game.state.start('title');
