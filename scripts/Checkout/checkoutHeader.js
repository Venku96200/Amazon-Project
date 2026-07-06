import { calculateCartQuantity } from "../../data/cart.js";


export function renderCheckoutHeader(){
    // Displaying the total items on top
    function updateCartquantity(){
                document.querySelector('.js-display-items').innerHTML=`${calculateCartQuantity()} items`;
            }
    updateCartquantity();        
}

       