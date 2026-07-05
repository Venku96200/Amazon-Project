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

------------------------------------------------------
Lesson 15:- External Libraries, MVC, Finish the checkout page

External libraries:- the code that is outside our project

# We will be using an external library called DayJs
  to get the current date ,day and  time

# we now have a function 'dayjs()'

# Best Practice:-
When we need something complicated,
-Try to find an external library first.
-Before writing the code ourselves.

---------------------------------------------
ESM Version
A version that works with JavaScript Modules
ESM= EcmaScript Module,  (EcmaScript=JavaScript)

---------------------------------------------------

Default export:- Use:- Just to remove curly bracket while importing
 Each file can have only one default export

 -----------------------------------

 Starting with Delivery Date:-

 1) We store the delivery options seperately in a object as they are same for all products
 2) And then in cart for each product we create Key(deliveryOptionId) which points to the options in the object stored earlier
     This Is Known as Normalising the Data

 3) We delete the cart from localstorage and put this new cart into it 
 4) Steps:-    
             1) Loop through deliveryOptions
             2) for each option generate some HTML
             3) Combine the HTML together  


5) Make the radio buttons Interactive
      1) Update deliveryOptionId in the cart
      2) Update the page


---------------------------
MVC:- Model- View- Controller => it is an design pattern

1) Update the date
2) Regenerate all the HTML  (renderOrderSummary())

There are 3 parts in MVC:-
        1) Model= Saves and manages the data (cart.js & deliveryOptions.js & product.js)
        2) view = takes the data and displays it on the page (some part of checkout.js)
        3) Controller = run some code when we interact with the page (other part of checkout.js)

MVC= Makes sure the page always matches the data        




*/
import {calculateCartQuantity, cart, removefromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';                                // This is known as Default Export(no curly brackets needed)
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs  from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // This is known as Default Export(no curly brackets needed)
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';

//Running the function inside External Librarary

hello();
//The dayjs() have bunch of methods we can work on
const today=dayjs();
const deliveryDate=today.add(7,'days');
deliveryDate.format('dddd, MMMM, D');   // To know how these formats came check dayjs documentation

export function renderOrderSummary(){

        let cartSummaryHTML='';

        function displaying_cart(cart){
            
            cart.forEach((cartItem)=>{
            const productID= cartItem.productId;

            
            
            const matchingproduct=getProduct(productID);
            

            const deliverOptionId=cartItem.deliveryOptionId;
            const deliveryOption=getDeliveryOption(deliverOptionId);

                const today= dayjs();
                const deliverydate = today.add(
                    deliveryOption.deliveryDays,
                    'days'
                )
                const dateString=deliverydate.format('dddd, MMMM D');

            
            cartSummaryHTML+=`
                                <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
                                        <div class="delivery-date delivery-date-id-${matchingproduct.id}">
                                        Delivery date: ${dateString}
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
                                                Quantity: <span class="quantity-label quantity-label-${matchingproduct.id}">${cartItem.quantity}</span>
                                            </span>
                                            <span class="update-quantity-link link-primary  js-update-link" data-product-id=${matchingproduct.id}>
                                                Update
                                            </span>
                                            <input class="quantity-input js-quantity-input-${matchingproduct.id}" type="Number" >
                                            <span class="save-quantity-link link-primary js-save-link" data-product-id=${matchingproduct.id}> Save</span>
            
                                            <span class="delete-quantity-link link-primary js-delete-link " data-delete-id=${matchingproduct.id}>
                                                Delete
                                            </span>
                                            </div>
                                        </div>

                                        <div class="delivery-options">
                                            <div class="delivery-options-title">
                                            Choose a delivery option:
                                            </div>
                                            ${deliveryOptionsHTML(matchingproduct, cartItem)}
                                        </div>
                                        </div>
                                    </div>
                                `;

        });
        document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

        }
        displaying_cart(cart);





        // Working with delivery options
        function deliveryOptionsHTML(matchingproduct, cartItem){
            let HTML='';
            deliveryOptions.forEach((option)=>{
                const today= dayjs();
                const deliverydate = today.add(
                    option.deliveryDays,
                    'days'
                )
                const dateString=deliverydate.format('dddd, MMMM D');
                
                const priceString=option.pricecents===0 ? 'Free Shipping' : `$${formatCurrency(option.pricecents)} -Shipping`;
                const isChecked= option.id===cartItem.deliveryOptionId;
                HTML+=
                `<div class="delivery-option js-delivery-option" data-product-id=${matchingproduct.id} data-delivery-option-id=${option.id}>
                    <input type="radio"
                        ${isChecked ? 'checked':''}
                        class="delivery-option-input "
                        name="delivery-option-${matchingproduct.id}"
                        >
                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString}
                        </div>
                    </div>
                </div>`

            });
            return HTML;
        }
        //What happens when we click radio button
        document.querySelectorAll('.js-delivery-option')
        .forEach((element)=>{
            element.addEventListener('click', ()=>{
                const productId=element.dataset.productId;
                const deliveryOptionId=element.dataset.deliveryOptionId;
                updateDeliveryOption(productId,deliveryOptionId);
                renderOrderSummary();
            });

        });


        // Working With delete button
        document.querySelectorAll('.js-delete-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const product_ID=link.dataset.deleteId; // We get the productid of the product we pressed delete.
                removefromCart(product_ID); 
                let deleted_element=document.querySelector(`.js-cart-item-container-${product_ID}`);
                deleted_element.remove();     // .remove property removes the element from document
                updateCartquantity();        // Updates the total quantity at the top
            })
        });



        // Displaying the total items on top
        function updateCartquantity(){
            document.querySelector('.js-display-items').innerHTML=`${calculateCartQuantity()} items`;
        }
        updateCartquantity();  // Updates quantity when refreshed page

        

        // Working on Update button


        document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
            });
        });

        document.querySelectorAll('.js-save-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const productid=link.dataset.productId;
                const container=document.querySelector(`.js-cart-item-container-${productid}`);
                container.classList.remove('is-editing-quantity');

                const quantityinput=Number(document.querySelector(`.js-quantity-input-${productid}`).value);
                updateQuantity(productid,quantityinput);
                updateCartquantity();
                document.querySelector(`.quantity-label-${productid}`).innerHTML=`${quantityinput}`;
            });
        });
};

renderOrderSummary();

