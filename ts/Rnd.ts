
//A class seems like overkill for this... are there namespaces in JS?
class Rnd {
	/**
	 * Generates a random number between the given min and max values, inclusive,
	 * and returns it.
	 * 
	 * @param min The lowest value that can be returned.
	 * @param max The highest value that can be returned.
	 * @returns A value in the range of [min, max].
	 */
	public static nextInt(min: number, max: number): number {
		if (min > max) {
			throw new Error("Illegal arguments given to Rnd.nextInt(min: number, max: number): max must be greater than min.");
		}
		
		//This code was copied from:
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
