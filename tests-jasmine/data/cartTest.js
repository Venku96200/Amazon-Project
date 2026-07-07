// Checking the addToCart
/* Best practice:-
        Test Coverage:- how much of the code is being test
        Try to maximize test coverage
    Flaky Test:- test that sometimes passes and sometimes fails    (due to localstorage)
    
    Mock:- lets us replace a method with a fake version  
    
Each test can have multiple expect(), the test passes when all the expectations of the test passes

    
*/
import {addtocart,cart} from '../../data/cart.js';

describe('test suite: addTocart',()=>{
    it('adds an existing product to the cart',()=>{


    });
    it('adds a new product to the cart', ()=>{
        // We will mock the getItem() function to return empty cart
        spyOn(localStorage,'getItem').and.callFake(()=>{  // create a fake version of fuction 'getItem', then we can make this fake version do anything we want(Ex:- return an empty array)
            return JSON.stringify([]);                    // We will create an empty cart in it
        });
        
        addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        
    });

}); 