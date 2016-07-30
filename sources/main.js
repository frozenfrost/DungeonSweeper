var CellObject = {
	Entrance: -1,
	Exit: -2
}
var CellMark = {
	InSight: -1,
	Unseen: -2
}

var TILE_SIZE = 32;

var game;
var board;
var level;
var player;

window.onload = function() {
	//game = new Phaser.Game(32 * 9, 32 * 11, Phaser.AUTO, "", BootState);
	game = new Phaser.Game(1366, 768, Phaser.AUTO, "", BootState);
}
