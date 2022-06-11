var PigDiceGame = (function () {
    function PigDiceGame(manualEnd, player1, player2) {
        this.die = new GameDie(6);
        this.players = [];
        this.turn = 0;
        this.scorePot = 0;
        this.gameActive = true;
        this.gameDiv = null;
        this.manualEnd = manualEnd;
        this.players.push(new Player(player1));
        this.players.push(new Player(player2));
    }
    PigDiceGame.prototype.roll = function () {
        if (!this.gameActive)
            return;
        var nextRoll = this.die.roll();
        if (nextRoll == 1) {
            this.advancePlayerTurn();
            return;
        }
        this.scorePot += nextRoll;
        if (!this.manualEnd && this.players[this.turn].getScore() + this.scorePot >= 100) {
            this.players[this.turn].addToScore(this.scorePot);
            this.gameActive = false;
        }
        this.updateGameDiv();
    };
    PigDiceGame.prototype.hold = function () {
        if (!this.gameActive)
            return;
        this.advancePlayerTurn(true);
    };
    PigDiceGame.prototype.newGame = function () {
        if (this.gameActive)
            return;
        this.players.forEach(function (player) {
            player.resetScore();
        });
        this.turn = 0;
        this.scorePot = 0;
        this.gameActive = true;
        if (this.gameDiv) {
            this.updateGameDiv();
        }
    };
    PigDiceGame.prototype.setRemoveGameDivCallback = function (callback) {
        this.removeCallback = callback;
    };
    PigDiceGame.prototype.getGameDiv = function () {
        if (this.gameDiv)
            return this.gameDiv;
        var turn = this.turn;
        this.gameDiv = document.createElement("div");
        {
            var gameDiv_1 = this.gameDiv;
            gameDiv_1.classList.add("game");
            var message = document.createElement("p");
            message.classList.add("message");
            message.innerText = "".concat(this.players[this.turn].getName(), "'s Turn...");
            gameDiv_1.appendChild(message);
            this.players.forEach(function (player, index) {
                var playerDiv = document.createElement("div");
                playerDiv.classList.add("score");
                playerDiv.setAttribute("data-player", index.toString());
                var playerH1 = document.createElement("h1");
                playerH1.innerText = player.getName();
                playerH1.classList.add("player");
                if (index == turn) {
                    playerH1.classList.add("active-player");
                }
                playerDiv.appendChild(playerH1);
                var scoreP = document.createElement("p");
                scoreP.innerHTML = "Score: <span class=\"player-score\">".concat(player.getScore(), "</span>");
                playerDiv.appendChild(scoreP);
                gameDiv_1.appendChild(playerDiv);
            });
            var turnScore = document.createElement("p");
            turnScore.innerHTML = "Turn Score: <span class=\"turn-score\">".concat(this.scorePot, "</span>");
            gameDiv_1.appendChild(turnScore);
            var dieImg = document.createElement("img");
            dieImg.classList.add("dice-image");
            dieImg.setAttribute("src", "assets/dice".concat(this.die.getCurrentValue(), ".png"));
            dieImg.setAttribute("alt", "Picture of a game dice.");
            gameDiv_1.appendChild(dieImg);
            var thisPigDiceGame_1 = this;
            {
                var fieldset = document.createElement("fieldset");
                fieldset.classList.add("game-input");
                var leftBtn = document.createElement("button");
                leftBtn.classList.add("left-btn");
                leftBtn.innerText = "Roll";
                leftBtn.onclick = function () {
                    thisPigDiceGame_1.roll();
                };
                fieldset.appendChild(leftBtn);
                var rightBtn = document.createElement("button");
                rightBtn.classList.add("right-btn");
                rightBtn.innerText = "Hold";
                rightBtn.onclick = function () {
                    thisPigDiceGame_1.hold();
                };
                fieldset.appendChild(rightBtn);
                gameDiv_1.appendChild(fieldset);
            }
        }
        return this.gameDiv;
    };
    PigDiceGame.prototype.updateGameDiv = function () {
        var message = this.gameDiv.querySelector(".message");
        if (this.gameActive) {
            message.innerText = "".concat(this.players[this.turn].getName(), "'s Turn...");
        }
        else {
            message.innerText = "".concat(this.players[this.turn].getName(), " Wins!");
        }
        var players = this.players;
        var turn = this.turn;
        if (!this.gameActive) {
            var winnerIndex = this.turn;
        }
        this.gameDiv.querySelectorAll(".score").forEach(function (scoreDiv) {
            var index = parseInt(scoreDiv.getAttribute("data-player"));
            if (winnerIndex && winnerIndex == index) {
                scoreDiv.classList.add("winner");
            }
            else {
                scoreDiv.classList.remove("winner");
            }
            var playerH1 = scoreDiv.querySelector(".player");
            if (turn == index) {
                playerH1.classList.add("active-player");
            }
            else {
                playerH1.classList.remove("active-player");
            }
            var scoreSpan = scoreDiv.querySelector(".player-score");
            scoreSpan.innerText = players[index].getScore().toString();
        });
        this.gameDiv.querySelector(".turn-score").innerText = this.scorePot.toString();
        var diceImg = this.gameDiv.querySelector(".dice-image");
        diceImg.setAttribute("src", "assets/dice".concat(this.die.getCurrentValue(), ".png"));
        var leftBtn = this.gameDiv.querySelector(".left-btn");
        var rightBtn = this.gameDiv.querySelector(".right-btn");
        var thisPigDiceGame = this;
        if (this.gameActive) {
            leftBtn.innerText = "Roll";
            rightBtn.innerText = "Hold";
            leftBtn.onclick = function () {
                thisPigDiceGame.roll();
            };
            rightBtn.onclick = function () {
                thisPigDiceGame.hold();
            };
        }
        else {
            leftBtn.innerText = "Rematch!";
            rightBtn.innerText = "Change Players";
            leftBtn.onclick = function () {
                thisPigDiceGame.newGame();
            };
            rightBtn.onclick = function () {
                thisPigDiceGame.removeGameDiv();
            };
        }
    };
    PigDiceGame.prototype.removeGameDiv = function () {
        this.gameDiv.parentNode.removeChild(this.gameDiv);
        this.gameDiv = null;
        if (this.removeCallback) {
            this.removeCallback();
        }
    };
    PigDiceGame.prototype.advancePlayerTurn = function (rewardScorePot) {
        if (rewardScorePot === void 0) { rewardScorePot = false; }
        if (rewardScorePot) {
            var playerScore = this.players[this.turn].addToScore(this.scorePot);
            if (playerScore >= 100) {
                this.gameActive = false;
                this.turn--;
            }
        }
        this.scorePot = 0;
        this.turn = ++this.turn % this.players.length;
        if (this.gameDiv) {
            this.updateGameDiv();
        }
    };
    return PigDiceGame;
}());
