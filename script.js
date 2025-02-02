"use strict";
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const movieSelect = document.getElementById("movie");
const total = document.getElementById("total");
const count = document.getElementById("count");
populateUI();
let ticketPrice = +movieSelect.value;
// Save selected movie index and price
const setMovieData = function (movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};
// Updata total and count
const updateSelectedCount = function () {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    count.textContent = selectedSeats.length.toString();
    total.textContent = (selectedSeats.length * ticketPrice).toString();
};
// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
}
// Movie select event
movieSelect.addEventListener("change", (e) => {
    const target = e.target;
    ticketPrice = +target.value;
    setMovieData(target.selectedIndex.toString(), target.value);
    updateSelectedCount();
});
// Seat click event
seats.forEach((seat) => {
    seat.addEventListener("click", () => {
        seat.classList.toggle("selected");
        updateSelectedCount();
    });
});
// Initial count and total
updateSelectedCount();
