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
                                $${(product.pricecents/100).toFixed(2)}           
                            </div>

                            <div class="product-quantity-container">
                                <select>
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

                            <div class="added-to-cart">
                                <img src="images/icons/checkmark.png">
                                Added
                            </div>

                            <button class="add-to-cart-button button-primary">
                                Add to Cart
                            </button>
                            </div>`;
productsHTML+=html_of_each_product;                            
});

//Putting the productsHTML on the webpage using DOM

document.querySelector('.js-products-grid').innerHTML=productsHTML;
