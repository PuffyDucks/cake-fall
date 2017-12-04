/* global game phaser game_state Phaser*/ 


game_state.title = function () {};
game_state.title.prototype = {

	preload: function() {
	    
	},

    create: function() {
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.down = game.input.keybaord.addKey(Phaser.Keyboard.S);
    },

    update: function() {
        if (this.left.isDown || this.right.isDown) {
            game.state.start('play');
        }
        if (this.down.isDown) {
            game.state.start('play');
        }
    },
};
game.state.add('title', game_state.title);
game.state.start('title');