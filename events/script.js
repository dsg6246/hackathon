// Select the form and event list
const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
const calendarDiv = document.getElementById('calendar');

// Load events from localStorage
function loadEvents() {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    storedEvents.forEach(event => {
        addEventToList(event);
        markEventOnCalendar(event);
    });
}

// Save events to localStorage
function saveEvents(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

// Add a new event to the list
function addEventToList(event) {
    const eventItem = document.createElement('div');
    eventItem.classList.add('event');

    eventItem.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <button class="delete-btn">Delete</button>
    `;
    eventList.appendChild(eventItem);
}

// Mark an event on the calendar
function markEventOnCalendar(event) {
    const eventDate = new Date(event.date);
    const eventDay = eventDate.getDate();
    const monthDiv = document.querySelector('.month');

    const dayDiv = document.querySelector(`.day[data-day="${eventDay}"]`);
    if (dayDiv) {
        dayDiv.classList.add('event');
    }
}

// Add a new event to localStorage
eventForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const eventName = document.getElementById('event_name').value;
    const eventDate = document.getElementById('event_date').value;
    const eventDescription = document.getElementById('event_description').value;

    // Create event object
    const newEvent = {
        name: eventName,
        date: eventDate,
        description: eventDescription
    };

    // Load existing events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];

    // Add the new event to the events array
    storedEvents.push(newEvent);

    // Save updated events to localStorage
    saveEvents(storedEvents);

    // Add the new event to the DOM
    addEventToList(newEvent);

    // Mark event on calendar
    markEventOnCalendar(newEvent);

    // Clear the form after submitting
    eventForm.reset();
});

// Event delegation for delete button
eventList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const eventItem = event.target.parentElement;
        const eventName = eventItem.querySelector('h3').textContent;

        // Load existing events from localStorage
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];

        // Remove the event from the array
        const updatedEvents = storedEvents.filter(event => event.name !== eventName);

        // Save the updated events to localStorage
        saveEvents(updatedEvents);

        // Remove the event item from the DOM
        eventItem.remove();

        // Remove the event from the calendar
        const eventDate = eventItem.querySelector('p').textContent.split(": ")[1];
        const eventDay = new Date(eventDate).getDate();
        const dayDiv = document.querySelector(`.day[data-day="${eventDay}"]`);
        if (dayDiv) {
            dayDiv.classList.remove('event');
        }
    }
});

// Generate a simple calendar for the current month
function generateCalendar() {
    const monthDiv = document.createElement('div');
    monthDiv.classList.add('month');
    
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);}
    /*
    // Add the days of the month to the calendar
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.setAttribute('data-day', i);
        dayDiv.innerText = i;
        monthDiv.appendChild(dayDiv);
    }
    
    calendarDiv.appendChild(monthDiv);
}
*/
// Load events and generate calendar when the page loads
generateCalendar();
loadEvents();
