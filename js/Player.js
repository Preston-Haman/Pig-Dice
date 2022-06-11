var Player = (function () {
    function Player(name) {
        this.score = 0;
        this.name = name;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.addToScore = function (amount) {
        this.score += amount;
        return this.score;
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.resetScore = function () {
        this.score = 0;
    };
    return Player;
}());
