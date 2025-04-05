const correctCode = "BCTS Teterboro";

function checkCode() {
    const userInput = document.getElementById("codeInput").value;
    const secretDiv = document.getElementById("secretDiv");
    const header = document.querySelector('header'); // Ensure you have a header element

    if (userInput === correctCode) {
        secretDiv.style.display = "block";

        // Save the color changes to localStorage
        localStorage.setItem("headerBackgroundColor", "black");
        localStorage.setItem("headerTextColor", "gold");

        // Apply the changes immediately
        header.style.backgroundColor = "black";
        header.style.color = "gold";
    } else {
        alert("Incorrect code. Try again.");
    }
}

function resetColors() {
    const header = document.querySelector('header');

    // Reset the colors to the original ones
    localStorage.setItem("headerBackgroundColor", ""); // Remove saved color
    localStorage.setItem("headerTextColor", ""); // Remove saved color

    // Apply the original colors
    header.style.backgroundColor = "";  // This will revert to the default background
    header.style.color = "";  // This will revert to the default text color
}

// Check if there are saved settings in localStorage and apply them on page load
window.onload = function() {
    const header = document.querySelector('header');

    const savedBackgroundColor = localStorage.getItem("headerBackgroundColor");
    const savedTextColor = localStorage.getItem("headerTextColor");

    if (savedBackgroundColor && savedTextColor) {
        header.style.backgroundColor = savedBackgroundColor;
        header.style.color = savedTextColor;
    }
}
