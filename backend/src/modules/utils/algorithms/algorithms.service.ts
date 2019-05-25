import _ from 'lodash';
import * as Joi from 'typesafe-joi';
import * as MathJs from 'mathjs';
import { Injectable } from '@nestjs/common';

import { DebugService } from '@utils/debug/debug.service';

import { swapItems } from '@common/utils/array';


@Injectable()
export class AlgorithmsService {

    constructor(
        private readonly debug: DebugService
    ) {}

    /**
     * Alternative implementation of `getFirstSubArrFromSortedWithSum()`.
     */
    getFirstSubArrFromSortedWithSumAlternativeImpl(arr: number[], targetSum: number) {
        let begin = Math.min(
            _.sortedIndexBy(arr, targetSum, val => Math.min(val, targetSum)), // O(log(n))
            arr.length - 1
        );
        let result = null;
        let end = begin;
        let sum = 0;
        while (begin >= 0) {            // O(n)
            sum += arr[begin];
            if (sum >= targetSum) {   
                if (sum === targetSum) {
                    result = { begin, end };
                }
                sum -= arr[end--];
            }
            --begin;
        }
        return result;
    }

    /**
     * Given number array `arr` and `targetSum` returns `{ begin, end }` 
     * inclusive bounds for the first subarray with sum totaling `targetSum`.
     *
     * @param arr       Array of numbers to search for subarray in.
     * @param targetSum Target sum returned subarray must have.
     */
    getFirstSubArrFromSortedWithSum(arr: number[], targetSum: number) {
        let begin = 0;
        let end = 0;
        let sum = 0;
        while (end < arr.length && arr[end] <= targetSum) {    // O(n)
            sum += arr[end];
            while (sum > targetSum && begin < end) {   // both begin and end indices
                sum -= arr[begin++];                   // may produce at most n iterations
            }
            if (sum === targetSum) {
                return { begin, end };
            }
            ++end;
        }
        return null;
    }


    /**
     * Returns IterableIterator<T> which randomly picks each arr[i] value at most
     * times[i] times, thus creates the `_.sum(times)` iterations.
     * 
     * @copyright https://stackoverflow.com/a/196065/9259330
     * 
     * @param arr   Array to pick values from
     * @param times Array of numbers of times a value can be picked from `arr`
     * 
     * @remarks 
     * Prerequisites: arr.length === times.length and each `times[i] >= 1`.
     * Beware that this function takes ownership of `arr` and `times` references.
     * `times` and `arr` array values get randomly shuffled, moreover 
     * `times[i]` gets decreased each time `arr[i]` value was picked.
     * Thus you should copy `arr` and `times` array if those changes are unacceptable, 
     * e.g. `pickRandomItems([...arr], [...times])`
     * 
     */
    *pickRandomItems<T>(arr: T[], times: number[]) {
        this.debug.assertMatches(times, Joi.array().items(Joi.number().integer().positive().required()));
        let edgeIndex = 0;
        while (edgeIndex < arr.length) {
            const randomIndex = MathJs.randomInt(edgeIndex, arr.length);
            const randomValue = arr[randomIndex];
            if (!--times[randomIndex]) {
                swapItems(arr,   randomIndex, edgeIndex);
                swapItems(times, randomIndex, edgeIndex);
                ++edgeIndex;
            }
            yield randomValue;
        }
    }

}
