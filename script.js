// Define timezones to display
const timezones = [
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Paris', zone: 'Europe/Paris' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Singapore', zone: 'Asia/Singapore' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles' },
    { name: 'Toronto', zone: 'America/Toronto' },
    { name: 'São Paulo', zone: 'America/Sao_Paulo' },
    { name: 'Moscow', zone: 'Europe/Moscow' },
    { name: 'Hong Kong', zone: 'Asia/Hong_Kong' }
];

let use24HourFormat = true;

// Initialize the clock grid
function initializeClocks() {
    const clockGrid = document.getElementById('clockGrid');
    clockGrid.innerHTML = '';

    timezones.forEach((tz, index) => {
        const clockCard = createClockCard(tz, index);
        clockGrid.appendChild(clockCard);
    });
}

// Create a single clock card
function createClockCard(tz, index) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.id = `clock-${index}`;
    card.innerHTML = `
        <div class="timezone-label">${tz.name}</div>
        <div class="timezone-offset" id="offset-${index}"></div>
        <div class="digital-time" id="time-${index}"></div>
        <div class="analog-clock" id="analog-${index}">
            <div class="hand hour-hand" id="hour-${index}"></div>
            <div class="hand minute-hand" id="minute-${index}"></div>
            <div class="hand second-hand" id="second-${index}"></div>
            <div class="clock-center"></div>
        </div>
        <div class="date-display" id="date-${index}"></div>
    `;
    return card;
}

// Update all clocks
function updateClocks() {
    timezones.forEach((tz, index) => {
        updateClock(tz, index);
    });
}

// Update a single clock
function updateClock(tz, index) {
    const now = new Date();
    
    // Get time in the specified timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz.zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24HourFormat
    });

    const parts = formatter.formatToParts(now);
    let hours = parts.find(p => p.type === 'hour').value;
    let minutes = parts.find(p => p.type === 'minute').value;
    let seconds = parts.find(p => p.type === 'second').value;
    let period = parts.find(p => p.type === 'dayPeriod')?.value || '';

    // Calculate actual hours for analog clock (0-23 format)
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tz.zone }));
    const actualHours = tzDate.getHours();
    const actualMinutes = tzDate.getMinutes();
    const actualSeconds = tzDate.getSeconds();

    // Update digital time
    const timeElement = document.getElementById(`time-${index}`);
    const timeString = use24HourFormat 
        ? `${hours}:${minutes}:${seconds}`
        : `${hours}:${minutes}:${seconds} ${period}`;
    timeElement.textContent = timeString;

    // Update analog clock hands
    const secondHand = document.getElementById(`second-${index}`);
    const minuteHand = document.getElementById(`minute-${index}`);
    const hourHand = document.getElementById(`hour-${index}`);

    const secondDegrees = (actualSeconds / 60) * 360;
    const minuteDegrees = (actualMinutes / 60) * 360 + (actualSeconds / 60) * 6;
    const hourDegrees = (actualHours / 12) * 360 + (actualMinutes / 60) * 30;

    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    // Update date
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz.zone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const dateElement = document.getElementById(`date-${index}`);
    dateElement.textContent = dateFormatter.format(now);

    // Update timezone offset
    const offsetElement = document.getElementById(`offset-${index}`);
    const offset = getTimezoneOffset(tz.zone);
    offsetElement.textContent = `UTC ${offset}`;
}

// Calculate timezone offset
function getTimezoneOffset(timeZone) {
    const now = new Date();
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone }));
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const diff = (tzDate - utcDate) / (1000 * 60 * 60);
    
    const hours = Math.floor(Math.abs(diff));
    const minutes = (Math.abs(diff) % 1) * 60;
    const sign = diff >= 0 ? '+' : '-';
    
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Toggle between 12-hour and 24-hour format
function toggleTimeFormat() {
    use24HourFormat = !use24HourFormat;
    updateClocks();
}

// Initialize and start the clock
document.addEventListener('DOMContentLoaded', () => {
    initializeClocks();
    updateClocks();

    // Add toggle button
    const container = document.querySelector('.container');
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'time-format-toggle';
    toggleDiv.innerHTML = `<button class="toggle-btn" onclick="toggleTimeFormat()">Toggle 12/24 Hour</button>`;
    container.appendChild(toggleDiv);

    // Update clocks every second
    setInterval(updateClocks, 1000);
});