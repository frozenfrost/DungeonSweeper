var LoadState = {

	loadBar: null,
	loadText: null,

	init: function() {
		game.load.onFileComplete.add(this.fileComplete, this);
		game.load.onLoadComplete.add(this.loadComplete, this);
	},

	create: function() {
		game.load.image("wall", "assets/images/wall.png");
		game.load.image("gold", "assets/images/gold.png");
		game.load.image("floor", "assets/images/floor.png");
		game.load.image("skeleton", "assets/images/skeleton.png");
		game.load.image("stairs_up", "assets/images/stairs_up.png");
		game.load.image("stairs_down", "assets/images/stairs_down.png");

		game.load.start();
	},

	fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
	},

	loadComplete: function() {
		game.state.start("play");
	}
}