
class GameDie {
	
	private sides: number;
	
	private currentValue: number = 1;
	
	constructor(sides: number) {
		this.sides = sides;
	}
	
	public roll(): number {
		this.currentValue = Rnd.nextInt(1, this.sides);
		return this.currentValue;
	}
	
	public getCurrentValue(): number {
		return this.currentValue;
	}
}
