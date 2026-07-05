/* Instead adding product-container HTML multiple times
which takes up took much code, we will generate
the HTML code for product-containers using JAVASCRIPT*/

/* Main Idea Of Javascript
    1) Save the data
    2) Generate the HTML
    3) Make it interactive
*/

/* We made an array called product which contains multiple
objects for each of the product, and each object contain
details about that product Ex:- product_img, rating, price etc*/

/*
const products=[{
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating:{
        stars: 4.5,
        count: 87
    },
    pricecents: 1090
},{
    image:'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
        stars:4,
        count:127
    },
    pricecents:2095
},{
    image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
        stars:4.5,
        count:56
    },
    pricecents:799

},{
    image:'images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster -Black',
    rating:{
        stars:5,
        count:2197
    },
    pricecents:1899
}];
*/


// Now we have 1) SAVED THE DATA // I have commented out because we are using a external array in data folder
// LETS 2) GENERATE HTML

//------------------------------------------------------------------------------------------

/*
Now Lets think about what happens when we press ADD TO CART
1) We created an cart.js file in data folder
2) Made an array called cart in cart.js
3) Made an eventListener of ADD TO CART button for each product
4) HOW TO WE KNOW WHICH PRODUCT TO ADD?
--> Data Attribute
        # is just another HTML attribute
        # Allows us to attach any information to an element
        # have to start with 'data-'  then give it any name
        # we use .dataset property to get all the data attribute of that element

5) when we press Add to cart button of a product,   
   the eventlistener of that button .dataset property
   to get the name of the product and hence add
   a object with format{productName: xyz , quantity:1} in the cart array.
   
6) Problem- How to increase the quantity of the 
            product instead of adding it again
            as new object   
            a) Check if the product is already in the cart (using forEach on the cart array)
            b) If it is in the cart, increase the quantity
            c) If its not in the cart, add it to the cart
   
Generally it isnt reccomanded to use product name to identify the product, hence we use product_id            
-----------------------------------------------------------------------------------------------

Making The cart quantity on the top right of the page interactive

1) Calaculate the Quantity
2) Put that quantity on the page

-----------------------------------------------------------------------------------------

Modules:-
        # Is a feature of js.
        # A better way to organize our code

problem:- Rn we are using <script> elements to import the
          cart.js,product.js,amazon.js  inthe amazon.html.
          But a problem here is that, as we have delcared
          cart=[] array in cart.js , we cannot create another cart=[]
          in any of the amazon.js,product.js or other files
          connected.    
          # Hence This Creates Naming Conflicts

                                        Imagine each JavaScript file is a classroom.
                                        Without modules:
                                        Anyone can walk into any classroom and use anything. It's messy.
                                        With modules:
                                        Each classroom has a reception desk.
                                        Only the items placed on the desk (export) can be taken.
                                        Visitors must ask for them (import).
                                        This keeps code organized and prevents accidental conflicts.
                                        Any JavaScript file that is loaded directly from HTML and uses import or export must be loaded with type="module".

Modules:- Contains variables inside a file, Hence no conflicts outside the file      
         1) Create a file
         2) Dont load the file with <script>

         any variable we create inside the file,
         will be consisted inside the file

         # How to get a variable out of a file

         1) Add type="module" attribute  
         2) Export
         3) import
         .. to get out of the folder

         Modules only work with LIVE SERVER

    #   We dont have to worry about the order of files   

Ways to import multiple files from same folder

import * cartModule from '../data/cart.js';
cartModule.cart
cartModule.addToCart('id');

is similar to

import {cart, addtocart} from '../data/cart.js';
             
*/

import {cart, addtocart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import  formatCurrency  from './utils/money.js';



let productsHTML='';  // Accumulator pattern :-  We have to combine all the HTML for all the products into one string
products.forEach((product)=>{  //The products array is coming from data/products.js
const html_of_each_product=`<div class="product-container">
                            <div class="product-image-container">
                                <img class="product-image"
                                src="${product.image}">
                            </div>

                            <div class="product-name limit-text-to-2-lines">
                                ${product.name}
                            </div>

                            <div class="product-rating-container">
                                <img class="product-rating-stars"
                                src="images/ratings/rating-${product.rating.stars*10}.png">
                                <div class="product-rating-count link-primary">
                                ${product.rating.count}
                                </div>
                            </div>

                            <div class="product-price">
                                $${formatCurrency(product.priceCents)}           
                            </div>

                            <div class="product-quantity-container">
                                <select class="js-quantity-selector-${product.id}">
                                <option selected value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                </select>
                            </div>

                            <div class="product-spacer"></div>

                            <div class="added-to-cart js-added-to-cart-${product.id}">
                                <img src="images/icons/checkmark.png">
                                Added
                            </div>

                            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}" >
                                Add to Cart
                            </button>
                            </div>`;
productsHTML+=html_of_each_product;                            
});

//Putting the productsHTML on the webpage using DOM

document.querySelector('.js-products-grid').innerHTML=productsHTML;

// Getting the quantity from Quantity selector
let quantity_selected=0;
document.querySelector('.js-quantity-selector')


// Making all the ADD TO CART buttons interactive
// We moved the addtocart() function to cart.js


//Making that the ADDED pops up
function making_added_popup(productid){
        document.querySelector(`.js-added-to-cart-${productid}`).classList.add('js-done');
        document.querySelector(`.js-added-to-cart-${productid}`).classList.remove('added-to-cart');
        setTimeout(()=>{
            document.querySelector(`.js-added-to-cart-${productid}`).classList.remove('js-done');
            document.querySelector(`.js-added-to-cart-${productid}`).classList.add('added-to-cart');
            
        },1000); 
}

//Finding the total quantity & putting the quantity on the page using DOM
function updateCartquantity(){
    document.querySelector('.js-cart-quantity').innerHTML=calculateCartQuantity(); // Updates the cartquantity when page refreshes.
}
updateCartquantity();



// WHAT ALL SHOULD HAPPEN WHEN WE PRESS ADD TO CART BUTTON
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
    button.addEventListener('click',()=>{
        const productid=button.dataset.productId;        // Gives all the data attributes for the <button> Add to cart</button> element
        let Quantity=document.querySelector(`.js-quantity-selector-${productid}`).value; //Getting the quantity from quantity selector
        making_added_popup(productid);
        addtocart(productid,Quantity);
        updateCartquantity();
    });
 });
