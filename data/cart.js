// Here will only store data for the carts


export let cart= JSON.parse(localStorage.getItem('cart'));           // This file can be used outside of js
if (!cart) {
cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
}];
}





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
            if(cartItem.productId===productid){
                matchingItem=cartItem;
            }
        });  
        if(matchingItem){
            matchingItem.quantity+=Number(Quantity);
        }else{
            cart.push({
                productId: productid,
                quantity: Number(Quantity),
                deliveryOptionId:'1'
            });
        }
        saveToStorage(); //calling this function to save the updated cart into localstorage
       
}

// Function to delete from cart

export function removefromCart(productid){
    const newCart=[];                       //  We create a new array, which will contain all the products except the productid one
    cart.forEach((cartItem)=>{
        if(cartItem.productId !==productid){
            newCart.push(cartItem);
        }
    });
    cart=newCart 
     saveToStorage(); //calling this function to save the updated cart into localstorage
}

export function calculateCartQuantity(){
    let cartquantity=0;
        cart.forEach((cartItem)=>{
            cartquantity+=cartItem.quantity;
        });
        //putting the quantity on the page using DOM
    return cartquantity;    
}

export function updateQuantity(productid,newQuantity){
    let matchingitem;
    cart.forEach((item)=>{
        if(productid=== item.productId){
            matchingitem=item;
        }
    });
    matchingitem.quantity=newQuantity;
    saveToStorage();

}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;  // Used to store object of the product we clicked
        //looping and finding which key is pressed
        cart.forEach((cartItem)=>{
            if(cartItem.productId===productId){
                matchingItem=cartItem;
            }
        }); 

     matchingItem.deliveryOptionId=deliveryOptionId;
     saveToStorage();
}