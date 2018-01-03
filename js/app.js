var Entity = function() {
	this.x = 0;
	this.y = 0;
    this.visible = true;
	this.sprite = '';
}
Entity.prototype.render = function() {
	if (this.visible) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Entity.prototype.restart = function() {
	this.x = 0;
	this.y = 0;
}



var Enemy = function(startTileX, startTileY, finishTileX) {
    Entity.call(this);                                               // получить свойста родительского класса
    this.startTileX  = startTileX;                                   // номер стартового тайла по оси Х
    this.startTileY  = startTileY;                                   // номер стартового тайла по оси Y
    this.finishTileX = finishTileX;                                  // номер конечного тайла по оси Х
	this.x      = engineTiles.getPxFromTileXEnemy(this.startTileX);  // установить стартовую позицию по оси X по номеру тайла
    this.y      = engineTiles.getPxFromTileYEnemy(this.startTileY);  // установить стартовую позицию по оси Y по номеру тайла
	this.speed  = Math.floor(Math.random() * (700 - 100)) + 100;     // установить случайную начальную скорость
	this.sprite = 'images/enemy-bug.png';                            // установить графический тайл
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
	this.x        = this.x + (this.speed * dt);              // сдвинуть врага + модификатор скорости * тик
    var tileFront = engineTiles.getFrontTileXEnemy(this.x);  // посчитать передний тайл X врага
    var tileY     = engineTiles.getFrontTileYEnemy(this.y);  // посчитать Y тайл врага
    var tileBack  = tileFront>1 ? tileFront-1 : 0;           // посчитать задний тайл врага
    // не отрисовывать спрайт врага если его не видно (т.е. его тайлы находяться вне игрового полотна)
    this.visible  = (tileBack >= 6 || tileFront < 1) ? false : true;
    // если задний тайл врага скрылся из виду, то перезапустить врага с новой скоростью
    if (tileBack >= this.finishTileX)  {
        this.speed = Math.floor(Math.random() * (700 - 100)) + 100;
        this.x = engineTiles.getPxFromTileXEnemy(this.startTileX);
    }
    // player restart
    // если 'передний' тайл врага совпадает с тайлом игрока - перезапустить игрока
    if (player.playerTile == tileFront+''+tileY) {
        player.lose();
    }
    // если 'зайдний' тайл врага совпадает с тайлом игрока и при этом враг 
    // большей своей частью все еще находится в тайле - перезапустить игрока
    if (player.playerTile == tileBack+''+tileY && !(engineTiles.moreHalfTileX(this.x))) {
        player.lose();
    }
}



var Player = function(sprites) {
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function(key) {
}
Player.prototype.update = function(dt) {
}
Player.prototype.restart = function() {
}
Player.prototype.win = function() {
}
Player.prototype.lose = function() {
}



// Now instantiate objects.
var allEnemies = [];

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
