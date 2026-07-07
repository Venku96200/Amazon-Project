/* Object-oriented programming (oop)

# Another style of programming (another way we write our code)
# Organizing our code into objects
# We have been using Procedural Programming
    # Procedure= a set of step-by-step instructions
              = a function
# instead of objectname we can use this              
*/


function Cart(localStorageKey){
    const cart={
    cartItems: undefined,

    loadFromStorage(){
    this.cartItems= JSON.parse(localStorage.getItem(localStorageKey));           // This file can be used outside of js
    if (!this.cartItems) {
    this.cartItems = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
    }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
    }];
    }
    },

    // We are implementing LocalStorage to save the items in the cart even if we switch webpage from Homepage to checkoutpage
    // Things to rem:-  1) Localstorage only stores string, hence we will have to use json
    saveToStorage(){
    localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },


    //Function to add to cart
    addtocart(productid, Quantity){
    let matchingItem;  // Used to store object of the product we clicked
    //looping and finding which key is pressed
    this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId===productid){
            matchingItem=cartItem;
        }
    });  
    if(matchingItem){
        matchingItem.quantity+=Number(Quantity);
    }else{
        this.cartItems.push({
            productId: productid,
            quantity: Number(Quantity),
            deliveryOptionId:'1'
        });
    }
    this.saveToStorage(); //calling this function to save the updated cart into localstorage 
    },


    // Function to delete from cart
    removefromCart(productid){
    const newCart=[];                       //  We create a new array, which will contain all the products except the productid one
    this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !==productid){
            newCart.push(cartItem);
        }
    });
    this.cartItems=newCart 
    this.saveToStorage(); //calling this function to save the updated cart into localstorage
    },


    calculateCartQuantity(){
    let cartquantity=0;
        this.cartItems.forEach((cartItem)=>{
            cartquantity+=cartItem.quantity;
        });
        //putting the quantity on the page using DOM
    return cartquantity;    
    },


    updateQuantity(productid,newQuantity){
    let matchingitem;
    this.cartItems.forEach((item)=>{
        if(productid=== item.productId){
            matchingitem=item;
        }
    });
    matchingitem.quantity=newQuantity;
    this.saveToStorage();
    },


    updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;  // Used to store object of the product we clicked
        //looping and finding which key is pressed
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId===productId){
                matchingItem=cartItem;
            }
        }); 

     matchingItem.deliveryOptionId=deliveryOptionId;
     this.saveToStorage();
    }
    };

    return cart;

}

//Calling Cart function to generate multiple Carts/objects

const cart=Cart('cart-oop');
const bussinessCart = Cart('cart-bussiness');

cart.loadFromStorage();
bussinessCart.loadFromStorage();

console.log(cart);
console.log(bussinessCart)

// We grouped the variables, functions inside an object
// To access the variables ,functions within the object we can use this.variable_name
// To access the variable ,functions outside the object we will have to use object_name.variable_name

/*

Why do we use Object-oriented Programming?
oops tries to represent the real world

There are two objects/Carts 
          1) cart
          2) bussinesscart

We can also use a function to generate multiple objects          


*/
