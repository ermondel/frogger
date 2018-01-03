var Entity = function() {
}
Entity.prototype.render = function() {
}
Entity.prototype.restart = function() {
}



var Enemy = function(startTileX, startTileY, finishTileX) {
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
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
