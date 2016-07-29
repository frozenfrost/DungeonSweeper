var directions = {
	up: { x: 0, y: -1 },
	down: { x: 0, y: 1 },
	left: { x: -1, y: 0 },
	right: { x: 1, y: 0 },
	upLeft: { x: -1, y: -1 },
	upRight: { x: 1, y: -1 },
	downLeft: { x: -1, y: 1 },
	downRight: { x: 1, y: 1 }
}

var Board = function(level) {
	this.cells = level.cells;
	this.width = level.width;
	this.height = level.height;

	var sum = this.width * this.height;
	this.marks = new Array(sum);
	this.texts = new Array(sum);
	this.tiles = new Array(sum);
	this.detectList = new Array();

	for (var i = 0; i < sum; i++) {
		this.marks[i] = CellMark.Unseen;
		(this.tiles[i] = game.add.sprite(i % this.width * TILE_SIZE, Math.floor(i / this.width) * TILE_SIZE, "wall")).alpha = 0.5;
	}
}

Board.prototype.enter = function() {
	for (var x = 0; x < this.width; x++) {
		for (var y = 0; y < this.height; y++) {
			var p = x + y * this.width;
			if (this.cells[p] == CellObject.Entrance) {
				this.openCell(x, y);
				return;
			}
		}
	}
}

Board.prototype.hasCell = function(x, y) {
	return x >= 0 && x < this.width && y >= 0 && y < this.height;
}

Board.prototype.openCell = function(x, y) {
	game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, "floor");

	var p = x + y * this.width;
	this.tiles[p].destroy();
	this.tiles[p] = null;
	this.marks[p] = 0;

	if (this.cells[p] == 1) {//test monster
		game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, "skeleton");

		this.cells[p] = null;
		for (var i in directions) {
			var ix = x + directions[i].x;
			var iy = y + directions[i].y;
			var ip = ix + iy * this.width;
			if (this.hasCell(ix, iy) && this.marks[ip] > 0) {
				this.marks[ip] = 0;
				this.texts[ip].destroy();
				this.detectList.push({x: ix, y: iy});
			}
		}
	}
	else if (this.cells[p] == 2)
		game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, "gold");
	else if (this.cells[p] == 3)
		game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, "stairs_down");

	this.detectList.push({x: x, y: y});
	this.detectNext();
}

Board.prototype.detectNext = function() {
	var cell = this.detectList.shift();
	if (cell == undefined) return;

	var x = cell.x;
	var y = cell.y;
	var p = x + y * this.width;
	var mark = 0;

	for (var i in directions) {
		var ix = cell.x + directions[i].x;
		var iy = cell.y + directions[i].y;
		if (this.hasCell(ix, iy) && this.cells[ix + iy * this.width] == 1)//test monster
			mark++;
	}
	this.marks[p] = mark;

	if (mark == 0)
		this.openAround(x, y);
	else {
		for (var i in directions) {
			var ix = x + directions[i].x;
			var iy = y + directions[i].y;
			var ip = ix + iy * this.width;
			if (this.hasCell(ix, iy) && this.marks[ip] == CellMark.Unseen) {
				this.marks[ip] = CellMark.InSight;
				this.tiles[ip].alpha = 1;
			}
		}

		this.texts[x + y * this.width] = game.add.text(x * TILE_SIZE, y * TILE_SIZE, mark);
	}

	this.detectNext();
}

Board.prototype.openAround = function(x, y) {
	for (var i in directions) {
		var ix = x + directions[i].x;
		var iy = y + directions[i].y;
		var ip = ix + iy * this.width;
		if (this.hasCell(ix, iy) && this.marks[ip] < 0)
			this.openCell(ix, iy);
	}
}

Board.prototype.tap = function(x, y) {
	x = Math.floor(x / 32);
	y = Math.floor(y / 32);
	if (this.hasCell(x, y) && this.marks[x + y * this.width] == CellMark.InSight)
		this.openCell(x, y);
	else if (this.hasCell(x, y) && this.marks[x + y * this.width] >= 0 && this.cells[x + y * this.width] == 3)
		game.state.start("play");
}