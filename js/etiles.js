/* etiles.js
 * version 1.0
 * comments on russian, sorry ¯\_(ツ)_/¯ 
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

    /* Получить номер 'переднего' тайла по значению в px по оси Х
     * (прим.: враги могут занимать два и больше тайла по движению).
     */
    getFrontTileXEnemy: function (x) {
        if ((x+101) > 0 && (x+101)<=101) {
            return 1;
        } else if ((x+101) > 0 && (x+101)>101) {
            return Math.ceil((x+101) / 101);
        }
        return 0;
    },

    /* ...
     * 
     */
    getFrontTileYEnemy: function (y) {
        // tile height is 83 px
        // ((current position + offset) / tile height) + <counting tiles is from one>
        return (((y + 23) / 83) + 1);
    },

    /* Проверить покинуло ли указанное количество px
     * половину или более тайла по оси X
     */
    moreHalfTileX: function(x) {
        if (x < 50) {
            return false;
        } else if (x >= 50 && x < 101) {
            return true;
        } else {
            return (x % 101 >= 50) ? true : false;
        }
    },

    /* Получить указанный графический тайл игрока из предоставленных
     * Нумерация начинается с нуля. Если номер не указан он генерится рандомом.
     */
    playerSprite: function(sprites, num) {
        if (num === undefined || num < 0 || num>=sprites.length) {
            var num = (Math.floor(Math.random() * (sprites.length)));
        }
        return sprites[num];
    },

};