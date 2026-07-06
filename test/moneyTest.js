/*

Lesson 16:- Testing

Easiest Way:- Manual Testing:- Open the website and try out the code
              1) Hard to test every situation
              2) Hard to re-test

Automated Testing:- Using Code to test the code 

2 Type of Test Cases:-

        1 Basic Test Cases=tests if the code is working
        2 Edge Cases = Test with values that are tricky

group of related tests = test suite        




*/
import {formatCurrency} from '../scripts/utils/money.js';
console.log('Converts cents into dollars');

console.log('Works with 0')
if(formatCurrency(0)==='0.00'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('rounds up to the nearest cent')
if(formatCurrency(2000.5)==='20.01'){
    console.log('passed');
}else{
    console.log('Failed');
}