/*
Steps:-

1) Loop through the cart
2) For each product price*quantity 
3) Add everything together



*/
import { cart } from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js"
import formatCurrency from "../utils/money.js";


export  function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    cart.forEach((cartItem)=>{
        const product= getProduct(cartItem.productId);
        productPriceCents+=product.priceCents*cartItem.quantity;
        const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents+=deliveryOption.pricecents; 
    });
    const totalBeforeTax=productPriceCents+shippingPriceCents;
    const taxcents=totalBeforeTax*0.1;
    const totalCents=totalBeforeTax+taxcents;

    const paymentSummaryHTML=`

            <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (3):</div>
                    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${formatCurrency(taxcents)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
                `;

   document.querySelector ('.js-payment-summary').innerHTML=paymentSummaryHTML;            


}
renderPaymentSummary();