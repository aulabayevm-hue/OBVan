# Digital Timezone Clock

A beautiful, responsive web application that displays the current time across multiple time zones worldwide. Each timezone shows both digital and analog clock representations.

## Features

✨ **Key Features:**
- 🌍 12 major world timezones displayed simultaneously
- 🕐 Digital time display with hour:minute:second format
- 🔄 Analog clock representation for each timezone
- 🌅 Beautiful gradient background and card-based layout
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🔘 Toggle between 12-hour and 24-hour time formats
- 📅 Date display for each timezone
- ⏱️ Real-time updates every second
- 🎨 Smooth animations and hover effects

## Timezones Included

1. New York (America/New_York)
2. Los Angeles (America/Los_Angeles)
3. Toronto (America/Toronto)
4. São Paulo (America/Sao_Paulo)
5. London (Europe/London)
6. Paris (Europe/Paris)
7. Moscow (Europe/Moscow)
8. Dubai (Asia/Dubai)
9. Singapore (Asia/Singapore)
10. Hong Kong (Asia/Hong_Kong)
11. Tokyo (Asia/Tokyo)
12. Sydney (Australia/Sydney)

## Project Structure

```
OBVan/
├── index.html      # HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # Clock logic and timezone handling
└── README.md       # Project documentation
```

## How to Use

1. **Open in Browser**: Simply open `index.html` in any modern web browser
2. **View Current Times**: All timezone clocks update automatically every second
3. **Toggle Time Format**: Click the "Toggle 12/24 Hour" button to switch between formats
4. **Responsive Design**: The layout adapts to different screen sizes

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with gradients, flexbox, and grid layout
- **Vanilla JavaScript** - No dependencies required
- **Intl API** - Native browser timezone handling

### Key JavaScript Functions
- `initializeClocks()` - Creates clock cards for all timezones
- `updateClocks()` - Updates all timezone clocks every second
- `updateClock(tz, index)` - Updates individual clock display
- `getTimezoneOffset()` - Calculates UTC offset for display
- `toggleTimeFormat()` - Switches between 12-hour and 24-hour formats

### Browser Compatibility
- Chrome/Edge 24+
- Firefox 29+
- Safari 6.1+
- Opera 15+
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## Customization

### Add More Timezones
Edit the `timezones` array in `script.js`:

```javascript
const timezones = [
    { name: 'Your City', zone: 'Continent/City' },
    // ...
];
```

### Change Colors
Modify the gradient and colors in `styles.css`:
- Primary color: `#667eea` (purple)
- Secondary color: `#764ba2` (dark purple)
- Accent color: `#ff6b6b` (red - for seconds)

## Features Explained

### Digital Time Display
Shows precise time in HH:MM:SS format with optional AM/PM indicator.

### Analog Clock
- **Hour hand**: Short hand for hours (black)
- **Minute hand**: Long hand for minutes (purple)
- **Second hand**: Thin hand for seconds (red)
- Rotates smoothly in real-time

### Timezone Offset
Displays UTC offset (e.g., UTC +05:30, UTC -08:00) for quick reference.

### Date Display
Shows the date in the specific timezone (e.g., "Wed, Aug 22, 2026").

## Performance

- Optimized for minimal CPU usage
- Single update interval for all clocks
- CSS animations for smooth hand rotation
- Responsive design without excessive media queries

## Future Enhancements

Possible improvements:
- Add ability to add/remove custom timezones
- Save user preferences (12/24 hour format)
- Dark mode theme
- Alarm functionality
- Timezone search feature
- Widget version for websites

## License

Open source - Feel free to modify and use as needed.

## Author

Created as a demonstration of timezone handling in JavaScript using the Intl API.