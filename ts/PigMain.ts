
window.onload = function() {
	document.getElementById("register-game").onclick = function() {
		let player1Input: HTMLInputElement = <HTMLInputElement> document.getElementById("player1");
		let player2Input: HTMLInputElement = <HTMLInputElement> document.getElementById("player2");
		
		let player1Name: string = player1Input.value;
		let player2Name: string = player2Input.value;
		
		//Check for non-empty, non-matching, player names...
		if (!player1Name) {
			let errSpan: HTMLSpanElement = document.getElementById("player1-err");
			errSpan.innerText = "Player name required!"
		} else {
			let errSpan: HTMLSpanElement = document.getElementById("player1-err");
			errSpan.innerText = "";
		}
		
		if (!player2Name) {
			let errSpan: HTMLSpanElement = document.getElementById("player2-err");
			errSpan.innerText = "Player name required!"
		} else if (player1Name == player2Name) {
			let errSpan: HTMLSpanElement = document.getElementById("player2-err");
			errSpan.innerText = "Player names shoud be different!"
		} else {
			let errSpan: HTMLSpanElement = document.getElementById("player2-err");
			errSpan.innerText = "";
		}
		
		if (!player1Name || !player2Name || ((player1Name || player2Name) && player1Name == player2Name)) return;
		
		let registerGameBtn: HTMLInputElement = <HTMLInputElement> document.getElementById("register-game");
		registerGameBtn.disabled = true;
		player1Input.disabled = true;
		player2Input.disabled = true;
		
		let game = new PigDiceGame(false, player1Name, player2Name);
		game.setRemoveGameDivCallback(function() {
			registerGameBtn.disabled = false;
			player1Input.disabled = false;
			player2Input.disabled = false;
		});
		
		document.getElementById("gameplay").appendChild(game.getGameDiv());
	}
}
