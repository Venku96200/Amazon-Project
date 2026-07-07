import {formatCurrency} from '../../scripts/utils/money.js'

// Creating a test suite :- We will use describe(name,function) property  (Refer Documentation)
// Creating a test :- we will use it(name,function) function
// Instead of using if statements inside the tests, jasmine provides
// another function expect();

describe('test suite: formatCurrency',()=>{
    it('converts cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('round up to the nearest cent', ()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01'); 
    });
}); 