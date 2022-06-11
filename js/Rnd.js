var Rnd = (function () {
    function Rnd() {
    }
    Rnd.nextInt = function (min, max) {
        if (min > max) {
            throw new Error("Illegal arguments given to Rnd.nextInt(min: number, max: number): max must be greater than min.");
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Rnd;
}());
