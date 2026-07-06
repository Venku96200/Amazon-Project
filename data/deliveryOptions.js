import dayjs  from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // This is known as Default Export(no curly brackets needed)


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

export function calculateDeliveryDate(deliveryOption){
    const today=dayjs();
    let days_count=deliveryOption.deliveryDays;
    let deliveryday=today.add(days_count,'days');

    while(deliveryday.day()===0 || deliveryday.day()===6){
        days_count++;
        deliveryday=today.add(days_count,'days');
    }

    
   
    
    return  deliveryday.format('dddd, MMMM, D')// To know how these formats came check dayjs documentation
}