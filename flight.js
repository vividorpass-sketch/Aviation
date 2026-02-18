const steps = document.querySelectorAll(".step");
const contents = document.querySelectorAll(".step-content");

// Buttons
const toStep2 = document.getElementById("toStep2");
const toStep3 = document.getElementById("toStep3");
const back1 = document.getElementById("back1");
const back2 = document.getElementById("back2");
const confirmBtn = document.getElementById("confirm");

// Show step function
function showStep(stepNumber) {
    contents.forEach((content, index) => {
        content.classList.toggle("active", index === stepNumber - 1);
    });

    steps.forEach((step, index) => {
        step.classList.toggle("active", index === stepNumber - 1);
    });
}

// Save form data
function saveData() {
    const data = {
        departure: document.getElementById("departure").value,
        destination: document.getElementById("destination").value,
        departureDate: document.getElementById("departureDate").value,
        returnDate: document.getElementById("returnDate").value,
        passengers: document.getElementById("passengers").value,
        cabinClass: document.getElementById("cabinClass").value,
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    localStorage.setItem("currentBooking", JSON.stringify(data));
}

// Load saved data
function loadData() {
    const saved = localStorage.getItem("currentBooking");
    if (!saved) return;

    const data = JSON.parse(saved);

    document.getElementById("departure").value = data.departure || "";
    document.getElementById("destination").value = data.destination || "";
    document.getElementById("departureDate").value = data.departureDate || "";
    document.getElementById("returnDate").value = data.returnDate || "";
    document.getElementById("passengers").value = data.passengers || "";
    document.getElementById("cabinClass").value = data.cabinClass || "";
    document.getElementById("fullName").value = data.fullName || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("phone").value = data.phone || "";
}

// Save final booking
function confirmBooking() {
    const current = JSON.parse(localStorage.getItem("currentBooking"));
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(current);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking saved!");
}

// Navigation
toStep2.onclick = () => {
    saveData();
    showStep(2);
};

toStep3.onclick = () => {
    saveData();
    showStep(3);
};
// Back buttons
back1.onclick = () => showStep(1);
back2.onclick = () => showStep(2);

confirmBtn.onclick = () => {
    saveData();
    confirmBooking();
};

// Auto-save on input
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", saveData);
});


window.onload = () => {
    loadData();
    showStep(1);
};

function  confirmBooking() {
    const current = JSON.parse(localStorage.getItem("currentBooking"));
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(current);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    displayBookings();
}

function displayBookings() {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const bookingList = document.getElementById("Bookinglist");
    
    bookingList.innerHTML = "";
    
    if (bookings.length === 0) {
        bookingList.innerHTML = "<p>No bookings available.</p>";
        return;
    }

    bookings.forEach((booking, index) => {
        const bookingDiv = document.createElement("div");
        bookingDiv.className = "booking-item";
        bookingDiv.innerHTML = `
            <h3>Booking #${index + 1}</h3>
            <p><strong>Departure:</strong> ${booking.departure}</p>
            <p><strong>Destination:</strong> ${booking.destination}</p>
            <p><strong>Departure Date:</strong> ${booking.departureDate}</p>
            <p><strong>Return Date:</strong> ${booking.returnDate}</p>
            <p><strong>Passengers:</strong> ${booking.passengers}</p>
            <p><strong>Cabin Class:</strong> ${booking.cabinClass}</p>
        `;
        bookingList.appendChild(bookingDiv);
    });
}

function clearBookings() {
    localStorage.removeItem("bookings");
    displayBookings();
}

document.getElementById("clearHistory").addEventListener("click", clearBookings);

function confirmBooking() {
    const current = JSON.parse(localStorage.getItem("currentBooking"));
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(current);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking complete!");

    clearForm();     
    showStep(1);     
}


