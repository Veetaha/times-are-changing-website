import { Test } from '@nestjs/testing';
import { UtilsModule } from '../utils.module';
import { AlgorithmsService } from './algorithms.service';

describe('TestService', () => {
    let service: AlgorithmsService;

    beforeEach(async () => {
        service = (await Test.createTestingModule({
                imports: [UtilsModule]
            })
            .compile())
            .get<AlgorithmsService>(AlgorithmsService);
    });

    it('must be defined', () => {
        expect(service).toBeDefined();
    });


    it('must return null when no subarray was found', () => {
        expect(service.getFirstSubArrFromSortedWithSum(
            [1, 2, 3, 4, 5, 6, 7],
            8
        )).toBeNull();
    });

    it('must return first matching subarray', () => {
        expect(service.getFirstSubArrFromSortedWithSum(
            [1, 7, 13, 17, 22, 34, 56, 78],
            56
        )).toStrictEqual({ begin: 4, end: 5 });
       
        expect(service.getFirstSubArrFromSortedWithSum(
            [2, 5, 9, 12, 13, 15, 16, 25, 33, 47],
            56
        )).toStrictEqual({ begin: 0, end: 5 });


        expect(service.getFirstSubArrFromSortedWithSum(
            [1, 7, 16, 19, 21, 34, 56, 78],
            56
        )).toStrictEqual({ begin: 2, end: 4 });

        expect(service.getFirstSubArrFromSortedWithSum(
            [2, 3, 7, 11, 16, 17, 20, 25, 33, 47],
            56
        )).toStrictEqual({ begin: 0, end: 5 });
        
        expect(service.getFirstSubArrFromSortedWithSum(
            [5, 9, 17, 19, 20, 25, 33, 47],
            56
        )).toStrictEqual({ begin: 2, end: 4 });
    });
});
