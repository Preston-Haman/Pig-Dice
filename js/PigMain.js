window.onload = function () {
    document.getElementById("register-game").onclick = function () {
        var player1Input = document.getElementById("player1");
        var player2Input = document.getElementById("player2");
        var player1Name = player1Input.value;
        var player2Name = player2Input.value;
        if (!player1Name) {
            var errSpan = document.getElementById("player1-err");
            errSpan.innerText = "Player name required!";
        }
        else {
            var errSpan = document.getElementById("player1-err");
            errSpan.innerText = "";
        }
        if (!player2Name) {
            var errSpan = document.getElementById("player2-err");
            errSpan.innerText = "Player name required!";
        }
        else if (player1Name == player2Name) {
            var errSpan = document.getElementById("player2-err");
            errSpan.innerText = "Player names shoud be different!";
        }
        else {
            var errSpan = document.getElementById("player2-err");
            errSpan.innerText = "";
        }
        if (!player1Name || !player2Name || ((player1Name || player2Name) && player1Name == player2Name))
            return;
        var registerGameBtn = document.getElementById("register-game");
        registerGameBtn.disabled = true;
        player1Input.disabled = true;
        player2Input.disabled = true;
        var game = new PigDiceGame(false, player1Name, player2Name);
        game.setRemoveGameDivCallback(function () {
            registerGameBtn.disabled = false;
            player1Input.disabled = false;
            player2Input.disabled = false;
        });
        document.getElementById("gameplay").appendChild(game.getGameDiv());
    };
};
