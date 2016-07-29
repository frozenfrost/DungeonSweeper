var BootState = {
	preload: function() {
		//game.load.spritesheet("boot");
	},

	create: function() {
		game.state.add("load", LoadState);
		//game.state.add("home", HomeState);
		game.state.add("play", PlayState);
		game.state.start("load");
	}
}