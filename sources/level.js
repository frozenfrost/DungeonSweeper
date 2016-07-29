var Level = function(width, height, monsters) {
	this.width = width;
	this.height = height;

	this.cells = new Array(width * height);
	for (var i in this.cells)
		this.cells[i] = null;

	//this.sprinkle(items);
	//this.spawn(monsters);
	this.sprinkle(monsters);
	this.place(CellObject.Entrance);
}

Level.prototype.place = function(object) {
	var x, y;
	do {
		x = Tool.random(0, this.width - 1);
		y = Tool.random(0, this.height - 1);
	} while (this.cells[x + y * this.width]);
	this.cells[x + y * this.width] = object;
}

Level.prototype.sprinkle = function(objects) {
	for (var i = 0; i < objects.length; i++)
		this.place(objects[i]);
}

Level.prototype.spawn = function(monsters) {
}