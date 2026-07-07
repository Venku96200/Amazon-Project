/*

EVEN BETTER WAY TO GENERATE OBJECTS IS USING CLASS:--

Class= object generator

Benifits Of Classes
  # Cleaner than using functions to generate objects
  # Have extra features for object-Oriented Programming
          # 1) Constructor :- lets us run setup code (lets us put stepup code inside the class)
                              Has to be named 'constructor'
                              should not return anything

  # Private Properties and Methods:-
      We need to add # infront of the property or method if we want to make them private

Using Classes in our project

Go to products.js,  
 As u can see that all the products are in the form of objects, hence we will
 create a class to generate all these objects
*/

class Cart{
    cartItems;
    #localStorageKey;  // we made this private so that we cannot access it from outside the class

    constructor(localStorageKey_parameter){
        this.#localStorageKey=localStorageKey_parameter;    //'this' points to the object that we generate
        this.#loadFromStorage();            //Stores cart object into localStorage
    }


    #loadFromStorage(){                  // We will also make this private
        this.cartItems= JSON.parse(localStorage.getItem(this.#localStorageKey));  
        if (!this.cartItems){
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
    }

    // We are implementing LocalStorage to save the items in the cart even if we switch webpage from Homepage to checkoutpage
    // Things to rem:-  1) Localstorage only stores string, hence we will have to use json
    saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }


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
    }


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
    }


    calculateCartQuantity(){
        let cartquantity=0;
            this.cartItems.forEach((cartItem)=>{
                cartquantity+=cartItem.quantity;
            });
            //putting the quantity on the page using DOM
        return cartquantity;    
    }

    updateQuantity(productid,newQuantity){
        let matchingitem;
        this.cartItems.forEach((item)=>{
            if(productid=== item.productId){
                matchingitem=item;
            }
        });
        matchingitem.quantity=newQuantity;
        this.saveToStorage();
    }

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



}

// Creating  new objects using the Cart class

//These are know as Objects/Instances
const cart= new Cart('cart-oop');
const bussinessCart = new Cart('cart-bussiness');

/*

        cart.localStorageKey='cart-oop';           // We assign value to property        // We can replace this setup code by using constructors
        bussinessCart.localStorageKey='cart-bussiness'   // We assign value to property

        cart.loadFromStorage();            //Stores cart object into localStorage
        bussinessCart.loadFromStorage();   // Stores Bussiness-cart object into localStorage
*/
console.log(cart);
console.log(bussinessCart)

// We can also check wether a object/instance is of a particular class

console.log(bussinessCart instanceof Cart);   // Will return true
