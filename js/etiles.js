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
};