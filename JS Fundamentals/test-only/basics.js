function test(argument) {
    if (!Array.isArray(argument)) {
        console.log("hava nice try again.");
        return false;
    }
    let arrLen = argument.length;
    let counter = 0;
    for (let x = 0; x < arrLen; x++) {
        if (Number.isInteger(argument[x]) && argument[x] > 79) {
                counter++;
        } 
    }
    return counter;
    }


function makeOrder(tableNumber, orderItems, orderStatus) {
    if (!Number.isInteger(tableNumber)) {
        console.log("invalid table number");
        return false;
    }

    if (!Array.isArray(orderItems)) {
        console.log("invalid order.");
        return false;
    }

    return {objTableNumber: tableNumber, objOrderItems: orderItems, objOrderStatus: orderStatus};
    

}    

console.log(test([50,80,90,2,78,91,80,89,97]));
console.log(makeOrder(4,["steak","frites","beer"], "open"));