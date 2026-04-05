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

const prices = {
    general: 18,
    student: 10,
    member: 14,
    under18: 0
};

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
        element.innerHTML = year
    }
}

greeting(hour)
addYear()


// Execute the function to set the active navigation link on page load
ActiveNav();

function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');

    //Get just the filename from the current URL
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        //Get just the filename from the link ref
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if (currentPage === linkPage) {
            link.classList.add("active");
        }    
    });
}

ActiveNav();


/* Read More & Read Less */
 // When the "Read Less" button is clicked
 $("#readLess").click(function(){ 
    $("#longIntro").hide(); // Hide the long introduction text
    $("#readLess").hide();  // Hide the "Read Less" button itself
    $("#readMore").show();  // Show the "Read More" button  

  });
  
// When the "Read More" button is clicked
  $("#readMore").click(function(){
    $("#longIntro").show();  // Show the long introduction text
    $("#readLess").show();   // Show the "Read Less" button
    $("#readMore").hide();   // Hide the "Read More" button  
  });

//Show form
function showForm() {
    document.querySelector(".form").style.display = "block";
    document.querySelector(".form").scrollIntoView({ behavior: "smooth" });
}

//Update order summary


//Increase/decrease the number quantity of tickets

// 1. Define the prices for each ticket type

// 2. Function to show the form when "Buy Now" is clicked
function showForm() {
    const form = document.querySelector('.form');
    form.style.display = 'block';
    // Smooth scroll to the form
    form.scrollIntoView({ behavior: 'smooth' });
}

// 3. Function to increase quantity
function increase(type) {
    const qtyElement = document.getElementById(`qty-${type}`);
    let currentQty = parseInt(qtyElement.innerText);
    
    currentQty++;
    qtyElement.innerText = currentQty;
    
    updateSummary(type, currentQty);
}

// 4. Function to decrease quantity
function decrease(type) {
    const qtyElement = document.getElementById(`qty-${type}`);
    let currentQty = parseInt(qtyElement.innerText);
    
    if (currentQty > 0) {
        currentQty--;
        qtyElement.innerText = currentQty;
        updateSummary(type, currentQty);
    }
}

function updateTotal() {
    let total = 0;
    for (const type in prices) {
        const qty = parseInt(document.getElementById(`summary-qty-${type}`).innerText) || 0;
        total += qty * prices[type];
    }
    document.querySelector('.complete_purchase_input').innerText = `COMPLETE PURCHASE - $${total}`;
}

// 5. Function to update the Order Summary table
function updateSummary(type, quantity) {
    console.log('updateSummary called:', type, quantity);

    const summaryQty = document.getElementById(`summary-qty-${type}`);
    const summarySub = document.getElementById(`summary-sub-${type}`);

    console.log('summaryQty element:', summaryQty);
    console.log('summarySub element:', summarySub);

    summaryQty.innerText = quantity;
    summarySub.innerText = `$${quantity * prices[type]}`;

    document.getElementById(`summary-qty-${type}`).innerText = quantity;
    document.getElementById(`summary-sub-${type}`).innerText = `$${quantity * prices[type]}`;
    updateTotal();
}
