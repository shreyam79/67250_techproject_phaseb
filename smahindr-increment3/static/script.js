// var x = 5;
// var y = 7;
// var z = x + y;
// console.log(z)

// var A = "Hello ";
// var B = "world!";
// var C = A + B;
// console.log(C)

// function sumnPrint(x1, x2){
//     console.log(x1 + x2);
// }

// sumnPrint(x, y);
// sumnPrint(A, B);

// if (C.length > z) {
//     console.log(C.length);

//     if (C.length < z) {
//         console.log(C.length);
//     }
// } else {
//     console.log("good job!");
// }

// const L1 = ["Watermelon","Pineapple","Pear","Banana"];
// const L2 = ["Apple","Banana","Kiwi","Orange"];

// function findTheBanana(item) {
//     if (item === "Banana") {
//         alert("Banana Found!");
//     }
// }

// L1.forEach(findTheBanana);
// L2.forEach(findTheBanana);

var now = new Date()
var hour = now.getHours()

function greeting(x) {
    var element = document.getElementById("greeting");
    
    if (!element){
        return;
    }

    if (x < 5 || x >= 20){
        element.innerHTML = "Good night";
    }
    else if (x < 12) {
        element.innerHTML = "Good morning";
    }
    else if (x < 18) {
        element.innerHTML = "Good afternoon";
    }
    else {
        element.innerHTML = "Good evening";
    }
}

function addYear() {
    var year = new Date().getFullYear();
    var element = document.getElementById("copyYear");

    if (element) {
        element.innerHTML = "© " + year + " MonoMuse. All rights reserved."
    }
}

greeting(hour)
addYear()
