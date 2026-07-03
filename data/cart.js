// Here will only store data for the carts

export const cart=[{
    productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
},{
    productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
}];  // This file can be used outside of js


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