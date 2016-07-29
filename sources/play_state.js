var PlayState = {
	create: function() {
		var monsters = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3];
		level = new Level(9, 9, monsters);
		board = new Board(level);

		board.enter();

		game.input.onTap.add(this.onTap, this);
	},

	onTap: function(pointer, doubleTap) {
		board.tap(pointer.x, pointer.y);
	}
}