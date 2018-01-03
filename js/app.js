/* app.js
 * version 1.0
 * comments on russian, sorry ¯\_(ツ)_/¯ 
 */
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
	Entity.call(this);                                        // получить свойста родительского класса
	this.x = engineTiles.getPxFromTileXPlayer(5);             // установить стартовую позицию по оси X на 5ый тайл
    this.y = engineTiles.getPxFromTileYPlayer(6);             // установить стартовую позицию по оси Y на 6ый тайл
    this.playerTile = 56;                                     // установить текущий тайл как 'стартовый' тайл (с номером 56)
    this.sprites = sprites;                                   // список доступных графических тайлов игроков
    this.sprite = engineTiles.playerSprite(this.sprites);     // рандомно установить графический тайл игрока
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function(key) {
	switch(key) {
        case 'left':
        case 'right':
            this.x = engineTiles.moveToTileXPlayer(key, this.x);
            break;
        case 'up':
        case 'down':
            this.y = engineTiles.moveToTileYPlayer(key, this.y);
            break;
    }
    var tileX = engineTiles.getTileFromPxXPlayer(this.x);  // получить текущий занимемый Игроком тайл по оси Х
    var tileY = engineTiles.getTileFromPxYPlayer(this.y);  // получить текущий занимемый Игроком тайл по оси Y
    this.playerTile = tileX+''+tileY;                      // установить текущий занимемый Игроком тайл
    if (tileY == 1) {                                      // если тайл это 'вода' (тайл по Y номер один), то перезапустить игрока
        player.win();
    }
}
Player.prototype.update = function(dt) {
}
Player.prototype.restart = function() {
	this.x = engineTiles.getPxFromTileXPlayer(5);  // установить стартовую позицию по оси X на 5-ый 'стартовый' тайл
	this.y = engineTiles.getPxFromTileYPlayer(6);  // установить стартовую позицию по оси Y на 6-ый 'стартовый' тайл
	this.playerTile = 56;                          // установить текущий тайл как 'стартовый' тайл (с номером 56)
}
Player.prototype.win = function() {
	this.sprite = engineTiles.playerSprite(this.sprites);  // рандомно установить графический тайл игрока
    this.restart();
}
Player.prototype.lose = function() {
	this.restart();
}



// Now instantiate objects.
var allEnemies = [
    new Enemy(0, 2, 6),
    new Enemy(0, 3, 6),
    new Enemy(0, 4, 6),
    new Enemy(-2, 2, 8),
];

var player = new Player([
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
]);



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
