import _ from 'lodash';
import * as MathJS from 'mathjs';

import { swapItems } from '../array';

/**
 * Represents a range of integers `[min, max]`, 
 * i.e. both `min` and `max` bound are inclusive.
 * 
 * Note that this class is immutable, create new instance if
 * you need another range bounds.
 */
export class IntRange {

    /**
     * Returns the number of integers, covered by this range, or `max - min`
     */
    getRangeLength() {
        return this.max - this.min + 1;
    }

    /**
     * Represents minimum range bound (inclusive)
     */
    public readonly min: number;
    /**
     * Represents maximum range bound (inclusive)
     */
    public readonly max: number;

    /**
     * Creates an instance of `IntRange`, rounds min and max values if those
     * have decimal parts and swaps them if `min > max`.
     * 
     * @param min minimum range bound (inclusive)
     * @param max maximim range bound (inclusive)
     */
    constructor(min: number, max: number) {
        if (min > max) {
            this.min = Math.round(max);
            this.max = Math.round(min);
        } else {
            this.min = Math.round(min);
            this.max = Math.round(max);
        }
    }

    /**
     * Retuns `true` if suspect is an integer and it goes inside this `IntRange`.
     * @param suspect Value to test wheter it is inside this `IntRange`
     */
    includes(suspect: number) {
        return Number.isInteger(suspect) && suspect >= this.min && suspect <= this.max;
    }

    /**
     * Returns a random integer from the range `[min, max]`
     */
    random() {
        return MathJS.randomInt(this.min, this.max + 1);
    }

    /**
     * Returns `IterableIterator<number>` over random unique integers 
     * within this range.
     * 
     * @remarks 
     * Iterator's inner algorithm has `O(max - min)` linear memory complexity in 
     * all cases, and `O(1)` time complexity to generate each successive random integer.
     * 
     * @copyright https://stackoverflow.com/a/196065/9259330
     * 
     * @param range The range of numbers genereted integers are taken from.
     * @param limit The maximum amount of numbers to generate, 
     *              which is `getRangeLength()` by default
     */
    *randomUniqueIntegers(limit = this.getRangeLength()){
        const numbers = _.range(this.min, this.max + 1);
        for (let i = 0; i < numbers.length && i < limit; ++i) {
            swapItems(numbers, i, MathJS.randomInt(i, numbers.length));
            yield numbers[i];
        }
    }
    
}