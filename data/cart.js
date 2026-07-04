// Here will only store data for the carts

export let cart= JSON.parse(localStorage.getItem('cart'))|| [];           // This file can be used outside of js


// We are implementing LocalStorage to save the items in the cart even if we switch webpage from Homepage to checkoutpage
// Things to rem:-  1) Localstorage only stores string, hence we will have to use json
function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


//Function to add to cart
export function addtocart(productid, Quantity){
        let matchingItem;  // Used to store object of the product we clicked
        //looping and finding which key is pressed
        cart.forEach((cartItem)=>{
            if(cartItem.productid===productid){
                matchingItem=cartItem;
            }
        });  
        if(matchingItem){
            matchingItem.quantity+=Number(Quantity);
        }else{
            cart.push({
                productid: productid,
                quantity: Number(Quantity)
            });
        }
        saveToStorage(); //calling this function to save the updated cart into localstorage
}

// Function to delete from cart

export function removefromCart(productid){
    const newCart=[];                       //  We create a new array, which will contain all the products except the productid one
    cart.forEach((cartItem)=>{
        if(cartItem.productid !==productid){
            newCart.push(cartItem);
        }
    });
    cart=newCart 
     saveToStorage(); //calling this function to save the updated cart into localstorage

}