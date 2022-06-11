
class PigDiceGame {
	
	private die: GameDie = new GameDie(6);
	
	private manualEnd: boolean;
	
	private players: Player[] = [];
	
	private turn: number = 0;
	
	private scorePot: number = 0;
	
	private gameActive: boolean = true;
	
	private gameDiv: HTMLDivElement = null;
	
	private removeCallback: () => any;
	
	constructor(manualEnd: boolean, player1: string, player2: string) {
		this.manualEnd = manualEnd;
		this.players.push(new Player(player1));
		this.players.push(new Player(player2));
	}
	
	public roll(): void {
		if (!this.gameActive) return;
		
		let nextRoll = this.die.roll();
		if (nextRoll == 1) {
			this.advancePlayerTurn();
			return;
		}
		
		this.scorePot += nextRoll;
		
		if (!this.manualEnd && this.players[this.turn].getScore() + this.scorePot >= 100) {
			this.players[this.turn].addToScore(this.scorePot);
			//Let user see last turn's score?
			//this.scorePot = 0;
			this.gameActive = false;
		}
		
		this.updateGameDiv();
	}
	
	public hold(): void {
		if (!this.gameActive) return;
		
		this.advancePlayerTurn(true);
	}
	
	public newGame(): void {
		if (this.gameActive) return;
		
		this.players.forEach(function(player: Player) {
			player.resetScore();
		});
		this.turn = 0;
		this.scorePot = 0;
		this.gameActive = true;
		
		if (this.gameDiv) {
			this.updateGameDiv();
		}
	}
	
	public setRemoveGameDivCallback(callback: () => any) {
		this.removeCallback = callback;
	}
	
	public getGameDiv(): HTMLDivElement {
		if (this.gameDiv) return this.gameDiv;
		
		//Generate div to display the game... example:
		/*
		<div class="game">
			<p class="message">Player 1 Wins!</p>
			<div class="score winner" data-player="0">
				<h1 class="player active-player">Player 1</h1>
				<p>Score: <span class="player-score">105</span></p>
			</div>
			<div class="score" data-player="1">
				<h1 class="player">Player 2</h1>
				<p>Score: <span class="player-score">86</span></p>
			</div>
			<p>Turn Score: <span class="turn-score">6</span></p>
			<img class="dice-image" src="assets/dice6.png" alt="Picture of game dice.">
			<fieldset class="game-input">
				<button class="left-btn">Rematch!</button>
				<button class="right-btn">Change Players</button>
			</fieldset>
			<!-- Attribution required on page for commercial usage -->
			<!-- Dice Graphics &copy; First Grade Brain firstgradebrain.com -->
		</div>
		*/
		
		//For access in callback function
		let turn: number = this.turn;
		
		this.gameDiv = document.createElement("div");
		
		/* <div class="game"> */ {
			let gameDiv: HTMLDivElement = this.gameDiv;
			gameDiv.classList.add("game");
			
			//<p class="message">
			let message = document.createElement("p");
			message.classList.add("message");
			message.innerText = `${this.players[this.turn].getName()}'s Turn...`;
			gameDiv.appendChild(message);
			
			this.players.forEach(function(player: Player, index: number)
			/* <div class="score" data-player="#"> */ {
				let playerDiv: HTMLDivElement = document.createElement("div");
				playerDiv.classList.add("score");
				playerDiv.setAttribute("data-player", index.toString());
				
				//<h1 class="player [active-player]">
				let playerH1: HTMLHeadingElement = document.createElement("h1");
				playerH1.innerText = player.getName();
				playerH1.classList.add("player");
				if (index == turn) {
					playerH1.classList.add("active-player");
				}
				playerDiv.appendChild(playerH1);
				
				//<p>Score: <span class="player-score">#</span></p>
				let scoreP: HTMLParagraphElement = document.createElement("p");
				scoreP.innerHTML = `Score: <span class="player-score">${player.getScore()}</span>`;
				playerDiv.appendChild(scoreP);
				
				gameDiv.appendChild(playerDiv);
			});
			
			//<p>Turn Score: <span class="turn-score">#</span></p>
			let turnScore: HTMLParagraphElement = document.createElement("p");
			turnScore.innerHTML = `Turn Score: <span class="turn-score">${this.scorePot}</span>`;
			gameDiv.appendChild(turnScore);
			
			//<img class="dice-image" src="assets/dice#.png" alt="Picture of game dice.">
			let dieImg: HTMLImageElement = document.createElement("img");
			dieImg.classList.add("dice-image");
			dieImg.setAttribute("src", `assets/dice${this.die.getCurrentValue()}.png`);
			dieImg.setAttribute("alt", "Picture of a game dice.");
			gameDiv.appendChild(dieImg);
			
			let thisPigDiceGame: PigDiceGame = this;
			
			/* <fieldset class="game-input"> */ {
				let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
				fieldset.classList.add("game-input");
				
				//<button class="left-btn">Roll</button>
				let leftBtn: HTMLButtonElement = document.createElement("button");
				leftBtn.classList.add("left-btn");
				leftBtn.innerText = "Roll";
				leftBtn.onclick = function() {
					thisPigDiceGame.roll();
				};
				fieldset.appendChild(leftBtn);
				
				//<button class="right-btn">Hold</button>
				let rightBtn: HTMLButtonElement = document.createElement("button");
				rightBtn.classList.add("right-btn");
				rightBtn.innerText = "Hold";
				rightBtn.onclick = function() {
					thisPigDiceGame.hold();
				};
				fieldset.appendChild(rightBtn);
				
				gameDiv.appendChild(fieldset);
			}
			
			//If this is being used commercially, the following attribution is required (minus the word "Dice").
			//gameDiv.innerHTML += "Dice Graphics &copy; First Grade Brain firstgradebrain.com";
		}
		
		return this.gameDiv;
	}
	
