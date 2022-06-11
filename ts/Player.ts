
class Player {
	
	private name: string;
	
	private score: number = 0;
	
	constructor(name: string) {
		this.name = name;
	}
	
	public getName(): string {
		return this.name;
	}
	
	public addToScore(amount: number): number {
		this.score += amount;
		return this.score;
	}
	
	public getScore(): number {
		return this.score;
	}
	
	public resetScore(): void {
		this.score = 0;
	}
}
