//External Libraries Used:
//jQuery 4.0.0 - https://jquery.com
//Leaflet 1.9.4 - https://leafletjs.com

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
    student: 18,
    member: 18,
    under18: 18
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
        element.innerHTML = "© " + year + " MonoMuse. All rights reserved."
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var now = new Date();
    var hour = now.getHours();
    greeting(hour);
    addYear();
});

// Execute the function to set the active navigation link on page load

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

// Read More & Read Less
$(document).ready(function() {
    $("#readLess").click(function(){ 
        $("#longIntro").hide();
        $("#readLess").hide();
        $("#readMore").show();
    });
  
    $("#readMore").click(function(){
        $("#longIntro").show();
        $("#readLess").show();
        $("#readMore").hide();
    });
});

// Show form when Buy Now is clicked
function showForm(dateValue, dateLabel) {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    form.style.display = 'block';

    document.getElementById('selectedDate').value = dateValue;
    document.getElementById('selectedDateLabel').value = dateLabel;
    document.getElementById('formDateHeading').innerText = 'Tickets for — ' + dateLabel;

    ['general', 'student', 'member', 'under18'].forEach(t => {
        const el = document.getElementById('qty-' + t);
        if (el) el.value = '';
    });
    updateTotal();

    form.scrollIntoView({ behavior: 'smooth' });
}

// Live total price
function updateTotal() {
    const PRICE = 18;
    const types = ['general', 'student', 'member', 'under18'];
    let totalQty = 0;

    types.forEach(t => {
        const val = parseInt(document.getElementById('qty-' + t).value) || 0;
        totalQty += Math.max(0, val);
    });

    document.getElementById('totalPrice').innerText = '$' + (totalQty * PRICE);
    document.getElementById('totalTickets').innerText =
        totalQty + ' ticket' + (totalQty !== 1 ? 's' : '') + ' × $' + PRICE;
}

// Hamburger menu toggle
function toggleNav() {
    const nav = document.querySelector('.nav_bar');
    nav.classList.toggle('open');
}

