var GameDie = (function () {
    function GameDie(sides) {
        this.currentValue = 1;
        this.sides = sides;
    }
    GameDie.prototype.roll = function () {
        this.currentValue = Rnd.nextInt(1, this.sides);
        return this.currentValue;
    };
    GameDie.prototype.getCurrentValue = function () {
        return this.currentValue;
    };
    return GameDie;
}());
