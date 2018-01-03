/* etiles.js
 * Слой над Engine.js для трансляции px в тайлы и наоборот.
 * прим.: размеры игрового полотна 505px x 606px
 *
 */
var engineTiles = {

    /* Получить номер тайла по значению в px по оси Х
     * 
     */
    getTileFromPxXPlayer: function (x) {
		// tile width is 101 px
		// ((current position + offset) / tile width) + <counting tiles is from one>
		return (((x + 0) / 101) + 1);
	},

    /* Получить номер тайла по значению в px по оси Y
     * 
     */
    getTileFromPxYPlayer: function (y) {
        // tile height is 83 px
        // ((current position + offset) / tile height) + <counting tiles is from one>
        return (((y + 29) / 83) + 1);
    },

    /* Получить для Игрока по оси X по номеру тайла значение этого тайла в px
     * 
     */
    getPxFromTileXPlayer: function (x) {
        // tile width is 101 px
        // 
        return (((x-1) * 101) - 0);
    },

    /* Получить для Игрока по оси Y по номеру тайла значение этого тайла в px
     * 
     */
    getPxFromTileYPlayer: function (y) {
        // tile height is 83 px
        // 
        return (((y-1) * 83) - 29);
    },

    /* Получить для Врага по оси X по номеру тайла значение этого тайла в px
     * 
     */
    getPxFromTileXEnemy: function (x) {
        // tile width is 101 px
        // 
        return (((x-1) * 101) - 0);
    },

    /* Получить для Врага по оси Y по номеру тайла значение этого тайла в px
     * 
     */
    getPxFromTileYEnemy: function (y) {
        // tile height is 83 px
        // 
        return (((y-1) * 83) - 23);
    },

    /* Переместить по значению в px на один тайл влево или вправо по оси X
     * 
     */
    moveToTileXPlayer: function (key, x) {
        // tile width is 101 px
        switch(key) {
            // тайлов по ширине только 5-ть,
            // тайлы меньше 1-го не действуют.
            case 'left':
                var xx = x - 101;
                return (engineTiles.getTileFromPxXPlayer(xx)>0 ? xx : x);
            // тайлов по ширине только 5-ть,
            // тайлы больше 5-го не действуют.
            case 'right':
                var xx = x + 101;
                return (engineTiles.getTileFromPxXPlayer(xx)<=5 ? xx : x);
        }
    },

    /* Переместить по значению в px на один тайл вверх или вниз по оси Y
     * 
     */
    moveToTileYPlayer: function (key, y) {
        // tile height is 83 px
        // tile width is 101 px
        switch(key) {
            // тайлов по высоте только 6-ть,
            // тайлы меньше 1-го не действуют.
            case 'up':
                var yy = y - 83;
                return (engineTiles.getTileFromPxYPlayer(yy)>0 ? yy : y);
            // тайлов по высоте только 6-ть,
            // тайлы больше 6-го не действуют.
            case 'down':
                var yy = y + 83;            
                return (engineTiles.getTileFromPxYPlayer(yy)<=6 ? yy : y);
        }
    },
    
};