	private updateGameDiv() {
		let message: HTMLParagraphElement = this.gameDiv.querySelector(".message");
		if (this.gameActive) {
			message.innerText = `${this.players[this.turn].getName()}'s Turn...`;
		} else {
			message.innerText = `${this.players[this.turn].getName()} Wins!`;
		}
		
		//For access in callback...
		let players: Player[] = this.players;
		let turn: number = this.turn;
		if (!this.gameActive) {
			var winnerIndex = this.turn;
		}
		
		this.gameDiv.querySelectorAll(".score").forEach(function(scoreDiv: HTMLDivElement) {
			let index: number = parseInt(scoreDiv.getAttribute("data-player"));
			
			if (winnerIndex && winnerIndex == index) {
				scoreDiv.classList.add("winner");
			} else {
				scoreDiv.classList.remove("winner");
			}
			
			let playerH1: HTMLHeadingElement = scoreDiv.querySelector(".player");
			if (turn == index) {
				playerH1.classList.add("active-player");
			} else {
				playerH1.classList.remove("active-player");
			}
			
			let scoreSpan: HTMLSpanElement = scoreDiv.querySelector(".player-score");
			scoreSpan.innerText = players[index].getScore().toString();
		});
		
		(<HTMLSpanElement> this.gameDiv.querySelector(".turn-score")).innerText = this.scorePot.toString();
		
		let diceImg: HTMLImageElement = this.gameDiv.querySelector(".dice-image");
		diceImg.setAttribute("src", `assets/dice${this.die.getCurrentValue()}.png`);
		
		let leftBtn: HTMLButtonElement = this.gameDiv.querySelector(".left-btn");
		let rightBtn: HTMLButtonElement = this.gameDiv.querySelector(".right-btn");
		
		let thisPigDiceGame: PigDiceGame = this;
		
		if (this.gameActive) {
			leftBtn.innerText = "Roll";
			rightBtn.innerText = "Hold";
			
			leftBtn.onclick = function() {
				thisPigDiceGame.roll();
			};
			rightBtn.onclick = function() {
				thisPigDiceGame.hold();
			};
		} else {
			leftBtn.innerText = "Rematch!";
			rightBtn.innerText = "Change Players";
			
			leftBtn.onclick = function() {
				thisPigDiceGame.newGame();
			};
			rightBtn.onclick = function() {
				thisPigDiceGame.removeGameDiv();
			};
		}
	}
	
	private removeGameDiv() {
		this.gameDiv.parentNode.removeChild(this.gameDiv);
		this.gameDiv = null;
		
		if (this.removeCallback) {
			this.removeCallback();
		}
	}
	
	private advancePlayerTurn(rewardScorePot: boolean = false): void {
		if (rewardScorePot) {
			let playerScore = this.players[this.turn].addToScore(this.scorePot);
			if (playerScore >= 100) {
				this.gameActive = false;
				
				//Prevent turn from updating because game is over
				this.turn--;
			}
		}
		this.scorePot = 0;
		this.turn = ++this.turn % this.players.length;
		
		if (this.gameDiv) {
			this.updateGameDiv();
		}
	}
}
