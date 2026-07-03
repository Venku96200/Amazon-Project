// Here will only store data for the carts

export const cart=[];  // This file can be used outside of js


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
}