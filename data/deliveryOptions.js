export const deliveryOptions=[{
    id:'1',
    deliveryDays:7,
    pricecents:0
},{
    id:'2',
    deliveryDays:3,
    pricecents:499
},{
    id:'3',
    deliveryDays:1,
    pricecents:999
}];

export function getDeliveryOption(deliverOptionId){
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
        if(deliverOptionId===option.id){
            deliveryOption=option;
        }
    });
    return deliveryOption||deliveryOptions[0]
}