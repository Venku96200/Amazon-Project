/* We will try to Generate the HTML inside checkout.html using javascript

1) We will import the cart array here and iterate through it to generate
HTML
2) We will also import the product array to get the product details as we know the productid by iterating in cart
3) Finally we will put all the generated HTML of all the products into an main HTML file( cartsummaryHTML and show it in webpage using DOM)

-------------------------------------------

We are introducing a new folder called utils(utilities) this folder stores the important snippet of code that is
shared by multiple files and we can just use them using module
EX:- money.js

------------------------------------------------------

We will now deal with fixing radio selectors
<input type="radio" name="name1">

If a set of radio selectors have same name, then we can select one of them
-----------------------------------------------------

Lets make delete button interactive
*/
import {cart, removefromCart} from '../data/cart.js';
import { products } from '../data/products.js';
import {formatCurrency} from './utils/money.js'


let cartSummaryHTML='';

function displaying_cart(cart){
    cart.forEach((cartItem)=>{
    const productID= cartItem.productid;
    let matchingproduct;
    products.forEach((product)=>{
        if(product.id===productID){
            matchingproduct=product;
        }
    });

    cartSummaryHTML+=`
                        <div class="cart-item-container js-cart-delete-${matchingproduct.id}">
                                <div class="delivery-date">
                                Delivery date: Tuesday, June 21
                                </div>

                                <div class="cart-item-details-grid">
                                <img class="product-image"
                                    src="${matchingproduct.image}">

                                <div class="cart-item-details">
                                    <div class="product-name">
                                    ${matchingproduct.name}
                                    </div>
                                    <div class="product-price">
                                    $${(formatCurrency(matchingproduct.priceCents))}
                                    </div>
                                    <div class="product-quantity">
                                    <span>
                                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                                    </span>
                                    <span class="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span class="delete-quantity-link link-primary js-delete-link " data-delete-id=${matchingproduct.id}>
                                        Delete
                                    </span>
                                    </div>
                                </div>

                                <div class="delivery-options">
                                    <div class="delivery-options-title">
                                    Choose a delivery option:
                                    </div>
                                    <div class="delivery-option">
                                    <input type="radio" checked
                                        class="delivery-option-input"
                                        name="delivery-option-${matchingproduct.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                        Tuesday, June 21
                                        </div>
                                        <div class="delivery-option-price">
                                        FREE Shipping
                                        </div>
                                    </div>
                                    </div>
                                    <div class="delivery-option">
                                    <input type="radio"
                                        class="delivery-option-input"
                                        name="delivery-option-${matchingproduct.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                        Wednesday, June 15
                                        </div>
                                        <div class="delivery-option-price">
                                        $4.99 - Shipping
                                        </div>
                                    </div>
                                    </div>
                                    <div class="delivery-option">
                                    <input type="radio"
                                        class="delivery-option-input"
                                        name="delivery-option-${matchingproduct.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                        Monday, June 13
                                        </div>
                                        <div class="delivery-option-price">
                                        $9.99 - Shipping
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        `;

});
document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

}
displaying_cart(cart);


// Working With delete button


document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
    link.addEventListener('click',()=>{
        const product_ID=link.dataset.deleteId; // We get the productid of the product we pressed delete.
        removefromCart(product_ID); 
        let deleted_element=document.querySelector(`.js-cart-delete-${product_ID}`);
        deleted_element.remove();     // .remove property removes the element from document
    })

    
});