if (document.getElementById('map')) {
    var map = L.map('map').setView([40.4444, -79.9606], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([40.4444, -79.9606]).addTo(map)
        .bindPopup('MonoMuse Museum')
        .openPopup();
}

// Form validation and order placement
function placeOrder() {
    const errors = [];

    const date      = document.getElementById('selectedDate').value;
    const dateLabel = document.getElementById('selectedDateLabel').value;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const email     = document.getElementById('emailInput').value.trim();
    const zip       = document.getElementById('zipCode').value.trim();

    const PRICE = 18;
    const types = ['general', 'student', 'member', 'under18'];
    const typeLabels = {
        general: 'General Admission (18+)',
        student: 'Student',
        member:  'Member',
        under18: 'General Admission (Under 18)'
    };

    let totalQty = 0;
    const breakdown = [];

    types.forEach(t => {
        const qty = parseInt(document.getElementById('qty-' + t).value) || 0;
        if (qty > 10) errors.push('Quantity for ' + typeLabels[t] + ' must be 10 or fewer.');
        if (qty > 0) {
            totalQty += qty;
            breakdown.push({ type: typeLabels[t], qty: qty, subtotal: qty * PRICE });
        }
    });

    if (!date)          errors.push('Please select a visit date by clicking "Buy Now" on a date above.');
    if (totalQty === 0) errors.push('Please add at least one ticket.');
    if (!firstName)     errors.push('First name is required.');
    if (!lastName)      errors.push('Last name is required.');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email)                       errors.push('Email address is required.');
    else if (!emailRegex.test(email)) errors.push('Please enter a valid email address.');

    if (zip && !/^\d{5}$/.test(zip)) errors.push('Zip code must be exactly 5 digits.');

    const errorDiv = document.getElementById('formErrors');
    if (errors.length > 0) {
        errorDiv.innerHTML = errors.join('<br>');
        errorDiv.style.display = 'block';
        errorDiv.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    errorDiv.style.display = 'none';

    const order = {
        date:        dateLabel,
        firstName:   firstName,
        lastName:    lastName,
        email:       email,
        zip:         zip,
        breakdown:   breakdown,
        totalQty:    totalQty,
        total:       totalQty * PRICE,
        mailingList: document.getElementById('mailingList').checked
    };

    sessionStorage.setItem('monomuseOrder', JSON.stringify(order));
    window.location.href = 'confirmation.html';
}

// Confirmation page
function loadConfirmation() {
    const data = sessionStorage.getItem('monomuseOrder');
    if (!data) {
        const noOrder = document.getElementById('noOrder');
        if (noOrder) noOrder.style.display = 'block';
        return;
    }

    const order = JSON.parse(data);
    const wrap = document.getElementById('confirmWrap');
    if (wrap) wrap.style.display = 'block';

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    };

    set('conf-name',         order.firstName + ' ' + order.lastName);
    set('conf-date',         order.date);
    set('conf-qty',          order.totalQty + ' ticket' + (order.totalQty !== 1 ? 's' : ''));
    set('conf-email',        order.email);
    set('conf-email-notice', order.email);
    set('conf-total',        '$' + order.total);

    const tbody = document.getElementById('breakdownBody');
    if (tbody && order.breakdown) {
        order.breakdown.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${item.type}</td><td>${item.qty}</td><td>$${item.subtotal}</td>`;
            tbody.appendChild(tr);
        });
    }
}

if (document.getElementById('confirmWrap')) {
    loadConfirmation();
}

// Membership form
function showMemberForm(tier) {
    const form = document.getElementById('membershipForm');
    if (!form) return;
    form.style.display = 'block';
    const tierLabels = {
        individual: 'Individual — $75/year',
        family:     'Family — $140/year',
        patron:     'Patron — $300/year'
    };
    document.getElementById('mem-tier').value = tierLabels[tier] || tier;
    form.scrollIntoView({ behavior: 'smooth' });
}

function submitMembership() {
    const first    = document.getElementById('mem-firstname').value.trim();
    const last     = document.getElementById('mem-lastname').value.trim();
    const email    = document.getElementById('mem-email').value.trim();
    const errorDiv = document.getElementById('mem-error');
    const errors   = [];

    if (!first) errors.push("First name is required.");
    if (!last)  errors.push("Last name is required.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email)                       errors.push("Email is required.");
    else if (!emailRegex.test(email)) errors.push("Please enter a valid email.");

    if (errors.length > 0) {
        errorDiv.innerHTML = errors.join('<br>');
        errorDiv.style.display = 'block';
        return;
    }

    errorDiv.style.display = 'none';
    alert('Thank you, ' + first + '! Your membership has been submitted.');
}

// Donation
function selectDonation(btn, amount) {
    document.querySelectorAll('.donation-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('customDonation').value = amount;
}

function submitDonation() {
    const amount = document.getElementById('customDonation').value;
    if (!amount || amount < 1) {
        alert('Please enter or select a donation amount.');
        return;
    }
    alert('Thank you for your donation of $' + amount + '!');
}

// Leaflet Map
if (document.getElementById('map')) {
    var map = L.map('map').setView([40.4444, -79.9606], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([40.4444, -79.9606]).addTo(map)
        .bindPopup('<b style="color:#000;">MonoMuse Museum</b><br>Pittsburgh, PA')
        .openPopup();
}

// Gallery
function changeSlide(direction) {
    const slides = Array.from(document.querySelectorAll('.gallery-slide'));
    const activeSlide = document.querySelector('.gallery-slide.active');
    
    // 1. Find where we are right now
    let currentIndex = slides.indexOf(activeSlide);
    
    // 2. If index is -1 (nothing active), default to 0
    if (currentIndex === -1) currentIndex = 0;

    // 3. Remove active from the one we found
    slides[currentIndex].classList.remove('active');

    // 4. Calculate next index
    let nextIndex = currentIndex + direction;

    if (nextIndex >= slides.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = slides.length - 1;

    // 5. Show the new one
    slides[nextIndex].classList.add('active');
}