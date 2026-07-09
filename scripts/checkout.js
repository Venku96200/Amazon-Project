import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
//import '../data/cart-oops.js';  // to import entire file
//import '../data/cart-class.js'; 
//import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";

/* Promise is a built-in class we need to give it a function
// It will run this function immediately
//This inner function gets a parameter called resolve
// resolve is a function, It lets us control when to go to the next step
new Promise((resolve)=>{
    loadProducts(()=>{      // We run some async code and wait for it to complete and then run resolve() to go to the next step
        resolve('value1');  // We can store a value inside resolve and use in in the next then function
    });
}).then((value)=>{
    console.log(value);    
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });
}).then(()=>{
     renderOrderSummary();
     renderPaymentSummary();
})
*/

/*
1) A promise is created which runs the loadProducts() imediately
2) After the Products are loaded from backend into the Product array the resolve() gets executed
3) After, the function inside then() gets executed
4) We have made another promise inside the then() function
5) The loadcart() function gets executed , the cart is loaded from backend .
6) The resolve inside loadCart() runs,
7) Finally then() function runs causing renderOrderSummary() & renderPaymentSummary() to run

Total idea:-

# A Promise is simply an object that represents a value that will be available later.

                    Promise created
                        │
                        ▼
                    loadProducts starts
                        │
                        │ (2 seconds)
                        ▼
                    Products finished
                        │
                    resolve()
                        │
                    Promise becomes fulfilled
                        │
                    .then() executes
                        ▼
                    Next step

-------------------------------------------------------
--------------------------------------------------------

  Promise.all()
# Lets us run multiple promises at the same time
# and wait for all of them to finish

*/
/* Just promise.all 

Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{      // We run some async code and wait for it to complete and then run resolve() to go to the next step
            resolve('value1');  // We can store a value inside resolve and use in in the next then function
        });
    }),

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })

]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// Using promise.all with fetch


Promise.all([
    loadProductsFetch(),  // This returns a promise

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })

]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});


/*
SUMMARY OF PROMISES:-

Promises are a better way to wait for asynchronous code to finish compared to callbacks
They Help us avoid nesting and keep our code relatively flat
Promises also have more features like:- promise.all() which lets us run multiple promises at the same time
We can also add parameters into resolve() function
*/

/*  CALLBACKS

//This is callback version (not used when multiple callbacks as it might cause nesting)

loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    })                 
});
/*
# First loadProducts will load the products from backend to Products array
# Then the function inside the loadproducts() runs
# Then loadCart will load the cart from backend to cart array
# Then the function inside loadCart runs

If we have lots of callbacks our code will become more and more nested
Promises solve this problem by flattening the code
*/



